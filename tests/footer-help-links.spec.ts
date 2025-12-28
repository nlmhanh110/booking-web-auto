// spec: specs/agoda-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Agoda Homepage & Core Flows', () => {
  test('Footer & Help Links', async ({ page }) => {
    // 1. Navigate to homepage
    await page.goto('https://www.agoda.com');

    // 2. Get footer element
    const footer = page.locator('footer, [role="contentinfo"]').first();
    
    // 3. Verify footer is present (scroll into view if needed)
    const helpLink = page.locator('footer, [role="contentinfo"]').first().locator('a:has-text("Help center")').first();
    
    // 4. Click on Help Center link
    await helpLink.click();

    // 5. Verify navigation to help page
    await expect(page).toHaveURL(/\/info\/contact\.html|\/help/);
  });
});
