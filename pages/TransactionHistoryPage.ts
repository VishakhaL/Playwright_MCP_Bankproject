import type { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class TransactionHistoryPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectTransactionReference(reference: string): Promise<void> {
    const historySection = this.page
      .getByRole('heading', { name: '📊 Transaction History' })
      .locator('..');
    await this.expectVisible(historySection);
    await this.expectVisible(historySection.getByText(reference, { exact: false }));
  }
}
