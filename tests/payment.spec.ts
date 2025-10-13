import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";
import { PaymentPage } from "../pages/payment.page";
import { PulpitPage } from "../pages/pulpit.page";

test.describe("Pulpit test", () => {
  const userName: string = loginData.userId;
  const userPwd: string = loginData.userPassword;
  let loginPage: LoginPage;
  let pulpitPage: PulpitPage;

  test.beforeEach("Before test hook", async ({ page }) => {
    loginPage = new LoginPage(page);
    pulpitPage = new PulpitPage(page);

    await page.goto("");
    await loginPage.loginField.fill(userName);
    await loginPage.passwordInput.fill(userPwd);
    await loginPage.loginButton.click();
    await expect(pulpitPage.userField).toHaveText("Jan Demobankowy");
    await pulpitPage.sideMenuComponent.paymentLink.click();
  });

  test("simple payment", async ({ page }) => {
    const paymentPage = new PaymentPage(page);
    const transferReceiver = "Jan Nowak";
    const transferAccount = "12 3456 7890 1234 5678 9012 3456";
    const transferAmount = "222";
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReceiver}`;

    await paymentPage.transferReceiver.fill(transferReceiver);
    await paymentPage.toField.fill(transferAccount);
    await paymentPage.amountField.fill(transferAmount);
    await paymentPage.executeButton.click();
    await paymentPage.closeButton.click();

    await expect(paymentPage.paymentMessage).toHaveText(expectedMessage);
  });
});
