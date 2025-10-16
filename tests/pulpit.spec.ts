import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";
import { PulpitPage } from "../pages/pulpit.page";
import { PaymentPage } from "../pages/payment.page";

test.describe("Pulpit test", () => {
  test.describe.configure({ retries: 3});
  const userName: string = loginData.userId;
  const userPwd: string = loginData.userPassword;
  const userFullName: string = `${loginData.firstName} ${loginData.lastName}`;
  let loginPage: LoginPage;
  let pulpitPage: PulpitPage;
  let paymentPage: PaymentPage;

  test.beforeEach("Before test hook", async ({ page }) => {
    loginPage = new LoginPage(page);
    pulpitPage = new PulpitPage(page);
    paymentPage = new PaymentPage(page);

    await page.goto("");
    await loginPage.login(userName, userPwd);
  });

  test(
    "Quick payment with correct data",
    {
      tag: ["@pulpit", "@integration"],
      annotation: {
        type: "documentation",
        description: "https://jaktestowac.pl/course/playwright-wprowadzenie",
      },
    },
    async ({ page }) => {
      const receiverId = "2";
      const amount = "120";
      const transferTitle = "zwrot środków";
      const expectedMessage = `Przelew wykonany! Chuck Demobankowy - ${amount},00PLN - ${transferTitle}`;

      await pulpitPage.checkLoggedUser(userFullName);
      await pulpitPage.transferMoney(receiverId, amount, transferTitle);
      await paymentPage.clickCloseButton();

      await pulpitPage.checkPaymentMessage(expectedMessage);
    }
  );

  test(
    "successful mobile top-up",
    { tag: ["@pulpit", "@integration"] },
    async ({ page }) => {
      const amount: string = "50";
      const phoneNumberOption: string = "500 xxx xxx";
      const expectedMessage = `Doładowanie wykonane! ${amount},00PLN na numer ${phoneNumberOption}`;

      await pulpitPage.checkLoggedUser(userFullName);
      await pulpitPage.makeTopupPayment(phoneNumberOption, amount);
      await paymentPage.clickCloseButton();

      await pulpitPage.checkPaymentMessage(expectedMessage);
    }
  );
});
