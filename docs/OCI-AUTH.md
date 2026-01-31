# OCI Auth

## Overview

OCI Auth allows machine identities to authenticate with Infisical using Oracle Cloud Infrastructure (OCI) credentials. It verifies requests signed with OCI API keys. This method is ideal for workloads running on OCI compute instances, OCI Functions, and other OCI services.

## Prerequisites

- An OCI tenancy with configured users and API keys
- The Infisical Node.js SDK installed: `npm install node-infisical`
- A machine identity created in Infisical
- OCI API key credentials (user OCID, tenancy OCID, key fingerprint, private key)

## Provider Setup

### 1. Create an OCI API Key

In the OCI Console:
1. Navigate to **Identity & Security > Users**
2. Select the user (or create a service user)
3. Under **API Keys**, click **Add API Key**
4. Generate or upload an RSA key pair
5. Note the **User OCID**, **Tenancy OCID**, and **Key Fingerprint**

### 2. Generate Signed Request Headers

OCI Auth requires request headers signed with the OCI API key. Use the OCI SDK to generate these:

```typescript
import { SimpleAuthenticationDetailsProvider, DefaultRequestSigner } from "oci-common";

const provider = new SimpleAuthenticationDetailsProvider(
  tenancyOcid,
  userOcid,
  fingerprint,
  privateKey,
  null, // passphrase
  region
);

// Sign a request and extract headers
const signer = new DefaultRequestSigner(provider);
// The signed headers are passed as the `requestHeaders` login parameter
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
  name: "oci-service-identity",
  organizationId: "org_id_here",
});
```

### Attach OCI Auth Method

```typescript
const { identityOciAuth } = await client.identityAuth.oci.attach({
  identityId: identity.id,
  tenancyOcid: "ocid1.tenancy.oc1..aaaa...",
  allowedUserOcids: "ocid1.user.oc1..aaaa...",
  allowedCompartmentOcids: "ocid1.compartment.oc1..aaaa...",
  accessTokenTTL: 2592000,
  accessTokenMaxTTL: 2592000,
  accessTokenNumUsesLimit: 0,
  accessTokenTrustedIps: [{ ipAddress: "0.0.0.0/0" }],
});
```

#### Attach Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `identityId` | `string` | Yes | The ID of the identity to attach OCI Auth to |
| `tenancyOcid` | `string` | No | The OCI tenancy OCID |
| `allowedUserOcids` | `string` | No | Comma-separated list of allowed OCI user OCIDs |
| `allowedCompartmentOcids` | `string` | No | Comma-separated list of allowed OCI compartment OCIDs |
| `accessTokenTTL` | `number` | No | Access token time-to-live in seconds |
| `accessTokenMaxTTL` | `number` | No | Maximum access token lifetime in seconds |
| `accessTokenNumUsesLimit` | `number` | No | Maximum token uses. `0` = unlimited |
| `accessTokenTrustedIps` | `Array<{ ipAddress: string }>` | No | IP addresses allowed to use the access token |

### Update OCI Auth

```typescript
const { identityOciAuth } = await client.identityAuth.oci.update({
  identityId: "identity_id_here",
  allowedUserOcids: "ocid1.user.oc1..bbbb...",
});
```

#### Update Parameters

Same as Attach parameters — all fields except `identityId` are optional.

### Get OCI Auth

```typescript
const { identityOciAuth } = await client.identityAuth.oci.get({
  identityId: "identity_id_here",
});
```

### Revoke OCI Auth

```typescript
const { identityOciAuth } = await client.identityAuth.oci.revoke({
  identityId: "identity_id_here",
});
```

## Authenticate

Use `client.login()` with the `ociAuth` key:

```typescript
await client.login({
  ociAuth: {
    identityId: "your_identity_id",
    userOcid: "ocid1.user.oc1..aaaa...",
    requestHeaders: JSON.stringify(signedHeaders),
  },
});
```

### Login Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `identityId` | `string` | Yes | The ID of the identity with OCI Auth attached |
| `userOcid` | `string` | Yes | The OCI user OCID making the authentication request |
| `requestHeaders` | `string` | Yes | JSON-stringified request headers signed with the OCI API key |

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
import {
  SimpleAuthenticationDetailsProvider,
  DefaultRequestSigner,
} from "oci-common";
import { readFileSync } from "fs";

async function getSignedOciHeaders(): Promise<string> {
  const privateKey = readFileSync("~/.oci/oci_api_key.pem", "utf-8");

  const provider = new SimpleAuthenticationDetailsProvider(
    process.env.OCI_TENANCY_OCID!,
    process.env.OCI_USER_OCID!,
    process.env.OCI_FINGERPRINT!,
    privateKey,
    null,
    "us-phoenix-1"
  );

  const signer = new DefaultRequestSigner(provider);

  // Create and sign a request, then extract headers
  const request = {
    method: "GET",
    headers: new Headers({ "content-type": "application/json" }),
    uri: "https://auth.example.com/v1/authenticate",
  };

  await signer.signHttpRequest(request);
  return JSON.stringify(Object.fromEntries(request.headers.entries()));
}

async function main() {
  const client = new InfisicalClient({
    baseUrl: "https://app.infisical.com",
  });

  const requestHeaders = await getSignedOciHeaders();

  await client.login({
    ociAuth: {
      identityId: process.env.INFISICAL_IDENTITY_ID!,
      userOcid: process.env.OCI_USER_OCID!,
      requestHeaders,
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
| `401 Unauthorized` | Invalid or expired signature | Ensure the API key is active and the clock is synchronized |
| `403 Forbidden` | User OCID not in allowed list | Add the user OCID to `allowedUserOcids` |
| `403 Forbidden` | Compartment OCID not in allowed list | Add the compartment to `allowedCompartmentOcids` |
| `403 Forbidden` | Tenancy mismatch | Verify `tenancyOcid` matches the user's tenancy |
| Signature verification fails | Wrong private key or fingerprint | Verify the API key fingerprint and private key match |
| Clock skew error | System clock out of sync | Synchronize the system clock using NTP |
| Missing API key | No OCI config file or key | Set up `~/.oci/config` or provide credentials programmatically |
