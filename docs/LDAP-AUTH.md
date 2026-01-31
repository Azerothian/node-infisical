# LDAP Auth

## Overview

LDAP Auth allows machine identities to authenticate with Infisical using LDAP (Lightweight Directory Access Protocol) credentials. It verifies username and password against an LDAP or Active Directory server and can restrict access based on group membership. This method is ideal for environments with existing LDAP/AD infrastructure for centralized identity management.

## Prerequisites

- An LDAP or Active Directory server accessible from Infisical
- An LDAP configuration already created in Infisical (with bind DN, URL, etc.)
- The Infisical Node.js SDK installed: `npm install node-infisical`
- A machine identity created in Infisical

## Provider Setup

### 1. Ensure LDAP Server Accessibility

Your LDAP/AD server must be reachable from the Infisical server. Common LDAP URLs:
- **LDAP**: `ldap://ldap.example.com:389`
- **LDAPS (TLS)**: `ldaps://ldap.example.com:636`

### 2. Create an LDAP Configuration in Infisical

Before attaching LDAP Auth to an identity, you need an LDAP configuration in Infisical that specifies the LDAP server URL, bind DN, base DN, and other connection details. This is done through the Infisical dashboard or API and yields a `ldapConfigId`.

### 3. Identify Allowed Groups

Determine which LDAP groups the identity should be restricted to:
- **Group name**: e.g., `infisical-services`
- **Group DN**: e.g., `cn=infisical-services,ou=groups,dc=example,dc=com`

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
  name: "ldap-service-identity",
  organizationId: "org_id_here",
});
```

### Attach LDAP Auth Method

```typescript
const { identityLdapAuth } = await client.identityAuth.ldap.attach({
  identityId: identity.id,
  ldapConfigId: "your_ldap_config_id",
  allowedGroups: "infisical-services,ci-cd-runners",
  allowedGroupsDN: "cn=infisical-services,ou=groups,dc=example,dc=com",
  accessTokenTTL: 2592000,
  accessTokenMaxTTL: 2592000,
  accessTokenNumUsesLimit: 0,
  accessTokenTrustedIps: [{ ipAddress: "0.0.0.0/0" }],
});
```

#### Attach Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `identityId` | `string` | Yes | The ID of the identity to attach LDAP Auth to |
| `ldapConfigId` | `string` | No | The ID of the LDAP configuration in Infisical |
| `allowedGroups` | `string` | No | Comma-separated list of allowed LDAP group names |
| `allowedGroupsDN` | `string` | No | Comma-separated list of allowed LDAP group distinguished names |
| `accessTokenTTL` | `number` | No | Access token time-to-live in seconds |
| `accessTokenMaxTTL` | `number` | No | Maximum access token lifetime in seconds |
| `accessTokenNumUsesLimit` | `number` | No | Maximum token uses. `0` = unlimited |
| `accessTokenTrustedIps` | `Array<{ ipAddress: string }>` | No | IP addresses allowed to use the access token |

### Update LDAP Auth

```typescript
const { identityLdapAuth } = await client.identityAuth.ldap.update({
  identityId: "identity_id_here",
  allowedGroups: "new-group-name",
});
```

#### Update Parameters

Same as Attach parameters — all fields except `identityId` are optional.

### Get LDAP Auth

```typescript
const { identityLdapAuth } = await client.identityAuth.ldap.get({
  identityId: "identity_id_here",
});
```

### Revoke LDAP Auth

```typescript
const { identityLdapAuth } = await client.identityAuth.ldap.revoke({
  identityId: "identity_id_here",
});
```

## Authenticate

Use `client.login()` with the `ldapAuth` key:

```typescript
await client.login({
  ldapAuth: {
    identityId: "your_identity_id",
    username: "service-account",
    password: "service-password",
    ldapConfigId: "ldap_config_id", // optional, overrides the one set on attach
  },
});
```

### Login Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `identityId` | `string` | Yes | The ID of the identity with LDAP Auth attached |
| `username` | `string` | Yes | The LDAP username (e.g., sAMAccountName, uid, or full DN) |
| `password` | `string` | Yes | The LDAP password |
| `ldapConfigId` | `string` | No | Override the LDAP configuration ID for this login attempt |

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

  // Authenticate with LDAP credentials
  await client.login({
    ldapAuth: {
      identityId: process.env.INFISICAL_IDENTITY_ID!,
      username: process.env.LDAP_USERNAME!,
      password: process.env.LDAP_PASSWORD!,
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
| `401 Unauthorized` | Invalid LDAP credentials | Verify the username and password are correct |
| `403 Forbidden` | User not in allowed group | Add the user's group to `allowedGroups` or `allowedGroupsDN` |
| LDAP bind fails | Wrong bind DN or password in LDAP config | Update the LDAP configuration in Infisical |
| Connection timeout | LDAP server unreachable | Verify network connectivity and firewall rules |
| TLS handshake error | Certificate issue with LDAPS | Verify the LDAP server certificate or use `ldap://` for testing |
| Invalid `ldapConfigId` | Config ID doesn't exist | Verify the LDAP configuration was created in Infisical |
| Account locked | Too many failed attempts | Check the AD/LDAP server's account lockout policy |
