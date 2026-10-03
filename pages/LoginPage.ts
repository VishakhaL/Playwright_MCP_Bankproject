import type { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { HomePage } from './HomePage';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open(url: string): Promise<void> {
    await this.page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: 30_000,
    });
  }

  async login(username: string, password: string, appName: string): Promise<HomePage> {
    await this.page.getByRole('textbox', { name: 'Username' }).fill(username);
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
    await this.page.getByRole('combobox', { name: 'App Name:' }).selectOption({
      label: appName,
    });

    await Promise.all([
      this.page.waitForURL(/Banking-Project-Demo\.html/, {
        waitUntil: 'domcontentloaded',
        timeout: 30_000,
      }),
      this.page.getByRole('button', { name: 'Login' }).click(),
    ]);

    return new HomePage(this.page);
  }
}
