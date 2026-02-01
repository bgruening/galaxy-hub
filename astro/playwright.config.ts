import { defineConfig, devices } from '@playwright/test';

const port = Number(process.env.PORT || 4321);
const usePreview = !!process.env.LINK_CHECK_PREVIEW;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: `http://localhost:${port}`,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: usePreview
      ? `PORT=${port} npm run preview -- --host --port ${port}`
      : `PORT=${port} npm run dev -- --port ${port}`,
    url: `http://localhost:${port}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
