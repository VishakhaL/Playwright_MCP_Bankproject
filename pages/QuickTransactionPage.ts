import type { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { TransactionHistoryPage } from './TransactionHistoryPage';

export interface TransferDetails {
  amount: string;
  accountNumber: string;
  description: string;
}

export class QuickTransactionPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async submitTransfer(details: TransferDetails): Promise<void> {
    await this.page
      .getByRole('combobox', { name: 'Transaction Type: *' })
      .selectOption({ label: 'Transfer' });
    await this.page.getByRole('spinbutton', { name: 'Amount ($): *' }).fill(details.amount);
    await this.page
      .getByRole('textbox', { name: 'Transfer to Account: *' })
      .fill(details.accountNumber);
    await this.page
      .getByRole('textbox', { name: 'Description: *' })
      .fill(details.description);
    await this.page.getByRole('button', { name: 'Submit' }).click();

    await this.expectVisible(
      this.page.getByRole('heading', { name: '🔍 Transaction Confirmation' }),
    );
    await this.expectVisible(
      this.page.getByText(details.description, { exact: true }),
    );
  }

  async confirmTransfer(): Promise<string> {
    await this.page.getByRole('button', { name: 'Confirm' }).click();
    await this.expectVisible(
      this.page.getByRole('heading', {
        name: 'Transaction Completed Successfully!',
      }),
    );

    const pageText = await this.page.locator('body').innerText();
    const reference = pageText.match(/Transaction Reference:\s*(TXN-[\w-]+)/)?.[1];
    if (!reference) {
      throw new Error('A transaction reference should be shown after confirmation');
    }

    return reference;
  }

  async openTransactionHistory(): Promise<TransactionHistoryPage> {
    await this.page.getByRole('button', { name: 'View History' }).click();
    return new TransactionHistoryPage(this.page);
  }
}
