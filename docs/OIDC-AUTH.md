# OIDC Auth

## Overview

OIDC Auth allows machine identities to authenticate with Infisical using OpenID Connect (OIDC) tokens from any compliant identity provider. Infisical validates the JWT against the provider's OIDC discovery endpoint and verifies claims such as issuer, audience, and subject. This method works with any OIDC-compliant provider including Auth0, Okta, Keycloak, Azure AD, Google, and others.

## Prerequisites

- An OIDC-compliant identity provider configured with a client
- The Infisical Node.js SDK installed: `npm install node-infisical`
- A machine identity created in Infisical
- The provider's OIDC discovery URL (e.g., `https://provider.example.com/.well-known/openid-configuration`)

## Provider Setup

### Generic OIDC Provider Configuration

1. **Create a client/application** in your OIDC provider
2. **Enable the `client_credentials` grant** (for machine-to-machine auth) or another appropriate grant type
3. **Note the OIDC discovery URL** — typically `https://<provider-domain>/.well-known/openid-configuration`
4. **Configure the audience** — the token must include an `aud` claim matching your Infisical configuration
5. **Obtain a JWT** from the provider using the client credentials flow:

```typescript
// Example using fetch with client_credentials grant
const response = await fetch("https://provider.example.com/oauth/token", {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({
    grant_type: "client_credentials",
    client_id: "your_client_id",
    client_secret: "your_client_secret",
    audience: "infisical",
  }),
});

const { access_token } = await response.json();
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
  name: "oidc-service-identity",
  organizationId: "org_id_here",
});
```

### Attach OIDC Auth Method

```typescript
const { identityOidcAuth } = await client.identityAuth.oidc.attach({
  identityId: identity.id,
  oidcDiscoveryUrl: "https://provider.example.com/.well-known/openid-configuration",
  caCert: "",
  boundIssuer: "https://provider.example.com/",
  boundAudiences: "infisical",
  boundClaims: { role: "admin" },
  boundSubject: "service-account-id",
  accessTokenTTL: 2592000,
  accessTokenMaxTTL: 2592000,
  accessTokenNumUsesLimit: 0,
  accessTokenTrustedIps: [{ ipAddress: "0.0.0.0/0" }],
});
```

#### Attach Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `identityId` | `string` | Yes | The ID of the identity to attach OIDC Auth to |
| `oidcDiscoveryUrl` | `string` | No | The OIDC discovery URL (`.well-known/openid-configuration` endpoint) |
| `caCert` | `string` | No | PEM-encoded CA certificate for the OIDC provider (for self-signed certs) |
| `boundIssuer` | `string` | No | Expected `iss` claim in the JWT |
| `boundAudiences` | `string` | No | Expected `aud` claim in the JWT |
| `boundClaims` | `Record<string, string>` | No | Key-value pairs of custom claims that must be present in the JWT |
| `boundSubject` | `string` | No | Expected `sub` claim in the JWT |
| `accessTokenTTL` | `number` | No | Access token time-to-live in seconds |
| `accessTokenMaxTTL` | `number` | No | Maximum access token lifetime in seconds |
| `accessTokenNumUsesLimit` | `number` | No | Maximum token uses. `0` = unlimited |
| `accessTokenTrustedIps` | `Array<{ ipAddress: string }>` | No | IP addresses allowed to use the access token |

### Update OIDC Auth

```typescript
const { identityOidcAuth } = await client.identityAuth.oidc.update({
  identityId: "identity_id_here",
  boundAudiences: "new-audience",
  boundClaims: { role: "service" },
});
```

#### Update Parameters

Same as Attach parameters — all fields except `identityId` are optional.

### Get OIDC Auth

```typescript
const { identityOidcAuth } = await client.identityAuth.oidc.get({
  identityId: "identity_id_here",
});
```

### Revoke OIDC Auth

```typescript
const { identityOidcAuth } = await client.identityAuth.oidc.revoke({
  identityId: "identity_id_here",
});
```

## Authenticate

Use `client.login()` with the `oidcAuth` key:

```typescript
await client.login({
  oidcAuth: {
    identityId: "your_identity_id",
    jwt: oidcToken,
  },
});
```

### Login Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `identityId` | `string` | Yes | The ID of the identity with OIDC Auth attached |
| `jwt` | `string` | Yes | An OIDC-compliant JWT (ID token or access token) from the provider |

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

async function getOidcToken(): Promise<string> {
  const response = await fetch("https://provider.example.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.OIDC_CLIENT_ID!,
      client_secret: process.env.OIDC_CLIENT_SECRET!,
      audience: "infisical",
    }),
  });
  const data = await response.json();
  return data.access_token;
}

async function main() {
  const client = new InfisicalClient({
    baseUrl: "https://app.infisical.com",
  });

  const jwt = await getOidcToken();

  await client.login({
    oidcAuth: {
      identityId: process.env.INFISICAL_IDENTITY_ID!,
      jwt,
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
| `401 Unauthorized` | Invalid or expired JWT | Ensure the token is fresh and properly signed |
| `403 Forbidden` | Issuer mismatch | Verify `boundIssuer` matches the `iss` claim in the token |
| `403 Forbidden` | Audience mismatch | Verify `boundAudiences` matches the `aud` claim |
| `403 Forbidden` | Subject mismatch | Verify `boundSubject` matches the `sub` claim |
| `403 Forbidden` | Custom claim mismatch | Check that all `boundClaims` key-value pairs exist in the token |
| Discovery URL unreachable | OIDC provider down or wrong URL | Verify the discovery URL is correct and accessible from Infisical |
| Certificate error | Self-signed OIDC provider cert | Provide the CA certificate via the `caCert` parameter |
