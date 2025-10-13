import { Locator, Page } from "@playwright/test";

export class LoginPage {
  loginField: Locator;
  passwordInput: Locator;
  loginButton: Locator;
  loginForm: Locator;
  loginError: Locator;
  passwordError: Locator;

  constructor(private page: Page) {
    this.loginField = this.page.locator("#login_id");
    this.passwordInput = this.page.getByTestId("password-input");
    this.loginButton = this.page.getByTestId("login-button");
    this.loginForm = this.page.locator("#login_form");
    this.loginError = this.page.getByTestId("error-login-id");
    this.passwordError = this.page.getByTestId("error-login-password");
  }

  async login(userName: string, userPassword: string): Promise<void> {
    await this.loginField.fill(userName);
    await this.passwordInput.fill(userPassword);
    await this.loginButton.click();
  }
}
