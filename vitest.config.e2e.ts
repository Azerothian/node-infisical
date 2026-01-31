import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["tests/e2e/**/*.e2e.test.ts"],
    globalSetup: ["tests/e2e/global-setup.ts"],
    testTimeout: 30_000,
    hookTimeout: 120_000,
    sequence: {
      concurrent: false,
    },
  },
});
