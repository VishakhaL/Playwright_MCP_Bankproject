import { test } from '@playwright/test';
import config from '../config.json';
import transferTestData from '../test-data/Transfer_TestData.json';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';

test('Verify Quick Transactions Flow', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open(config.url);

  const homePage = await loginPage.login(
    config.username,
    config.password,
    config.appName,
  );
  await homePage.expectBankingApplication();

  const quickTransactionPage = await homePage.openQuickTransactions();
  await quickTransactionPage.submitTransfer(transferTestData);
  const reference = await quickTransactionPage.confirmTransfer();
  console.log(`Transaction Reference: ${reference}`);

  const transactionHistoryPage =
    await quickTransactionPage.openTransactionHistory();
  await transactionHistoryPage.expectTransactionReference(reference);
});

test('Verify tab names in the homepage', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open(config.url);

  await loginPage.login(config.username, config.password, config.appName);
  const homePage = new HomePage(page);
  await homePage.expectBankingApplication();
  await homePage.expectTransferAndBillPaymentTabs();
});
