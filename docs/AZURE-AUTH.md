# Azure Auth

## Overview

Azure Auth allows machine identities to authenticate with Infisical using Azure access tokens. It supports Azure Managed Identities (system-assigned and user-assigned) and service principals. The authentication is verified against Azure Active Directory. This method is ideal for Azure VMs, App Services, Azure Functions, AKS pods, and any workload with an Azure identity.

## Prerequisites

- An Azure subscription with a configured managed identity or service principal
- The Infisical Node.js SDK installed: `npm install node-infisical`
- A machine identity created in Infisical
- Azure identity credentials available in the runtime environment

## Provider Setup

### 1. Configure a Managed Identity or Service Principal

**System-assigned Managed Identity (Azure VM/App Service):**
Enable managed identity on the Azure resource in the Azure Portal or via CLI:

```bash
az vm identity assign --name my-vm --resource-group my-rg
```

**User-assigned Managed Identity:**
```bash
az identity create --name my-identity --resource-group my-rg
az vm identity assign --name my-vm --resource-group my-rg \
  --identities /subscriptions/<sub-id>/resourceGroups/my-rg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/my-identity
```

### 2. Obtain an Access Token

**From Azure IMDS (Instance Metadata Service):**
```bash
curl -H "Metadata: true" \
  "http://169.254.169.254/metadata/identity/oauth2/token?api-version=2018-02-01&resource=https://management.azure.com/"
```

**From application code (using Azure Identity SDK):**
```typescript
import { DefaultAzureCredential } from "@azure/identity";

const credential = new DefaultAzureCredential();
const token = await credential.getToken("https://management.azure.com/.default");
const jwt = token.token;
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
  name: "azure-service-identity",
  organizationId: "org_id_here",
});
```

### Attach Azure Auth Method

```typescript
const { identityAzureAuth } = await client.identityAuth.azure.attach({
  identityId: identity.id,
  tenantId: "your-azure-tenant-id",
  resource: "https://management.azure.com/",
  allowedServicePrincipalIds: "sp-object-id-1,sp-object-id-2",
  accessTokenTTL: 2592000,
  accessTokenMaxTTL: 2592000,
  accessTokenNumUsesLimit: 0,
  accessTokenTrustedIps: [{ ipAddress: "0.0.0.0/0" }],
});
```

#### Attach Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `identityId` | `string` | Yes | The ID of the identity to attach Azure Auth to |
| `tenantId` | `string` | No | The Azure AD tenant ID |
| `resource` | `string` | No | The Azure resource URI for the token audience |
| `allowedServicePrincipalIds` | `string` | No | Comma-separated list of allowed Azure service principal (object) IDs |
| `accessTokenTTL` | `number` | No | Access token time-to-live in seconds |
| `accessTokenMaxTTL` | `number` | No | Maximum access token lifetime in seconds |
| `accessTokenNumUsesLimit` | `number` | No | Maximum token uses. `0` = unlimited |
| `accessTokenTrustedIps` | `Array<{ ipAddress: string }>` | No | IP addresses allowed to use the access token |

### Update Azure Auth

```typescript
const { identityAzureAuth } = await client.identityAuth.azure.update({
  identityId: "identity_id_here",
  allowedServicePrincipalIds: "new-sp-object-id",
});
```

#### Update Parameters

Same as Attach parameters — all fields except `identityId` are optional.

### Get Azure Auth

```typescript
const { identityAzureAuth } = await client.identityAuth.azure.get({
  identityId: "identity_id_here",
});
```

### Revoke Azure Auth

```typescript
const { identityAzureAuth } = await client.identityAuth.azure.revoke({
  identityId: "identity_id_here",
});
```

## Authenticate

Use `client.login()` with the `azureAuth` key:

```typescript
await client.login({
  azureAuth: {
    identityId: "your_identity_id",
    jwt: azureAccessToken,
  },
});
```

### Login Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `identityId` | `string` | Yes | The ID of the identity with Azure Auth attached |
| `jwt` | `string` | Yes | An Azure access token (JWT) obtained from Azure AD |

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
import { DefaultAzureCredential } from "@azure/identity";

async function getAzureToken(): Promise<string> {
  const credential = new DefaultAzureCredential();
  const tokenResponse = await credential.getToken("https://management.azure.com/.default");
  return tokenResponse.token;
}

async function main() {
  const client = new InfisicalClient({
    baseUrl: "https://app.infisical.com",
  });

  const jwt = await getAzureToken();

  await client.login({
    azureAuth: {
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
| `401 Unauthorized` | Invalid or expired Azure token | Ensure the token is fresh and issued by Azure AD |
| `403 Forbidden` | Service principal ID not in allowed list | Add the principal's object ID to `allowedServicePrincipalIds` |
| `403 Forbidden` | Tenant ID mismatch | Verify `tenantId` matches the Azure AD tenant issuing the token |
| Cannot obtain token | No managed identity on resource | Enable managed identity on the Azure resource |
| Token audience mismatch | Wrong `resource` value | Match the `resource` field to the audience in the Azure token |
| IMDS request fails | Not running on Azure or IMDS blocked | Verify the workload is on Azure and IMDS endpoint is accessible |
