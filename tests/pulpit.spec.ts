import { test, expect } from "@playwright/test";

const url: string = "https://demo-bank.vercel.app/";
const userName: string = "test1234";
const userPwd: string = "Test2025";

test.describe("Pulpit test", () => {
  test("Przelew", async ({ page }) => {
    const receiverId = "2";
    const amount = "120";
    const transferTitle = "zwrot środków";
    const expectedMessage = `Przelew wykonany! Chuck Demobankowy - ${amount},00PLN - ${transferTitle}`;

    await page.goto(url);
    await page.getByTestId("login-input").fill(userName);
    await page.getByTestId("password-input").fill(userPwd);
    await page.getByTestId("login-button").click();

    await page.locator("#widget_1_transfer_receiver").selectOption(receiverId);
    await page.locator("#widget_1_transfer_amount").fill(amount);
    await page.locator("#widget_1_transfer_title").fill(transferTitle);
    await page.locator("#execute_btn").click();
    await page.getByTestId("close-button").click();

    await expect(page.locator("#show_messages")).toHaveText(
      expectedMessage
    );
  });

  test("successful mobile top-up", async ({ page }) => {
    const amount: string  = "50";
    const phoneNumberOption: string = "500 xxx xxx";
    const expectedMessage = `Doładowanie wykonane! ${amount},00PLN na numer ${phoneNumberOption}`;

    await page.goto(url);
    await page.getByTestId("login-input").fill(userName);
    await page.getByTestId("password-input").fill(userPwd);
    await page.getByTestId("login-button").click();
    await page.locator("#widget_1_topup_receiver").selectOption(phoneNumberOption);
    await page.locator("#widget_1_topup_amount").fill(amount);
    await page.locator("#uniform-widget_1_topup_agreement span").click();
    await page.locator("#execute_phone_btn").click();
    await page.getByTestId("close-button").click();

    await expect(page.getByTestId("message-text")).toHaveText(
      expectedMessage
    );
  });
});
