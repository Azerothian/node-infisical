# Kubernetes Auth

## Overview

Kubernetes Auth allows machine identities to authenticate with Infisical using Kubernetes service account tokens. Infisical verifies the token against the Kubernetes API server's token review endpoint. This method is ideal for pods, jobs, and any workload running in a Kubernetes cluster.

## Prerequisites

- A Kubernetes cluster with RBAC enabled
- The Infisical Node.js SDK installed: `npm install node-infisical`
- A machine identity created in Infisical
- A Kubernetes service account with a projected token

## Provider Setup

### 1. Create a Service Account

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: infisical-auth
  namespace: default
```

### 2. Mount the Service Account Token

Use a projected volume to mount a token with a specific audience:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-app
spec:
  serviceAccountName: infisical-auth
  containers:
    - name: app
      image: my-app:latest
      volumeMounts:
        - name: token
          mountPath: /var/run/secrets/infisical
          readOnly: true
  volumes:
    - name: token
      projected:
        sources:
          - serviceAccountToken:
              audience: infisical
              expirationSeconds: 600
              path: token
```

### 3. Read the Token in Your Application

```typescript
import { readFileSync } from "fs";

const jwt = readFileSync("/var/run/secrets/infisical/token", "utf-8");
// Or use the default mounted token:
// const jwt = readFileSync("/var/run/secrets/kubernetes.io/serviceaccount/token", "utf-8");
```

### 4. Create a Token Reviewer Service Account (for Infisical)

Infisical needs a service account that can review tokens:

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: infisical-token-reviewer
  namespace: default
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: infisical-token-reviewer
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: system:auth-delegator
subjects:
  - kind: ServiceAccount
    name: infisical-token-reviewer
    namespace: default
```

Get the reviewer's token:
```bash
kubectl create token infisical-token-reviewer --duration=8760h
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
  name: "k8s-service-identity",
  organizationId: "org_id_here",
});
```

### Attach Kubernetes Auth Method

```typescript
const { identityKubernetesAuth } = await client.identityAuth.kubernetes.attach({
  identityId: identity.id,
  kubernetesHost: "https://kubernetes.default.svc.cluster.local",
  caCert: k8sCaCertPem,
  tokenReviewerJwt: tokenReviewerJwt,
  allowedNamespaces: "default,production",
  allowedNames: "infisical-auth",
  allowedAudience: "infisical",
  accessTokenTTL: 2592000,
  accessTokenMaxTTL: 2592000,
  accessTokenNumUsesLimit: 0,
  accessTokenTrustedIps: [{ ipAddress: "0.0.0.0/0" }],
});
```

#### Attach Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `identityId` | `string` | Yes | The ID of the identity to attach Kubernetes Auth to |
| `kubernetesHost` | `string` | No | The Kubernetes API server URL |
| `caCert` | `string` | No | PEM-encoded CA certificate for the Kubernetes API server |
| `tokenReviewerJwt` | `string` | No | JWT of a service account with `system:auth-delegator` permissions for token review |
| `allowedNamespaces` | `string` | No | Comma-separated list of allowed Kubernetes namespaces |
| `allowedNames` | `string` | No | Comma-separated list of allowed service account names |
| `allowedAudience` | `string` | No | Expected audience in the service account token |
| `accessTokenTTL` | `number` | No | Access token time-to-live in seconds |
| `accessTokenMaxTTL` | `number` | No | Maximum access token lifetime in seconds |
| `accessTokenNumUsesLimit` | `number` | No | Maximum token uses. `0` = unlimited |
| `accessTokenTrustedIps` | `Array<{ ipAddress: string }>` | No | IP addresses allowed to use the access token |

### Update Kubernetes Auth

```typescript
const { identityKubernetesAuth } = await client.identityAuth.kubernetes.update({
  identityId: "identity_id_here",
  allowedNamespaces: "default,staging,production",
});
```

#### Update Parameters

Same as Attach parameters — all fields except `identityId` are optional.

### Get Kubernetes Auth

```typescript
const { identityKubernetesAuth } = await client.identityAuth.kubernetes.get({
  identityId: "identity_id_here",
});
```

### Revoke Kubernetes Auth

```typescript
const { identityKubernetesAuth } = await client.identityAuth.kubernetes.revoke({
  identityId: "identity_id_here",
});
```

## Authenticate

Use `client.login()` with the `kubernetesAuth` key:

```typescript
await client.login({
  kubernetesAuth: {
    identityId: "your_identity_id",
    jwt: serviceAccountToken,
  },
});
```

### Login Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `identityId` | `string` | Yes | The ID of the identity with Kubernetes Auth attached |
| `jwt` | `string` | Yes | A Kubernetes service account token |

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

  // Read the projected service account token
  const jwt = readFileSync("/var/run/secrets/infisical/token", "utf-8");

  await client.login({
    kubernetesAuth: {
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
| `401 Unauthorized` | Invalid or expired service account token | Check token expiration; projected tokens have a configurable TTL |
| `403 Forbidden` | Namespace not in allowed list | Add the namespace to `allowedNamespaces` |
| `403 Forbidden` | Service account name not allowed | Add the service account name to `allowedNames` |
| Token review fails | Token reviewer JWT expired or wrong | Regenerate the token reviewer JWT with longer duration |
| Cannot reach K8s API | Wrong `kubernetesHost` or CA cert | Verify the host URL and CA certificate match the cluster |
| Audience mismatch | Token audience doesn't match `allowedAudience` | Set matching audience in projected volume and auth config |
| Token not mounted | Missing volume mount or projection | Verify the pod spec has the projected volume correctly configured |
