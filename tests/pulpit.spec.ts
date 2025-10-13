import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";
import { PulpitPage } from "../pages/pulpit.page";
import { PaymentPage } from "../pages/payment.page";

test.describe("Pulpit test", () => {
  const userName: string = loginData.userId;
  const userPwd: string = loginData.userPassword;
  let loginPage: LoginPage;
  let pulpitPage: PulpitPage;
  let paymentPage: PaymentPage;

  test.beforeEach("Before test hook", async ({ page }) => {
    loginPage = new LoginPage(page);
    pulpitPage = new PulpitPage(page);
    paymentPage = new PaymentPage(page);

    await page.goto("");
    await loginPage.loginField.fill(userName);
    await loginPage.passwordInput.fill(userPwd);
    await loginPage.loginButton.click();
  });

  test("Przelew", async ({ page }) => {
    const receiverId = "2";
    const amount = "120";
    const transferTitle = "zwrot środków";
    const expectedMessage = `Przelew wykonany! Chuck Demobankowy - ${amount},00PLN - ${transferTitle}`;

    await expect(pulpitPage.userField).toHaveText("Jan Demobankowy");
    await pulpitPage.transferReceiver.selectOption(receiverId);
    await pulpitPage.transferAmountField.fill(amount);
    await pulpitPage.transferTitleField.fill(transferTitle);
    await pulpitPage.executebutton.click();
    await paymentPage.closeButton.click();

    await expect(paymentPage.paymentMessage).toHaveText(expectedMessage);
  });

  test("successful mobile top-up", async ({ page }) => {
    const amount: string = "50";
    const phoneNumberOption: string = "500 xxx xxx";
    const expectedMessage = `Doładowanie wykonane! ${amount},00PLN na numer ${phoneNumberOption}`;

    await expect(pulpitPage.userField).toHaveText("Jan Demobankowy");
    await pulpitPage.topupReceiver.selectOption(phoneNumberOption);
    await pulpitPage.topupAmount.fill(amount);
    await pulpitPage.topupAgreement.click();
    await pulpitPage.executeButton.click();
    await paymentPage.closeButton.click();

    await expect(pulpitPage.messageField).toHaveText(expectedMessage);
  });
});
