# TLS Certificate Auth

## Overview

TLS Certificate Auth allows machine identities to authenticate with Infisical using X.509 client certificates. Infisical validates the client certificate against a trusted CA certificate and can restrict access based on the certificate's Common Name (CN) and Organization (O) fields. This method is ideal for environments with a PKI (Public Key Infrastructure) where mutual TLS is used.

## Prerequisites

- A Certificate Authority (CA) that issues client certificates
- The Infisical Node.js SDK installed: `npm install node-infisical`
- A machine identity created in Infisical
- A client certificate and its corresponding private key

## Provider Setup

### 1. Set Up a Certificate Authority

You can use an existing CA or create one for testing:

```bash
# Generate CA private key
openssl genrsa -out ca-key.pem 4096

# Generate CA certificate
openssl req -new -x509 -key ca-key.pem -sha256 -days 3650 \
  -out ca-cert.pem -subj "/CN=My CA/O=My Org"
```

### 2. Generate a Client Certificate

```bash
# Generate client private key
openssl genrsa -out client-key.pem 4096

# Generate client certificate signing request
openssl req -new -key client-key.pem -out client.csr \
  -subj "/CN=my-service/O=My Org"

# Sign the client certificate with the CA
openssl x509 -req -in client.csr -CA ca-cert.pem -CAkey ca-key.pem \
  -CAcreateserial -out client-cert.pem -days 365 -sha256
```

### 3. Read Certificates in Code

```typescript
import { readFileSync } from "fs";

const caCert = readFileSync("ca-cert.pem", "utf-8");
const clientCert = readFileSync("client-cert.pem", "utf-8");
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
  name: "tls-service-identity",
  organizationId: "org_id_here",
});
```

### Attach TLS Certificate Auth Method

```typescript
const { identityTlsCertAuth } = await client.identityAuth.tlsCert.attach({
  identityId: identity.id,
  caCert: caCertPem,
  allowedCommonNames: "my-service,my-other-service",
  allowedOrganizations: "My Org",
  accessTokenTTL: 2592000,
  accessTokenMaxTTL: 2592000,
  accessTokenNumUsesLimit: 0,
  accessTokenTrustedIps: [{ ipAddress: "0.0.0.0/0" }],
});
```

#### Attach Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `identityId` | `string` | Yes | The ID of the identity to attach TLS Certificate Auth to |
| `caCert` | `string` | No | PEM-encoded CA certificate used to verify client certificates |
| `allowedCommonNames` | `string` | No | Comma-separated list of allowed Common Names (CN) from client certificates |
| `allowedOrganizations` | `string` | No | Comma-separated list of allowed Organizations (O) from client certificates |
| `accessTokenTTL` | `number` | No | Access token time-to-live in seconds |
| `accessTokenMaxTTL` | `number` | No | Maximum access token lifetime in seconds |
| `accessTokenNumUsesLimit` | `number` | No | Maximum token uses. `0` = unlimited |
| `accessTokenTrustedIps` | `Array<{ ipAddress: string }>` | No | IP addresses allowed to use the access token |

### Update TLS Certificate Auth

```typescript
const { identityTlsCertAuth } = await client.identityAuth.tlsCert.update({
  identityId: "identity_id_here",
  allowedCommonNames: "updated-service-name",
});
```

#### Update Parameters

Same as Attach parameters — all fields except `identityId` are optional.

### Get TLS Certificate Auth

```typescript
const { identityTlsCertAuth } = await client.identityAuth.tlsCert.get({
  identityId: "identity_id_here",
});
```

### Revoke TLS Certificate Auth

```typescript
const { identityTlsCertAuth } = await client.identityAuth.tlsCert.revoke({
  identityId: "identity_id_here",
});
```

## Authenticate

Use `client.login()` with the `tlsCertAuth` key:

```typescript
await client.login({
  tlsCertAuth: {
    identityId: "your_identity_id",
    clientCertificate: clientCertPem,
  },
});
```

### Login Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `identityId` | `string` | Yes | The ID of the identity with TLS Certificate Auth attached |
| `clientCertificate` | `string` | Yes | PEM-encoded client certificate |

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
import { readFileSync } from "fs";

async function main() {
  const client = new InfisicalClient({
    baseUrl: "https://app.infisical.com",
  });

  // Read the client certificate
  const clientCertificate = readFileSync("client-cert.pem", "utf-8");

  await client.login({
    tlsCertAuth: {
      identityId: process.env.INFISICAL_IDENTITY_ID!,
      clientCertificate,
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
| `401 Unauthorized` | Certificate not signed by the configured CA | Verify the client cert is signed by the CA specified in `caCert` |
| `403 Forbidden` | Common Name not in allowed list | Add the cert's CN to `allowedCommonNames` |
| `403 Forbidden` | Organization not in allowed list | Add the cert's O to `allowedOrganizations` |
| Certificate expired | Client certificate past its validity period | Generate a new client certificate |
| Certificate chain error | Intermediate CA not included | Include the full certificate chain in `clientCertificate` or `caCert` |
| PEM format error | Certificate not in PEM format | Convert with `openssl x509 -in cert.der -inform DER -out cert.pem -outform PEM` |
