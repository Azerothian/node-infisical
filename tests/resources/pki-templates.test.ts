import { describe, it, expect } from "vitest";
import { InfisicalClient } from "../../src/client";
import { createMockFetch } from "../helpers";

function createTestClient(mockFetch: ReturnType<typeof createMockFetch>["mockFetch"]) {
  const client = new InfisicalClient({
    baseUrl: "https://test.infisical.com",
    fetch: mockFetch as unknown as typeof globalThis.fetch,
  });
  client.setJwtToken("test");
  return client;
}

describe("PkiTemplatesResource", () => {
  it("creates a template", async () => {
    const certificateTemplate = { id: "ct1", name: "my-template" };
    const { mockFetch, calls } = createMockFetch([
      { status: 200, body: { certificateTemplate } },
    ]);
    const client = createTestClient(mockFetch);

    const result = await client.pki.templates.create({
      name: "my-template",
      caName: "my-ca",
      projectId: "proj-1",
      commonName: "*.example.com",
      subjectAlternativeName: "*.example.com",
      ttl: "365d",
    });

    expect(result.certificateTemplate.name).toBe("my-template");
    expect(calls[0].url).toContain("/api/v2/pki/certificate-templates");
    expect(calls[0].init.method).toBe("POST");
  });

  it("updates a template", async () => {
    const certificateTemplate = { id: "ct1", name: "updated" };
    const { mockFetch, calls } = createMockFetch([
      { status: 200, body: { certificateTemplate } },
    ]);
    const client = createTestClient(mockFetch);

    const result = await client.pki.templates.update({
      templateName: "my-template",
      caName: "my-ca",
      projectId: "proj-1",
      name: "updated",
    });

    expect(result.certificateTemplate.name).toBe("updated");
    expect(calls[0].url).toContain("/api/v2/pki/certificate-templates/my-template");
    expect(calls[0].init.method).toBe("PATCH");
    const body = JSON.parse(calls[0].init.body as string);
    expect(body).not.toHaveProperty("templateName");
  });

  it("deletes a template", async () => {
    const certificateTemplate = { id: "ct1", name: "my-template" };
    const { mockFetch, calls } = createMockFetch([
      { status: 200, body: { certificateTemplate } },
    ]);
    const client = createTestClient(mockFetch);

    await client.pki.templates.delete({
      templateName: "my-template",
      projectId: "proj-1",
    });

    expect(calls[0].url).toContain("/api/v2/pki/certificate-templates/my-template");
    expect(calls[0].init.method).toBe("DELETE");
  });

  it("gets a template by name", async () => {
    const certificateTemplate = { id: "ct1", name: "my-template", ca: { id: "ca1", name: "my-ca" } };
    const { mockFetch, calls } = createMockFetch([
      { status: 200, body: { certificateTemplate } },
    ]);
    const client = createTestClient(mockFetch);

    const result = await client.pki.templates.get({
      templateName: "my-template",
      projectId: "proj-1",
    });

    expect(result.certificateTemplate.ca.name).toBe("my-ca");
    expect(calls[0].url).toContain("/api/v2/pki/certificate-templates/my-template");
    expect(calls[0].url).toContain("projectId=proj-1");
  });

  it("lists templates", async () => {
    const certificateTemplates = [{ id: "ct1" }, { id: "ct2" }];
    const { mockFetch, calls } = createMockFetch([
      { status: 200, body: { certificateTemplates, totalCount: 2 } },
    ]);
    const client = createTestClient(mockFetch);

    const result = await client.pki.templates.list({
      projectId: "proj-1",
      limit: 10,
      offset: 0,
    });

    expect(result.certificateTemplates).toHaveLength(2);
    expect(result.totalCount).toBe(2);
    expect(calls[0].url).toContain("limit=10");
  });

  it("issues a certificate", async () => {
    const response = {
      certificate: "-----BEGIN CERTIFICATE-----",
      issuingCaCertificate: "-----BEGIN CERTIFICATE-----",
      certificateChain: "-----BEGIN CERTIFICATE-----",
      privateKey: "-----BEGIN PRIVATE KEY-----",
      serialNumber: "abc123",
    };
    const { mockFetch, calls } = createMockFetch([
      { status: 200, body: response },
    ]);
    const client = createTestClient(mockFetch);

    const result = await client.pki.templates.issueCertificate({
      templateName: "my-template",
      projectId: "proj-1",
      commonName: "test.example.com",
      ttl: "30d",
    });

    expect(result.serialNumber).toBe("abc123");
    expect(calls[0].url).toContain("/issue-certificate");
    expect(calls[0].init.method).toBe("POST");
  });

  it("signs a certificate", async () => {
    const response = {
      certificate: "-----BEGIN CERTIFICATE-----",
      issuingCaCertificate: "-----BEGIN CERTIFICATE-----",
      certificateChain: "-----BEGIN CERTIFICATE-----",
      serialNumber: "def456",
    };
    const { mockFetch, calls } = createMockFetch([
      { status: 200, body: response },
    ]);
    const client = createTestClient(mockFetch);

    const result = await client.pki.templates.signCertificate({
      templateName: "my-template",
      projectId: "proj-1",
      ttl: "30d",
      csr: "-----BEGIN CERTIFICATE REQUEST-----",
    });

    expect(result.serialNumber).toBe("def456");
    expect(calls[0].url).toContain("/sign-certificate");
    expect(calls[0].init.method).toBe("POST");
  });
});
