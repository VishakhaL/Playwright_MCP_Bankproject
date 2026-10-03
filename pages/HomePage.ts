import { expect, type Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { QuickTransactionPage } from './QuickTransactionPage';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectBankingApplication(): Promise<void> {
    await expect(this.page).toHaveURL(/Banking-Project-Demo\.html/, {
      timeout: 10_000,
    });
    await this.expectVisible(
      this.page.getByRole('heading', {
        name: '🏦 Sample Banking Application',
      }),
    );
    await this.expectVisible(
      this.page.getByText('Welcome to the Testers Talk Banking Application', {
        exact: true,
      }),
    );
  }

  async expectTransferAndBillPaymentTabs(): Promise<void> {
    await this.expectVisible(
      this.page.getByRole('button', { name: 'Transfers', exact: true }),
    );
    await this.expectVisible(
      this.page.getByRole('button', { name: 'Bill Payments', exact: true }),
    );
  }

  async openQuickTransactions(): Promise<QuickTransactionPage> {
    await this.page.getByRole('link', { name: '💳 Quick Transactions' }).click();
    return new QuickTransactionPage(this.page);
  }
}
