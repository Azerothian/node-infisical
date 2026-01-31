# Keycloak OIDC Auth

## Overview

This guide covers authenticating machine identities with Infisical using Keycloak as an OIDC identity provider. Keycloak issues JWTs via the `client_credentials` grant, which Infisical validates using OIDC discovery. This is a provider-specific guide that uses OIDC Auth under the hood.

For generic OIDC Auth documentation, see [OIDC-AUTH.md](./OIDC-AUTH.md).

## Prerequisites

- A running Keycloak instance (version 18+ recommended)
- The Infisical Node.js SDK installed: `npm install node-infisical`
- A machine identity created in Infisical
- Admin access to a Keycloak realm

## Provider Setup

### 1. Create a Realm (or use existing)

In the Keycloak Admin Console:
1. Click the realm dropdown in the top-left
2. Click **Create Realm**
3. Enter a realm name (e.g., `infisical`)
4. Click **Create**

### 2. Create an OIDC Client

1. Navigate to **Clients > Create client**
2. Set the following:
   - **Client type**: OpenID Connect
   - **Client ID**: `infisical-service` (or your preferred name)
3. Click **Next**
4. Set **Client authentication**: **On** (this makes it a confidential client)
5. Under **Authentication flow**, ensure **Service accounts roles** is checked
6. Click **Save**

### 3. Get Client Credentials

1. Navigate to **Clients > infisical-service > Credentials**
2. Copy the **Client secret**

### 4. Add an Audience Mapper

Keycloak tokens don't include the `aud` claim by default for service accounts. Add one:

1. Navigate to **Clients > infisical-service > Client scopes**
2. Click on the `infisical-service-dedicated` scope
3. Click **Add mapper > By configuration > Audience**
4. Configure:
   - **Name**: `infisical-audience`
   - **Included Custom Audience**: `infisical` (or your chosen audience value)
   - **Add to access token**: **On**
5. Click **Save**

### 5. Note the OIDC Discovery URL

The discovery URL for your realm is:
```
https://<keycloak-host>/realms/<realm-name>/.well-known/openid-configuration
```

For example:
```
https://keycloak.example.com/realms/infisical/.well-known/openid-configuration
```

### 6. Obtain a JWT from Keycloak

Use the `client_credentials` grant to get a token:

```typescript
async function getKeycloakToken(): Promise<string> {
  const response = await fetch(
    "https://keycloak.example.com/realms/infisical/protocol/openid-connect/token",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: "infisical-service",
        client_secret: "your_client_secret",
      }),
    }
  );

  const data = await response.json();
  return data.access_token;
}
```

Or with `curl`:
```bash
curl -X POST \
  "https://keycloak.example.com/realms/infisical/protocol/openid-connect/token" \
  -d "grant_type=client_credentials" \
  -d "client_id=infisical-service" \
  -d "client_secret=YOUR_CLIENT_SECRET"
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
  name: "keycloak-service-identity",
  organizationId: "org_id_here",
});
```

### Attach OIDC Auth Method (Keycloak)

```typescript
const { identityOidcAuth } = await client.identityAuth.oidc.attach({
  identityId: identity.id,
  oidcDiscoveryUrl: "https://keycloak.example.com/realms/infisical/.well-known/openid-configuration",
  boundIssuer: "https://keycloak.example.com/realms/infisical",
  boundAudiences: "infisical",
  boundSubject: "service-account-infisical-service",
  boundClaims: {},
  caCert: "",
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
| `oidcDiscoveryUrl` | `string` | No | The Keycloak OIDC discovery URL: `https://<host>/realms/<realm>/.well-known/openid-configuration` |
| `caCert` | `string` | No | PEM-encoded CA certificate (for self-signed Keycloak instances) |
| `boundIssuer` | `string` | No | Expected issuer — must match `https://<host>/realms/<realm>` |
| `boundAudiences` | `string` | No | Expected audience — must match the audience mapper value |
| `boundClaims` | `Record<string, string>` | No | Additional claims to validate (e.g., realm roles) |
| `boundSubject` | `string` | No | Expected subject — Keycloak sets this to `service-account-<client-id>` for service accounts |
| `accessTokenTTL` | `number` | No | Access token time-to-live in seconds |
| `accessTokenMaxTTL` | `number` | No | Maximum access token lifetime in seconds |
| `accessTokenNumUsesLimit` | `number` | No | Maximum token uses. `0` = unlimited |
| `accessTokenTrustedIps` | `Array<{ ipAddress: string }>` | No | IP addresses allowed to use the access token |

### Update OIDC Auth

```typescript
const { identityOidcAuth } = await client.identityAuth.oidc.update({
  identityId: "identity_id_here",
  boundAudiences: "new-audience",
});
```

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

Use `client.login()` with the `oidcAuth` key and a Keycloak JWT:

```typescript
await client.login({
  oidcAuth: {
    identityId: "your_identity_id",
    jwt: keycloakToken,
  },
});
```

### Login Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `identityId` | `string` | Yes | The ID of the identity with OIDC Auth attached |
| `jwt` | `string` | Yes | A JWT access token obtained from Keycloak via `client_credentials` grant |

### Login Response

| Field | Type | Description |
|-------|------|-------------|
| `accessToken` | `string` | The access token for authenticating Infisical API requests |
| `expiresIn` | `number` | Token lifetime in seconds |
| `accessTokenMaxTTL` | `number` | Maximum token lifetime in seconds |
| `tokenType` | `string` | Token type (e.g., `"Bearer"`) |

## Full Working Example

```typescript
import { InfisicalClient } from "node-infisical";

async function getKeycloakToken(): Promise<string> {
  const response = await fetch(
    "https://keycloak.example.com/realms/infisical/protocol/openid-connect/token",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.KEYCLOAK_CLIENT_ID!,
        client_secret: process.env.KEYCLOAK_CLIENT_SECRET!,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Keycloak token request failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data.access_token;
}

async function main() {
  const client = new InfisicalClient({
    baseUrl: "https://app.infisical.com",
  });

  // Step 1: Get JWT from Keycloak
  const jwt = await getKeycloakToken();

  // Step 2: Login to Infisical using OIDC Auth
  await client.login({
    oidcAuth: {
      identityId: process.env.INFISICAL_IDENTITY_ID!,
      jwt,
    },
  });

  // Step 3: Use the authenticated client
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
| `401 Unauthorized` | Invalid or expired Keycloak token | Get a fresh token; check Keycloak token lifespan settings |
| `403 Forbidden` - issuer | Issuer mismatch | Ensure `boundIssuer` is `https://<host>/realms/<realm>` (no trailing slash) |
| `403 Forbidden` - audience | Missing `aud` claim in token | Add an Audience mapper to the Keycloak client (see step 4) |
| `403 Forbidden` - subject | Subject mismatch | Keycloak sets `sub` to an internal UUID for service accounts; use `service-account-<client-id>` or leave `boundSubject` empty |
| Discovery URL fails | Wrong realm name or Keycloak URL | Verify the realm exists and the URL is accessible |
| Certificate error | Self-signed Keycloak cert | Provide the CA cert via `caCert` parameter |
| `client_credentials` grant fails | Client authentication not enabled | Enable "Client authentication" in the Keycloak client settings |
| No service account | "Service accounts roles" not checked | Enable it in the client's authentication flow settings |
| Token missing custom claims | No mapper configured | Add protocol mappers to include required claims |
