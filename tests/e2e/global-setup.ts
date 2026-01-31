import { writeFileSync, unlinkSync, existsSync } from "fs";
import { resolve } from "path";

interface BootstrapResponse {
  identity: {
    credentials: {
      token: string;
    };
  };
  organization: {
    id: string;
    name: string;
  };
}

interface LoginResponse {
  token: string;
  expiresIn: number;
  mfaEnabled: boolean;
}

interface Organization {
  id: string;
  name: string;
}

interface OrganizationsResponse {
  organizations: Organization[];
}

const STATE_FILE = resolve(__dirname, ".test-state.json");
const MAX_RETRIES = 60;
const RETRY_INTERVAL_MS = 2000;
const TEST_EMAIL = "admin@test.local";
const TEST_PASSWORD = "TestPassword123!";
const TEST_ORG_NAME = "E2E Test Org";

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForInfisical(baseUrl: string): Promise<void> {
  console.log(`[E2E Setup] Waiting for Infisical at ${baseUrl}...`);

  for (let i = 1; i <= MAX_RETRIES; i++) {
    try {
      const response = await fetch(`${baseUrl}/api/status`, {
        method: "GET",
        signal: AbortSignal.timeout(5000),
      });

      if (response.ok) {
        console.log(`[E2E Setup] Infisical is healthy (attempt ${i}/${MAX_RETRIES})`);
        return;
      }

      console.log(`[E2E Setup] Status check failed with ${response.status}, retrying... (${i}/${MAX_RETRIES})`);
    } catch (error) {
      console.log(`[E2E Setup] Connection failed, retrying... (${i}/${MAX_RETRIES})`);
    }

    if (i < MAX_RETRIES) {
      await sleep(RETRY_INTERVAL_MS);
    }
  }

  throw new Error(`Infisical failed to become healthy after ${MAX_RETRIES} retries (${(MAX_RETRIES * RETRY_INTERVAL_MS) / 1000}s)`);
}

async function bootstrapInfisical(baseUrl: string): Promise<{
  accessToken: string;
  organizationId: string;
  organizationName: string;
}> {
  console.log("[E2E Setup] Attempting to bootstrap Infisical...");

  try {
    const response = await fetch(`${baseUrl}/api/v1/admin/bootstrap`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: TEST_EMAIL,
        password: TEST_PASSWORD,
        organization: TEST_ORG_NAME,
      }),
    });

    if (response.ok) {
      const data: BootstrapResponse = await response.json();
      console.log("[E2E Setup] Bootstrap successful");

      return {
        accessToken: data.identity.credentials.token,
        organizationId: data.organization.id,
        organizationName: data.organization.name,
      };
    }

    if (response.status === 400) {
      console.log("[E2E Setup] Already bootstrapped, attempting login instead...");
      return await loginAndGetOrgInfo(baseUrl);
    }

    const errorText = await response.text();
    throw new Error(`Bootstrap failed with status ${response.status}: ${errorText}`);
  } catch (error) {
    if (error instanceof Error && error.message.includes("Already bootstrapped")) {
      throw error;
    }

    console.error("[E2E Setup] Bootstrap error:", error);
    throw error;
  }
}

async function loginAndGetOrgInfo(baseUrl: string): Promise<{
  accessToken: string;
  organizationId: string;
  organizationName: string;
}> {
  console.log("[E2E Setup] Logging in...");

  const loginResponse = await fetch(`${baseUrl}/api/v3/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
    }),
  });

  if (!loginResponse.ok) {
    const errorText = await loginResponse.text();
    throw new Error(`Login failed with status ${loginResponse.status}: ${errorText}`);
  }

  const loginData: LoginResponse = await loginResponse.json();
  console.log("[E2E Setup] Login successful");

  // Get organization info
  console.log("[E2E Setup] Fetching organization info...");
  const orgsResponse = await fetch(`${baseUrl}/api/v2/organizations`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${loginData.token}`,
    },
  });

  if (!orgsResponse.ok) {
    const errorText = await orgsResponse.text();
    throw new Error(`Failed to fetch organizations with status ${orgsResponse.status}: ${errorText}`);
  }

  const orgsData: OrganizationsResponse = await orgsResponse.json();

  if (!orgsData.organizations || orgsData.organizations.length === 0) {
    throw new Error("No organizations found for test user");
  }

  const org = orgsData.organizations[0];
  console.log(`[E2E Setup] Using organization: ${org.name} (${org.id})`);

  return {
    accessToken: loginData.token,
    organizationId: org.id,
    organizationName: org.name,
  };
}

export async function setup(): Promise<void> {
  try {
    const baseUrl = process.env.INFISICAL_URL || "http://localhost:8888";
    console.log(`[E2E Setup] Starting E2E test setup with baseUrl: ${baseUrl}`);

    // Wait for Infisical to be ready
    await waitForInfisical(baseUrl);

    // Bootstrap or login
    const { accessToken, organizationId, organizationName } = await bootstrapInfisical(baseUrl);

    // Write state file
    const state = {
      baseUrl,
      accessToken,
      organizationId,
      organizationName,
    };

    writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
    console.log(`[E2E Setup] Test state written to ${STATE_FILE}`);
    console.log("[E2E Setup] Setup complete!");
  } catch (error) {
    console.error("[E2E Setup] Setup failed:", error);
    throw error;
  }
}

export async function teardown(): Promise<void> {
  try {
    if (existsSync(STATE_FILE)) {
      unlinkSync(STATE_FILE);
      console.log(`[E2E Teardown] Deleted test state file: ${STATE_FILE}`);
    }
    console.log("[E2E Teardown] Teardown complete!");
  } catch (error) {
    console.error("[E2E Teardown] Teardown failed:", error);
    throw error;
  }
}
