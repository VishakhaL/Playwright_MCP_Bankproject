import { expect, type Locator, type Page } from '@playwright/test';

export abstract class BasePage {
  protected readonly page: Page;

  protected constructor(page: Page) {
    this.page = page;
  }

  protected async expectVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible({ timeout: 10_000 });
  }
}
