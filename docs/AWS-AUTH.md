# AWS Auth

## Overview

AWS Auth allows machine identities to authenticate with Infisical using AWS IAM credentials. It works by verifying a signed AWS STS `GetCallerIdentity` request against the AWS STS endpoint. This method is ideal for EC2 instances, Lambda functions, ECS tasks, and any workload running in AWS that has IAM credentials available.

## Prerequisites

- An AWS account with IAM roles or users configured
- The Infisical Node.js SDK installed: `npm install node-infisical`
- A machine identity created in Infisical
- AWS credentials available in the runtime environment (instance profile, task role, environment variables, etc.)

## Provider Setup

### 1. Create or Identify an IAM Role/User

Ensure you have an IAM principal (role or user) whose ARN you want to allow. For example:

- **EC2 Instance Role**: `arn:aws:iam::123456789012:role/my-ec2-role`
- **Lambda Execution Role**: `arn:aws:iam::123456789012:role/my-lambda-role`
- **IAM User**: `arn:aws:iam::123456789012:user/my-service-user`

### 2. Generate a Signed STS Request

AWS Auth requires a signed `GetCallerIdentity` request. Use the AWS SDK to generate this:

```typescript
import { STSClient, GetCallerIdentityCommand } from "@aws-sdk/client-sts";
import { getSignedHeaders } from "./aws-signing-helper"; // your signing utility

// The signed request components are:
// - iamHttpRequestMethod: "POST"
// - iamRequestBody: "Action=GetCallerIdentity&Version=2011-06-15"
// - iamRequestHeaders: JSON-stringified signed headers
```

Alternatively, many AWS SDK wrappers and the Infisical CLI handle this signing automatically.

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
  name: "aws-service-identity",
  organizationId: "org_id_here",
});
```

### Attach AWS Auth Method

```typescript
const { identityAwsAuth } = await client.identityAuth.aws.attach({
  identityId: identity.id,
  stsEndpoint: "https://sts.amazonaws.com",
  allowedPrincipalArns: "arn:aws:iam::123456789012:role/my-role",
  allowedAccountIds: "123456789012",
  accessTokenTTL: 2592000,
  accessTokenMaxTTL: 2592000,
  accessTokenNumUsesLimit: 0,
  accessTokenTrustedIps: [{ ipAddress: "0.0.0.0/0" }],
});
```

#### Attach Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `identityId` | `string` | Yes | The ID of the identity to attach AWS Auth to |
| `stsEndpoint` | `string` | No | The AWS STS endpoint URL. Default: `https://sts.amazonaws.com` |
| `allowedPrincipalArns` | `string` | No | Comma-separated list of allowed IAM principal ARNs |
| `allowedAccountIds` | `string` | No | Comma-separated list of allowed AWS account IDs |
| `accessTokenTTL` | `number` | No | Access token time-to-live in seconds |
| `accessTokenMaxTTL` | `number` | No | Maximum access token lifetime in seconds |
| `accessTokenNumUsesLimit` | `number` | No | Maximum token uses. `0` = unlimited |
| `accessTokenTrustedIps` | `Array<{ ipAddress: string }>` | No | IP addresses allowed to use the access token |

### Update AWS Auth

```typescript
const { identityAwsAuth } = await client.identityAuth.aws.update({
  identityId: "identity_id_here",
  allowedPrincipalArns: "arn:aws:iam::123456789012:role/new-role",
});
```

#### Update Parameters

Same as Attach parameters — all fields except `identityId` are optional.

### Get AWS Auth

```typescript
const { identityAwsAuth } = await client.identityAuth.aws.get({
  identityId: "identity_id_here",
});
```

### Revoke AWS Auth

```typescript
const { identityAwsAuth } = await client.identityAuth.aws.revoke({
  identityId: "identity_id_here",
});
```

## Authenticate

Use `client.login()` with the `awsAuth` key:

```typescript
await client.login({
  awsAuth: {
    identityId: "your_identity_id",
    iamHttpRequestMethod: "POST",
    iamRequestBody: "Action=GetCallerIdentity&Version=2011-06-15",
    iamRequestHeaders: JSON.stringify(signedHeaders),
  },
});
```

### Login Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `identityId` | `string` | Yes | The ID of the identity with AWS Auth attached |
| `iamHttpRequestMethod` | `string` | Yes | The HTTP method for the STS request (typically `"POST"`) |
| `iamRequestBody` | `string` | Yes | The request body for the STS call (typically `"Action=GetCallerIdentity&Version=2011-06-15"`) |
| `iamRequestHeaders` | `string` | Yes | JSON-stringified signed request headers from AWS Signature V4 |

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
import { STSClient } from "@aws-sdk/client-sts";
import { SignatureV4 } from "@smithy/signature-v4";
import { Sha256 } from "@aws-crypto/sha256-js";
import { HttpRequest } from "@smithy/protocol-http";

async function getSignedStsRequest() {
  const signer = new SignatureV4({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      sessionToken: process.env.AWS_SESSION_TOKEN,
    },
    region: "us-east-1",
    service: "sts",
    sha256: Sha256,
  });

  const request = new HttpRequest({
    method: "POST",
    protocol: "https:",
    hostname: "sts.amazonaws.com",
    path: "/",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      host: "sts.amazonaws.com",
    },
    body: "Action=GetCallerIdentity&Version=2011-06-15",
  });

  const signed = await signer.sign(request);
  return {
    iamHttpRequestMethod: signed.method,
    iamRequestBody: signed.body as string,
    iamRequestHeaders: JSON.stringify(signed.headers),
  };
}

async function main() {
  const client = new InfisicalClient({
    baseUrl: "https://app.infisical.com",
  });

  const stsRequest = await getSignedStsRequest();

  await client.login({
    awsAuth: {
      identityId: process.env.INFISICAL_IDENTITY_ID!,
      ...stsRequest,
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
| `401 Unauthorized` | Invalid or expired STS signature | Ensure AWS credentials are fresh and the signing is correct |
| `403 Forbidden` | IAM principal ARN not in allowed list | Add the ARN to `allowedPrincipalArns` |
| `403 Forbidden` | AWS account ID not in allowed list | Add the account ID to `allowedAccountIds` |
| STS endpoint unreachable | Wrong STS endpoint or network issue | Verify `stsEndpoint` and network connectivity |
| Signature expired | Clock skew between client and AWS | Ensure system clock is synchronized (use NTP) |
| Missing AWS credentials | No IAM role/credentials in environment | Attach an IAM role to the compute resource or set `AWS_ACCESS_KEY_ID`/`AWS_SECRET_ACCESS_KEY` |
