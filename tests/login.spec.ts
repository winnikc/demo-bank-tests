import { test, expect } from "@playwright/test";

//Arrange
const url = "https://demo-bank.vercel.app/";
const userName = "test1234";
const userPwd = "Test2025";
const incorrectUser = "tester";
const incorrectPwd = "1234";

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
    await page.goto(url);
    await page.getByTestId("login-input").fill(incorrectUser);
    await page.getByTestId("password-input").fill(userPwd);

    await expect(page.getByTestId("error-login-id")).toHaveText(
      "identyfikator ma min. 8 znaków",
    );
  });

  test("unsuccessful login with too short password", async ({ page }) => {
    await page.goto(url);
    await page.getByTestId("login-input").fill(userName);
    await page.getByTestId("password-input").fill(incorrectPwd);
    await page.getByTestId("password-input").blur();

    await expect(page.getByTestId("error-login-password")).toHaveText(
      "hasło ma min. 8 znaków",
    );
  });
});
