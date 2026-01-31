# Alicloud Auth

## Overview

Alicloud Auth allows machine identities to authenticate with Infisical using Alibaba Cloud (Alicloud) RAM credentials. It verifies identity using STS (Security Token Service) tokens and RAM role ARNs. This method is ideal for ECS instances, Function Compute, Container Service, and other Alicloud workloads.

## Prerequisites

- An Alibaba Cloud account with RAM roles configured
- The Infisical Node.js SDK installed: `npm install node-infisical`
- A machine identity created in Infisical
- Alicloud credentials available in the runtime environment

## Provider Setup

### 1. Create a RAM Role

In the Alicloud Console:
1. Navigate to **RAM > Roles**
2. Create a new role for your service
3. Note the **Role ARN** (e.g., `acs:ram::1234567890:role/infisical-auth-role`)

### 2. Obtain an STS Token

Use the Alicloud SDK to assume a role and get temporary credentials:

```typescript
import China from "@alicloud/pop-core";

const stsClient = new China({
  accessKeyId: process.env.ALICLOUD_ACCESS_KEY_ID!,
  accessKeySecret: process.env.ALICLOUD_ACCESS_KEY_SECRET!,
  endpoint: "https://sts.aliyuncs.com",
  apiVersion: "2015-04-01",
});

const result = await stsClient.request("AssumeRole", {
  RoleArn: "acs:ram::1234567890:role/infisical-auth-role",
  RoleSessionName: "infisical-session",
  DurationSeconds: 3600,
});

const stsToken = result.Credentials.SecurityToken;
const identityArn = "acs:ram::1234567890:role/infisical-auth-role";
```

**From ECS Instance Metadata (instance with RAM role):**
```bash
curl http://100.100.100.200/latest/meta-data/ram/security-credentials/<role-name>
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
  name: "alicloud-service-identity",
  organizationId: "org_id_here",
});
```

### Attach Alicloud Auth Method

```typescript
const { identityAlicloudAuth } = await client.identityAuth.alicloud.attach({
  identityId: identity.id,
  allowedArns: "acs:ram::1234567890:role/infisical-auth-role",
  allowedAccountIds: "1234567890",
  accessTokenTTL: 2592000,
  accessTokenMaxTTL: 2592000,
  accessTokenNumUsesLimit: 0,
  accessTokenTrustedIps: [{ ipAddress: "0.0.0.0/0" }],
});
```

#### Attach Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `identityId` | `string` | Yes | The ID of the identity to attach Alicloud Auth to |
| `allowedArns` | `string` | No | Comma-separated list of allowed Alicloud RAM role ARNs |
| `allowedAccountIds` | `string` | No | Comma-separated list of allowed Alicloud account IDs |
| `accessTokenTTL` | `number` | No | Access token time-to-live in seconds |
| `accessTokenMaxTTL` | `number` | No | Maximum access token lifetime in seconds |
| `accessTokenNumUsesLimit` | `number` | No | Maximum token uses. `0` = unlimited |
| `accessTokenTrustedIps` | `Array<{ ipAddress: string }>` | No | IP addresses allowed to use the access token |

### Update Alicloud Auth

```typescript
const { identityAlicloudAuth } = await client.identityAuth.alicloud.update({
  identityId: "identity_id_here",
  allowedArns: "acs:ram::1234567890:role/new-role",
});
```

#### Update Parameters

Same as Attach parameters — all fields except `identityId` are optional.

### Get Alicloud Auth

```typescript
const { identityAlicloudAuth } = await client.identityAuth.alicloud.get({
  identityId: "identity_id_here",
});
```

### Revoke Alicloud Auth

```typescript
const { identityAlicloudAuth } = await client.identityAuth.alicloud.revoke({
  identityId: "identity_id_here",
});
```

## Authenticate

Use `client.login()` with the `alicloudAuth` key:

```typescript
await client.login({
  alicloudAuth: {
    identityId: "your_identity_id",
    stsToken: alicloudStsToken,
    identityArn: "acs:ram::1234567890:role/infisical-auth-role",
  },
});
```

### Login Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `identityId` | `string` | Yes | The ID of the identity with Alicloud Auth attached |
| `stsToken` | `string` | Yes | An Alicloud STS security token |
| `identityArn` | `string` | Yes | The Alicloud RAM role ARN |

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

async function getAlicloudStsToken(): Promise<{
  stsToken: string;
  identityArn: string;
}> {
  // Using instance metadata (ECS with RAM role)
  const response = await fetch(
    "http://100.100.100.200/latest/meta-data/ram/security-credentials/infisical-auth-role"
  );
  const data = await response.json();

  return {
    stsToken: data.SecurityToken,
    identityArn: "acs:ram::1234567890:role/infisical-auth-role",
  };
}

async function main() {
  const client = new InfisicalClient({
    baseUrl: "https://app.infisical.com",
  });

  const { stsToken, identityArn } = await getAlicloudStsToken();

  await client.login({
    alicloudAuth: {
      identityId: process.env.INFISICAL_IDENTITY_ID!,
      stsToken,
      identityArn,
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
| `401 Unauthorized` | Invalid or expired STS token | Obtain a fresh STS token; tokens have limited lifetime |
| `403 Forbidden` | ARN not in allowed list | Add the RAM role ARN to `allowedArns` |
| `403 Forbidden` | Account ID not in allowed list | Add the account ID to `allowedAccountIds` |
| STS token expired | Token lifetime exceeded | Request a new STS token with appropriate `DurationSeconds` |
| Cannot obtain STS token | No RAM role on ECS instance | Attach a RAM role to the ECS instance |
| Metadata service unreachable | Not running on Alicloud ECS | Use `AssumeRole` API with explicit credentials instead |
| ARN format error | Incorrect ARN format | Use the format `acs:ram::<account-id>:role/<role-name>` |
