import { test, expect } from "@playwright/test";
import { incorrectPwd, incorrectUser, messageEnding, loginData } from "../test-data/login.data";

test.describe("User login to Demobank", () => {
//Arrange
const userName: string = loginData.userId;
const userPwd: string = loginData.userPassword;
// const incorrectUser: string = "tester";
// const incorrectPwd: string = "1234";
// const messageEnding: string = "ma min. 8 znaków";

  test.beforeEach("before test hook", async ({ page }) => {
    await page.goto("");
  });

  test("successful login with correct credentials", async ({ page }) => {
    //Act
    await page.getByTestId("login-input").fill(userName);
    await page.getByTestId("password-input").fill(userPwd);
    await page.getByTestId("login-button").click();

    //Assert
    await expect(page.getByTestId("user-name")).toHaveText("Jan Demobankowy");
  });

  test("unsuccessful login with too short username", async ({ page }) => {
    const expectedMessage = `identyfikator ${messageEnding}`;

    await page.getByTestId("login-input").fill(incorrectUser);
    await page.getByTestId("password-input").fill(userPwd);

    await expect(page.getByTestId("error-login-id")).toHaveText(
      expectedMessage,
    );
  });

  test("unsuccessful login with too short password", async ({ page }) => {
    const expectedMessage = `hasło ${messageEnding}`;

    await page.getByTestId("login-input").fill(userName);
    await page.getByTestId("password-input").fill(incorrectPwd);
    await page.getByTestId("password-input").blur();

    await expect(page.getByTestId("error-login-password")).toHaveText(
      expectedMessage,
    );
  });
});
