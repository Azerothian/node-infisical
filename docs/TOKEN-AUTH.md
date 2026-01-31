# Token Auth

## Overview

Token Auth is the simplest authentication method in Infisical. It requires only the identity ID to log in — no external credentials, JWTs, or provider configuration needed. Tokens are created and managed directly through the SDK. This method is suitable for internal services, development environments, and scenarios where minimal authentication overhead is desired.

## Prerequisites

- An Infisical account with an organization
- The Infisical Node.js SDK installed: `npm install node-infisical`
- A machine identity created in Infisical

## Provider Setup

No external provider setup is required. Token Auth is fully managed within Infisical.

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

// Requires existing authentication
const { identity } = await client.identities.create({
  name: "my-token-identity",
  organizationId: "org_id_here",
});
```

### Attach Token Auth Method

```typescript
const { identityTokenAuth } = await client.identityAuth.token.attach({
  identityId: identity.id,
  accessTokenTTL: 2592000,
  accessTokenMaxTTL: 2592000,
  accessTokenNumUsesLimit: 0,
  accessTokenTrustedIps: [{ ipAddress: "0.0.0.0/0" }],
});
```

#### Attach Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `identityId` | `string` | Yes | The ID of the identity to attach Token Auth to |
| `accessTokenTTL` | `number` | No | Access token time-to-live in seconds |
| `accessTokenMaxTTL` | `number` | No | Maximum access token lifetime in seconds |
| `accessTokenNumUsesLimit` | `number` | No | Maximum number of times the access token can be used. `0` = unlimited |
| `accessTokenTrustedIps` | `Array<{ ipAddress: string }>` | No | IP addresses allowed to use the access token |

### Create a Token

```typescript
const { accessToken, tokenData } = await client.identityAuth.token.createToken({
  identityId: identity.id,
  name: "production-token", // optional
});

// Save the accessToken — it is only returned once
console.log("Token:", accessToken);
console.log("Token ID:", tokenData.id);
```

#### Create Token Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `identityId` | `string` | Yes | The ID of the identity |
| `name` | `string` | No | A human-readable name for the token |

### Update Token Auth

```typescript
const { identityTokenAuth } = await client.identityAuth.token.update({
  identityId: "identity_id_here",
  accessTokenTTL: 3600,
});
```

#### Update Parameters

Same as Attach parameters — all fields except `identityId` are optional.

### Get Token Auth

```typescript
const { identityTokenAuth } = await client.identityAuth.token.get({
  identityId: "identity_id_here",
});
```

### Revoke Token Auth

```typescript
const { identityTokenAuth } = await client.identityAuth.token.revoke({
  identityId: "identity_id_here",
});
```

### Token Management

#### List Tokens

```typescript
const { tokens } = await client.identityAuth.token.listTokens({
  identityId: "identity_id_here",
  offset: 0,  // optional
  limit: 20,  // optional
});
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `identityId` | `string` | Yes | The ID of the identity |
| `offset` | `number` | No | Pagination offset |
| `limit` | `number` | No | Number of tokens to return |

#### Get Token

```typescript
const { token } = await client.identityAuth.token.getToken({
  identityId: "identity_id_here",
  tokenId: "token_id_here",
});
```

#### Update Token

```typescript
const { token } = await client.identityAuth.token.updateToken({
  identityId: "identity_id_here",
  tokenId: "token_id_here",
  name: "renamed-token", // optional
});
```

#### Revoke Token

```typescript
const { token } = await client.identityAuth.token.revokeToken({
  identityId: "identity_id_here",
  tokenId: "token_id_here",
});
```

## Authenticate

Use `client.login()` with the `tokenAuth` key:

```typescript
import { InfisicalClient } from "node-infisical";

const client = new InfisicalClient({
  baseUrl: "https://app.infisical.com",
});

await client.login({
  tokenAuth: {
    identityId: "your_identity_id",
  },
});
```

### Login Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `identityId` | `string` | Yes | The ID of the identity with Token Auth attached |

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

async function main() {
  const client = new InfisicalClient({
    baseUrl: "https://app.infisical.com",
  });

  // Authenticate with Token Auth
  await client.login({
    tokenAuth: {
      identityId: process.env.INFISICAL_IDENTITY_ID!,
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
| `401 Unauthorized` | Identity ID not found or Token Auth not attached | Verify the identity exists and has Token Auth attached |
| `403 Forbidden` | IP not in trusted list | Check `accessTokenTrustedIps` on the auth config |
| Token expires immediately | `accessTokenTTL` set to 0 or very low | Update the auth config with a reasonable TTL |
| Cannot create tokens | Token Auth not attached to identity | Attach Token Auth first using `client.identityAuth.token.attach()` |
| Token revoked unexpectedly | `accessTokenNumUsesLimit` reached | Create a new token or increase the uses limit |
