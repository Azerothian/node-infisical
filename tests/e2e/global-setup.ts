import { writeFileSync, unlinkSync, existsSync, readFileSync } from "fs";
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

interface TestState {
  baseUrl: string;
  accessToken: string;
  organizationId: string;
  organizationName: string;
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

async function validateToken(baseUrl: string, token: string, organizationId: string): Promise<boolean> {
  try {
    const response = await fetch(`${baseUrl}/api/v2/organizations/${organizationId}/memberships`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal: AbortSignal.timeout(5000),
    });
    return response.ok;
  } catch {
    return false;
  }
}

async function bootstrapInfisical(baseUrl: string): Promise<TestState> {
  console.log("[E2E Setup] Attempting to bootstrap Infisical...");

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
      baseUrl,
      accessToken: data.identity.credentials.token,
      organizationId: data.organization.id,
      organizationName: data.organization.name,
    };
  }

  if (response.status === 400) {
    console.log("[E2E Setup] Already bootstrapped, checking for existing state file...");

    // Try to reuse saved state from a previous bootstrap
    if (existsSync(STATE_FILE)) {
      try {
        const savedState: TestState = JSON.parse(readFileSync(STATE_FILE, "utf-8"));
        console.log("[E2E Setup] Found existing state file, validating token...");

        const isValid = await validateToken(baseUrl, savedState.accessToken, savedState.organizationId);
        if (isValid) {
          console.log("[E2E Setup] Existing token is still valid, reusing state");
          return { ...savedState, baseUrl };
        }

        console.log("[E2E Setup] Existing token is no longer valid");
      } catch (error) {
        console.log("[E2E Setup] Failed to read/parse existing state file");
      }
    }

    throw new Error(
      "Infisical is already bootstrapped and no valid token is available.\n" +
        "Please reset the containers with: npm run e2e:down && npm run e2e:up"
    );
  }

  const errorText = await response.text();
  throw new Error(`Bootstrap failed with status ${response.status}: ${errorText}`);
}

export async function setup(): Promise<void> {
  try {
    const baseUrl = process.env.INFISICAL_URL || "http://localhost:8889";
    console.log(`[E2E Setup] Starting E2E test setup with baseUrl: ${baseUrl}`);

    // Wait for Infisical to be ready
    await waitForInfisical(baseUrl);

    // Bootstrap or reuse existing state
    const state = await bootstrapInfisical(baseUrl);

    // Write state file
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
    // NOTE: We intentionally do NOT delete the state file on teardown.
    // This allows re-running tests without resetting Docker containers.
    // The state file is cleaned up when containers are destroyed (e2e:down).
    console.log("[E2E Teardown] Teardown complete!");
  } catch (error) {
    console.error("[E2E Teardown] Teardown failed:", error);
    throw error;
  }
}
