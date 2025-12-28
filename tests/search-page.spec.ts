import test, { expect } from "@playwright/test";
import { HomePage, SearchPanel } from "../pages/home-page";

let homePage: HomePage;
let searchPanel: SearchPanel;
test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  searchPanel = new SearchPanel(page);
  await homePage.goToHomePage();
});
test.describe("Search Page Tests", { tag: "@search" }, () => {
  test("User can search overnight stays for hotels in a specific city", async ({ page }) => {
    await searchPanel
      .fillDestination("Hanoi")
      .then((s) => s.selectCheckInCheckOutDate("2026-01-04", "2026-01-23"))
      .then((s) => s.addAdult())
      .then((s) => s.addChildren())
      .then((s) => s.addRoom())
      .then((s) => s.clickSearchButton());
    expect(page.url()).toContain("activities");
  });

  test("User can search day use stays for hotels in a specific city", async ({ page }) => {
    await searchPanel
      .selectDayUseStays()
      .then((s) => s.fillDestination("Hanoi"))
      .then((s) => s.selectCheckInCheckOutDate("2026-01-04"))
      .then((s) => s.addAdult())
      .then((s) => s.addChildren())
      .then((s) => s.addRoom())
      .then((s) => s.clickSearchButton());
    expect(page.url()).toContain("activities");
  });

  test("User sees validation error when searching without selecting destination", async ({ page }) => {
    await searchPanel
      .openCheckInCheckOutDatePicker()
      .then((s) => s.selectCheckInCheckOutDate("2026-01-04", "2026-01-23"))
      .then((s) => s.addAdult())
      .then((s) => s.clickSearchButton());
    expect(
      page.locator(
        "text=Please enter the name of a country, city, airport, neighborhood, landmark, or property to proceed"
      )
    ).toBeVisible();
  });
});
