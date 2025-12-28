// spec: specs/agoda-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home-page";
let homePage: HomePage;
test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  await homePage.goToHomePage();
});
test.describe("Agoda Homepage & Core Flows", () => {
  test("Language & Currency Selection", async ({}) => {
    await homePage.chooseLanguage("Tiếng Việt");
    //Verify language changed - page should now show Vietnamese content
    await homePage.verifyLanguageChanged("Tiếng Việt");

    //Open currency selector and change currency
    await homePage.chooseCurrency("Dollar Mỹ");

    //Verify currency changed - button should show USD
    await homePage.verifyCurrencyChanged(/USD|Dollar Mỹ/);
  });
});
