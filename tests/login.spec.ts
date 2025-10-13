import { test, expect } from "@playwright/test";
import {
  incorrectPwd,
  incorrectUser,
  messageEnding,
  loginData,
} from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";
import { PulpitPage } from "../pages/pulpit.page";

test.describe("User login to Demobank", () => {
  let loginPage: LoginPage;
  //Arrange
  const userName: string = loginData.userId;
  const userPwd: string = loginData.userPassword;

  test.beforeEach("before test hook", async ({ page }) => {
    loginPage = new LoginPage(page);

    await page.goto("");
  });

  test("successful login with correct credentials", async ({ page }) => {
    //Arrange
    const pulpitPage = new PulpitPage(page);
    //Act
    await loginPage.loginField.fill(userName);
    await loginPage.passwordInput.fill(userPwd);
    await loginPage.loginButton.click();

    //Assert
    await expect(pulpitPage.userField).toHaveText("Jan Demobankowy");
  });

  test("unsuccessful login with too short username", async ({ page }) => {
    const userPwd: string = loginData.userPassword;
    const expectedMessage = `identyfikator ${messageEnding}`;

    await loginPage.loginField.fill(incorrectUser);
    await loginPage.passwordInput.fill(userPwd);

    await expect(loginPage.loginError).toHaveText(expectedMessage);
  });

  test("unsuccessful login with too short password", async ({ page }) => {
    //Arrange
    const expectedMessage = `hasło ${messageEnding}`;

    await loginPage.loginField.fill(userName);
    await loginPage.passwordInput.fill(incorrectPwd);
    // await page.getByTestId("password-input").fill(incorrectPwd);
    await loginPage.passwordInput.blur();

    await expect(loginPage.passwordError).toHaveText(expectedMessage);
  });
});
