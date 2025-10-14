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
    await loginPage.login(userName, userPwd);
    await expect(pulpitPage.userField).toHaveText("Jan Demobankowy");
    await pulpitPage.sideMenuComponent.paymentLink.click();
  });

  test(
    "simple payment",
    {
      tag: ["@payment", "@integration"],
      annotation: {
        type: "documentation",
        description: "https://google.com",
      },
    },
    async ({ page }) => {
      const paymentPage = new PaymentPage(page);
      const transferReceiver = "Jan Nowak";
      const transferAccount = "12 3456 7890 1234 5678 9012 3456";
      const transferAmount = "222";
      const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReceiver}`;

      await paymentPage.makeTransfer(
        transferReceiver,
        transferAccount,
        transferAmount
      );

      await expect(paymentPage.paymentMessage).toHaveText(expectedMessage);
    }
  );
});
