import { expect } from "@playwright/test";
import { SearchPanelLocators } from "../locators/home-page";
import { SearchTypeTab } from "../enums/home-page";

export class HomePage {
  page: any;

  constructor(page: any) {
    this.page = page;
  }

  public async chooseLanguage(language: string) {
    await this.page.getByRole("button", { name: "English" }).click();
    // Verify language dialog opened
    await expect(
      this.page.getByRole("dialog", {
        name: /Select your language|Chọn ngôn ngữ/,
      })
    ).toBeVisible();
    // Select Vietnamese language
    await this.page.getByRole("option", { name: language }).click();
    return this;
  }

  public async verifyLanguageChanged(language: string) {
    await expect(this.page.getByRole("button", { name: language })).toBeVisible();
    return this;
  }

  public async chooseCurrency(currency: string) {
    await this.page.getByRole("button", { name: /Giá hiển thị/ }).click();
    // Verify currency dialog opened
    await expect(
      this.page.getByRole("dialog", {
        name: /Chọn giá và đơn vị tiền tệ|Select your currency/,
      })
    ).toBeVisible();
    // Select US Dollar
    await this.page.getByLabel("Tất cả loại tiền tệ").getByRole("option", { name: currency }).click();
    return this;
  }

  public async verifyCurrencyChanged(currency: string | RegExp) {
    await expect(this.page.getByRole("button", { name: currency })).toBeVisible();
    return this;
  }

  public async goToHomePage() {
    await this.page.goto("/");
    return this;
  }
}

export class SearchPanel extends HomePage {
  constructor(page: any) {
    super(page);
  }

  public async fillDestination(destination: string) {
    await this.page.fill(SearchPanelLocators.BTN_DESTINATION_INPUT, destination);
    await this.page.locator(SearchPanelLocators.AUTOSUGGEST_ITEM).first().click();
    return this;
  }

  public async selectCheckInCheckOutDate(checkInDate: string, checkOutDate?: string) {
    await this.page.click(`span[data-selenium-date="${checkInDate}"]`);
    if (checkOutDate) {
      await this.page.click(`span[data-selenium-date="${checkOutDate}"]`);
    }
    return this;
  }

  public async openCheckInCheckOutDatePicker() {
    await this.page.click(SearchPanelLocators.BTN_CHECKIN_DATE);
    return this;
  }

  public async clickSearchButton() {
    await this.page.click(SearchPanelLocators.BTN_SEARCH, { force: true });
    return this;
  }

  public async addRoom() {
    await this.page.click(SearchPanelLocators.BTN_ADD_ROOM);
    return this;
  }

  public async addAdult() {
    await this.page.click(SearchPanelLocators.BTN_ADD_ADULTS);
    return this;
  }

  public async addChildren() {
    await this.page.click(SearchPanelLocators.BTN_ADD_CHILDREN);
    return this;
  }

  public async selectDayUseStays() {
    await this.page.click(SearchPanelLocators.BTN_DAY_USE_STAYS);
    expect(this.page.locator(SearchPanelLocators.LBL_DAY_USE_DESCRIPTION)).toBeVisible();
    return this;
  }

  public async clickOccupancyButton() {
    await this.page.click(SearchPanelLocators.BTN_OCCUPANCY);
    return this;
  }

  public async selectSearchTab(tabName: SearchTypeTab) {
    await this.page.click(tabName.valueOf());
    return this;
  }
}
