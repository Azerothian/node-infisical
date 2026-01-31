import { describe, it, expect } from "vitest";
import { InfisicalClient } from "../../src/client";
import { createMockFetch } from "../helpers";

function createTestClient(mockFetch: ReturnType<typeof createMockFetch>["mockFetch"]) {
  return new InfisicalClient({
    auth: { mode: "jwt", token: "test" },
    baseUrl: "https://test.infisical.com",
    fetch: mockFetch as unknown as typeof globalThis.fetch,
  });
}

describe("OrganizationsResource", () => {
  it("lists memberships", async () => {
    const users = [{ id: "m1", role: "admin", user: { id: "u1", username: "alice" } }];
    const { mockFetch, calls } = createMockFetch([
      { status: 200, body: { users } },
    ]);
    const client = createTestClient(mockFetch);

    const result = await client.organizations.listMemberships({ orgId: "org-1" });

    expect(result.users).toHaveLength(1);
    expect(calls[0].url).toContain("/api/v2/organizations/org-1/memberships");
    expect(calls[0].init.method).toBe("GET");
  });

  it("lists projects", async () => {
    const workspaces = [{ id: "p1", name: "My Project", slug: "my-project" }];
    const { mockFetch, calls } = createMockFetch([
      { status: 200, body: { workspaces } },
    ]);
    const client = createTestClient(mockFetch);

    const result = await client.organizations.listProjects({ orgId: "org-1" });

    expect(result.workspaces).toHaveLength(1);
    expect(calls[0].url).toContain("/api/v2/organizations/org-1/workspaces");
  });

  it("updates a membership", async () => {
    const membership = { id: "m1", role: "member" };
    const { mockFetch, calls } = createMockFetch([
      { status: 200, body: { membership } },
    ]);
    const client = createTestClient(mockFetch);

    const result = await client.organizations.updateMembership({
      orgId: "org-1",
      membershipId: "m1",
      role: "member",
    });

    expect(result.membership.role).toBe("member");
    expect(calls[0].init.method).toBe("PATCH");
    const body = JSON.parse(calls[0].init.body as string);
    expect(body.role).toBe("member");
    expect(body).not.toHaveProperty("orgId");
    expect(body).not.toHaveProperty("membershipId");
  });

  it("deletes a membership", async () => {
    const membership = { id: "m1" };
    const { mockFetch, calls } = createMockFetch([
      { status: 200, body: { membership } },
    ]);
    const client = createTestClient(mockFetch);

    await client.organizations.deleteMembership({ orgId: "org-1", membershipId: "m1" });

    expect(calls[0].url).toContain("/api/v2/organizations/org-1/memberships/m1");
    expect(calls[0].init.method).toBe("DELETE");
  });

  it("bulk deletes memberships", async () => {
    const memberships = [{ id: "m1" }, { id: "m2" }];
    const { mockFetch, calls } = createMockFetch([
      { status: 200, body: { memberships } },
    ]);
    const client = createTestClient(mockFetch);

    const result = await client.organizations.bulkDeleteMemberships({
      orgId: "org-1",
      membershipIds: ["m1", "m2"],
    });

    expect(result.memberships).toHaveLength(2);
    expect(calls[0].init.method).toBe("DELETE");
    const body = JSON.parse(calls[0].init.body as string);
    expect(body.membershipIds).toEqual(["m1", "m2"]);
  });

  it("creates an organization", async () => {
    const organization = { id: "org-new", name: "New Org", slug: "new-org" };
    const { mockFetch, calls } = createMockFetch([
      { status: 200, body: { organization } },
    ]);
    const client = createTestClient(mockFetch);

    const result = await client.organizations.create({ name: "New Org" });

    expect(result.organization.name).toBe("New Org");
    expect(calls[0].url).toContain("/api/v2/organizations");
    expect(calls[0].init.method).toBe("POST");
  });

  it("deletes an organization", async () => {
    const organization = { id: "org-1", name: "Org" };
    const { mockFetch, calls } = createMockFetch([
      { status: 200, body: { organization, accessToken: "new-jwt" } },
    ]);
    const client = createTestClient(mockFetch);

    const result = await client.organizations.delete({ orgId: "org-1" });

    expect(result.accessToken).toBe("new-jwt");
    expect(calls[0].url).toContain("/api/v2/organizations/org-1");
    expect(calls[0].init.method).toBe("DELETE");
  });
});
