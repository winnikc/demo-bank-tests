import { test, expect } from "@playwright/test";

//Arrange
const url: string = "https://demo-bank.vercel.app/";
const userName: string = "test1234";
const userPwd: string = "Test2025";
const incorrectUser: string = "tester";
const incorrectPwd: string = "1234";
const messageEnding: string = 'ma min. 8 znaków';

test.describe("User login to Demobank", () => {
  test("successful login with correct credentials", async ({ page }) => {
    //Act
    await page.goto(url);
    await page.getByTestId("login-input").fill(userName);
    await page.getByTestId("password-input").fill(userPwd);
    await page.getByTestId("login-button").click();

    //Assert
    await expect(page.getByTestId("user-name")).toHaveText("Jan Demobankowy");
  });

  test("unsuccessful login with too short username", async ({ page }) => {
    const expectedMessage = `identyfikator ${messageEnding}`;

    await page.goto(url);
    await page.getByTestId("login-input").fill(incorrectUser);
    await page.getByTestId("password-input").fill(userPwd);

    await expect(page.getByTestId("error-login-id")).toHaveText(
      expectedMessage
    );
  });

  test("unsuccessful login with too short password", async ({ page }) => {
    const expectedMessage = `hasło ${messageEnding}`;
    
    await page.goto(url);
    await page.getByTestId("login-input").fill(userName);
    await page.getByTestId("password-input").fill(incorrectPwd);
    await page.getByTestId("password-input").blur();

    await expect(page.getByTestId("error-login-password")).toHaveText(
      expectedMessage
    );
  });
});
