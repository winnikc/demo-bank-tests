import { expect, Locator, Page } from "@playwright/test";
import { SideMenuComponent } from "../components/side-menu.component";

export class PulpitPage {
  transferReceiver: Locator;
  transferAmountField: Locator;
  transferTitleField: Locator;
  executebutton: Locator;
  topupReceiver: Locator;
  topupAmount: Locator;
  topupAgreement: Locator;
  executeButton: Locator;
  messageField: Locator;
  userField: Locator;
  sideMenuComponent: SideMenuComponent;

  constructor(private page: Page) {
    this.sideMenuComponent = new SideMenuComponent(this.page);

    this.transferReceiver = this.page.locator("#widget_1_transfer_receiver");
    this.transferAmountField = this.page.locator("#widget_1_transfer_amount");
    this.transferTitleField = this.page.locator("#widget_1_transfer_title");
    this.executebutton = this.page.locator("#execute_btn");
    this.topupReceiver = this.page.locator("#widget_1_topup_receiver");
    this.topupAmount = this.page.locator("#widget_1_topup_amount");
    this.topupAgreement = this.page.locator(
      "#uniform-widget_1_topup_agreement span"
    );
    this.executeButton = this.page.locator("#execute_phone_btn");
    this.messageField = this.page.getByTestId("message-text");
    this.userField = this.page.getByTestId("user-name");
  }

  async checkLoggedUser(loggedUser: string): Promise<void> {
    await expect(this.userField).toHaveText(loggedUser);
  }

  async checkPaymentMessage(message: string): Promise<void> {
    await expect(this.messageField).toHaveText(message);
  }

  async transferMoney(receiver: string, amount: string, title: string) {
    await this.transferReceiver.selectOption(receiver);
    await this.transferAmountField.fill(amount);
    await this.transferTitleField.fill(title);
    await this.executebutton.click();
  }

  async makeTopupPayment(
    phoneNumberOption: string,
    amount: string
  ): Promise<void> {
    await this.topupReceiver.selectOption(phoneNumberOption);
    await this.topupAmount.fill(amount);
    await this.topupAgreement.click();
    await this.executeButton.click();
  }
}
