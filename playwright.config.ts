import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";

require("dotenv").config();

const config: PlaywrightTestConfig = {
  testDir: "./e2e",
  timeout: 60 * 1000 * 60 * 3,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    actionTimeout: 60000,
    trace: "on-first-retry",
    launchOptions: {
      slowMo: Math.floor(Math.random() * 2000) + 2000,
    },
    storageState: "storageState.json",
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
};

export default config;
