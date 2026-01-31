# JWT Auth

## Overview

JWT Auth allows machine identities to authenticate with Infisical using any JSON Web Token (JWT). Unlike OIDC Auth, JWT Auth does not require an OIDC discovery endpoint — it validates tokens using either a JWKS URL or static public keys. This makes it suitable for custom token issuers, legacy systems, and non-OIDC-compliant providers.

## Prerequisites

- A JWT issuer with either a JWKS endpoint or known public keys
- The Infisical Node.js SDK installed: `npm install node-infisical`
- A machine identity created in Infisical

## Provider Setup

### Option A: JWKS URL

If your JWT issuer exposes a JWKS endpoint (e.g., `https://issuer.example.com/.well-known/jwks.json`), Infisical will fetch the signing keys dynamically.

### Option B: Static Public Keys

If no JWKS URL is available, you can configure one or more PEM-encoded public keys directly. Infisical will use these to verify JWT signatures.

### Generating a JWT

Example using `jsonwebtoken` in Node.js:

```typescript
import jwt from "jsonwebtoken";
import { readFileSync } from "fs";

const privateKey = readFileSync("private-key.pem", "utf-8");

const token = jwt.sign(
  {
    sub: "my-service",
    aud: "infisical",
    role: "admin",
  },
  privateKey,
  {
    algorithm: "RS256",
    issuer: "https://issuer.example.com",
    expiresIn: "1h",
  }
);
```

## Infisical Configuration via SDK

### Install the SDK

```bash
npm install node-infisical
```

### Create a Machine Identity

```typescript
import { InfisicalClient } from "node-infisical";

const client = new InfisicalClient({
  baseUrl: "https://app.infisical.com",
});

const { identity } = await client.identities.create({
  name: "jwt-service-identity",
  organizationId: "org_id_here",
});
```

### Attach JWT Auth Method

```typescript
const { identityJwtAuth } = await client.identityAuth.jwt.attach({
  identityId: identity.id,
  configurationType: "jwks",
  jwksUrl: "https://issuer.example.com/.well-known/jwks.json",
  jwksCaCert: "",
  publicKeys: [],
  boundIssuer: "https://issuer.example.com",
  boundAudiences: "infisical",
  boundClaims: { role: "admin" },
  boundSubject: "my-service",
  accessTokenTTL: 2592000,
  accessTokenMaxTTL: 2592000,
  accessTokenNumUsesLimit: 0,
  accessTokenTrustedIps: [{ ipAddress: "0.0.0.0/0" }],
});
```

#### Attach Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `identityId` | `string` | Yes | The ID of the identity to attach JWT Auth to |
| `configurationType` | `string` | No | How to validate JWTs: `"jwks"` (JWKS URL) or `"static"` (public keys) |
| `jwksUrl` | `string` | No | URL of the JWKS endpoint (used when `configurationType` is `"jwks"`) |
| `jwksCaCert` | `string` | No | PEM-encoded CA certificate for the JWKS endpoint (for self-signed certs) |
| `publicKeys` | `string[]` | No | Array of PEM-encoded public keys (used when `configurationType` is `"static"`) |
| `boundIssuer` | `string` | No | Expected `iss` claim in the JWT |
| `boundAudiences` | `string` | No | Expected `aud` claim in the JWT |
| `boundClaims` | `Record<string, string>` | No | Key-value pairs of custom claims that must be present in the JWT |
| `boundSubject` | `string` | No | Expected `sub` claim in the JWT |
| `accessTokenTTL` | `number` | No | Access token time-to-live in seconds |
| `accessTokenMaxTTL` | `number` | No | Maximum access token lifetime in seconds |
| `accessTokenNumUsesLimit` | `number` | No | Maximum token uses. `0` = unlimited |
| `accessTokenTrustedIps` | `Array<{ ipAddress: string }>` | No | IP addresses allowed to use the access token |

### Update JWT Auth

```typescript
const { identityJwtAuth } = await client.identityAuth.jwt.update({
  identityId: "identity_id_here",
  boundAudiences: "new-audience",
});
```

#### Update Parameters

Same as Attach parameters — all fields except `identityId` are optional.

### Get JWT Auth

```typescript
const { identityJwtAuth } = await client.identityAuth.jwt.get({
  identityId: "identity_id_here",
});
```

### Revoke JWT Auth

```typescript
const { identityJwtAuth } = await client.identityAuth.jwt.revoke({
  identityId: "identity_id_here",
});
```

## Authenticate

Use `client.login()` with the `jwtAuth` key:

```typescript
await client.login({
  jwtAuth: {
    identityId: "your_identity_id",
    jwt: yourJwtToken,
  },
});
```

### Login Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `identityId` | `string` | Yes | The ID of the identity with JWT Auth attached |
| `jwt` | `string` | Yes | A valid JWT signed by the configured issuer |

### Login Response

| Field | Type | Description |
|-------|------|-------------|
| `accessToken` | `string` | The access token for authenticating API requests |
| `expiresIn` | `number` | Token lifetime in seconds |
| `accessTokenMaxTTL` | `number` | Maximum token lifetime in seconds |
| `tokenType` | `string` | Token type (e.g., `"Bearer"`) |

## Full Working Example

```typescript
import { InfisicalClient } from "node-infisical";
import jwt from "jsonwebtoken";
import { readFileSync } from "fs";

function generateJwt(): string {
  const privateKey = readFileSync("private-key.pem", "utf-8");
  return jwt.sign(
    { sub: "my-service", aud: "infisical", role: "admin" },
    privateKey,
    {
      algorithm: "RS256",
      issuer: "https://issuer.example.com",
      expiresIn: "1h",
    }
  );
}

async function main() {
  const client = new InfisicalClient({
    baseUrl: "https://app.infisical.com",
  });

  const token = generateJwt();

  await client.login({
    jwtAuth: {
      identityId: process.env.INFISICAL_IDENTITY_ID!,
      jwt: token,
    },
  });

  // Fetch secrets
  const secrets = await client.secrets.list({
    projectId: "your_project_id",
    environment: "production",
    secretPath: "/",
  });

  for (const secret of secrets.secrets) {
    console.log(`${secret.secretKey}=${secret.secretValue}`);
  }
}

main().catch(console.error);
```

## Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| `401 Unauthorized` | Invalid signature or expired token | Verify the JWT is signed with the correct key and hasn't expired |
| `403 Forbidden` | Issuer mismatch | Verify `boundIssuer` matches the `iss` claim |
| `403 Forbidden` | Audience mismatch | Verify `boundAudiences` matches the `aud` claim |
| `403 Forbidden` | Subject mismatch | Verify `boundSubject` matches the `sub` claim |
| `403 Forbidden` | Custom claim mismatch | Check that all `boundClaims` exist in the token payload |
| JWKS fetch failed | JWKS URL unreachable | Verify the URL is correct and accessible from Infisical |
| JWKS certificate error | Self-signed cert on JWKS endpoint | Provide the CA certificate via `jwksCaCert` |
| No matching key found | Key ID (`kid`) not in JWKS | Ensure the JWT `kid` header matches a key in the JWKS |
| Static key validation fails | Wrong public key configured | Verify the PEM public key matches the private key used to sign |
