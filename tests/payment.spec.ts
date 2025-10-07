import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";

test.describe("Pulpit test", () => {
  const userName: string = loginData.userId;
  const userPwd: string = loginData.userPassword;

  test.beforeEach("Before test hook", async ({ page }) => {
    await page.goto("");
    await page.getByTestId("login-input").fill(userName);
    await page.getByTestId("password-input").fill(userPwd);
    await page.getByTestId("login-button").click();
    await page.getByRole("link", { name: "płatności" }).click();
  });

  test("simple payment", async ({ page }) => {
    const transferReceiver = "Jan Nowak";
    const transferAccount = "12 3456 7890 1234 5678 9012 3456";
    const transferAmount = "222";
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReceiver}`;

    await page.getByTestId("transfer_receiver").fill(transferReceiver);
    await page.getByTestId("form_account_to").fill(transferAccount);
    await page.getByTestId("form_amount").fill(transferAmount);
    await page.getByRole("button", { name: "wykonaj przelew" }).click();
    await page.getByTestId("close-button").click();

    await expect(
      page.locator('#show_messages')
    ).toHaveText(
      `Przelew wykonany! ${transferAmount},00PLN dla ${transferReceiver}`
    );
  });
});
