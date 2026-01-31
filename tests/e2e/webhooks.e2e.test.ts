import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createE2EClient, loadTestState, createTestProject, deleteTestProject, uniqueName } from "./helpers";
import type { TestState } from "./helpers";
import type { InfisicalClient } from "../../src/client";

describe("Webhooks E2E", () => {
  let client: InfisicalClient;
  let state: TestState;
  let projectId: string;

  beforeAll(async () => {
    state = loadTestState();
    client = createE2EClient(state);
    const project = await createTestProject(state, uniqueName("e2e-webhooks"));
    projectId = project.projectId;
  });

  afterAll(async () => {
    try {
      await deleteTestProject(state, projectId);
    } catch {}
  });

  describe("CRUD lifecycle", () => {
    let webhookId: string;

    it("creates a webhook", async () => {
      const result = await client.webhooks.create({
        projectId,
        environment: "dev",
        secretPath: "/",
        webhookUrl: "https://httpbin.org/post",
      });
      expect(result.webhook).toBeDefined();
      expect(result.webhook.id).toBeTruthy();
      expect(result.webhook.url).toBe("https://httpbin.org/post");
      expect(result.webhook.environment).toBe("dev");
      webhookId = result.webhook.id;
    });

    it("lists webhooks for project", async () => {
      const result = await client.webhooks.list({ projectId });
      expect(result.webhooks).toBeDefined();
      expect(Array.isArray(result.webhooks)).toBe(true);
      expect(result.webhooks.length).toBeGreaterThan(0);
      const found = result.webhooks.some((w) => w.id === webhookId);
      expect(found).toBe(true);
    });

    it("updates a webhook (disable)", async () => {
      const result = await client.webhooks.update({
        webhookId,
        isDisabled: true,
      });
      expect(result.webhook).toBeDefined();
      expect(result.webhook.isDisabled).toBe(true);
    });

    it("deletes a webhook", async () => {
      const result = await client.webhooks.delete({ webhookId });
      expect(result.webhook).toBeDefined();
      expect(result.webhook.id).toBe(webhookId);
    });
  });
});
