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
}
