# GCP Auth

## Overview

GCP Auth allows machine identities to authenticate with Infisical using Google Cloud Platform identity tokens. It verifies GCP-issued JWTs (ID tokens) from service accounts, Compute Engine instances, Cloud Run services, and other GCP workloads. This method is ideal for any workload running on Google Cloud.

## Prerequisites

- A Google Cloud Platform project with a service account
- The Infisical Node.js SDK installed: `npm install node-infisical`
- A machine identity created in Infisical
- GCP credentials available in the runtime environment

## Provider Setup

### 1. Create a GCP Service Account

```bash
gcloud iam service-accounts create infisical-auth \
  --display-name="Infisical Auth Service Account" \
  --project=your-project-id
```

### 2. Generate an ID Token

GCP workloads can obtain ID tokens through the metadata server or the IAM API:

**From Compute Engine / Cloud Run / GKE (metadata server):**
```bash
curl -H "Metadata-Flavor: Google" \
  "http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/identity?audience=infisical&format=full"
```

**From application code (using Google Auth Library):**
```typescript
import { GoogleAuth } from "google-auth-library";

const auth = new GoogleAuth();
const client = await auth.getIdTokenClient("infisical");
const idToken = await client.idTokenProvider.fetchIdToken("infisical");
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
  name: "gcp-service-identity",
  organizationId: "org_id_here",
});
```

### Attach GCP Auth Method

```typescript
const { identityGcpAuth } = await client.identityAuth.gcp.attach({
  identityId: identity.id,
  type: "iam",
  allowedServiceAccounts: "my-sa@my-project.iam.gserviceaccount.com",
  allowedProjects: "my-project-id",
  allowedZones: "us-central1-a",
  accessTokenTTL: 2592000,
  accessTokenMaxTTL: 2592000,
  accessTokenNumUsesLimit: 0,
  accessTokenTrustedIps: [{ ipAddress: "0.0.0.0/0" }],
});
```

#### Attach Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `identityId` | `string` | Yes | The ID of the identity to attach GCP Auth to |
| `type` | `string` | No | Authentication type (e.g., `"iam"` or `"gce"`) |
| `allowedServiceAccounts` | `string` | No | Comma-separated list of allowed GCP service account emails |
| `allowedProjects` | `string` | No | Comma-separated list of allowed GCP project IDs |
| `allowedZones` | `string` | No | Comma-separated list of allowed GCP zones (for GCE type) |
| `accessTokenTTL` | `number` | No | Access token time-to-live in seconds |
| `accessTokenMaxTTL` | `number` | No | Maximum access token lifetime in seconds |
| `accessTokenNumUsesLimit` | `number` | No | Maximum token uses. `0` = unlimited |
| `accessTokenTrustedIps` | `Array<{ ipAddress: string }>` | No | IP addresses allowed to use the access token |

### Update GCP Auth

```typescript
const { identityGcpAuth } = await client.identityAuth.gcp.update({
  identityId: "identity_id_here",
  allowedServiceAccounts: "new-sa@my-project.iam.gserviceaccount.com",
});
```

#### Update Parameters

Same as Attach parameters — all fields except `identityId` are optional.

### Get GCP Auth

```typescript
const { identityGcpAuth } = await client.identityAuth.gcp.get({
  identityId: "identity_id_here",
});
```

### Revoke GCP Auth

```typescript
const { identityGcpAuth } = await client.identityAuth.gcp.revoke({
  identityId: "identity_id_here",
});
```

## Authenticate

Use `client.login()` with the `gcpAuth` key:

```typescript
await client.login({
  gcpAuth: {
    identityId: "your_identity_id",
    jwt: gcpIdToken,
  },
});
```

### Login Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `identityId` | `string` | Yes | The ID of the identity with GCP Auth attached |
| `jwt` | `string` | Yes | A GCP-issued ID token (JWT) |

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
import { GoogleAuth } from "google-auth-library";

async function getGcpIdToken(): Promise<string> {
  const auth = new GoogleAuth();
  const client = await auth.getIdTokenClient("infisical");
  return await client.idTokenProvider.fetchIdToken("infisical");
}

async function main() {
  const client = new InfisicalClient({
    baseUrl: "https://app.infisical.com",
  });

  const jwt = await getGcpIdToken();

  await client.login({
    gcpAuth: {
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
| `401 Unauthorized` | Invalid or expired GCP ID token | Ensure the token is fresh and properly signed by Google |
| `403 Forbidden` | Service account not in allowed list | Add the service account email to `allowedServiceAccounts` |
| `403 Forbidden` | Project not in allowed list | Add the project ID to `allowedProjects` |
| Cannot obtain ID token | No service account attached | Attach a service account to the GCP resource or set `GOOGLE_APPLICATION_CREDENTIALS` |
| Wrong audience in token | Audience mismatch | Ensure the audience in the ID token request matches what Infisical expects |
| Zone restriction failure | GCE instance in wrong zone | Add the zone to `allowedZones` or remove zone restrictions |
