import { Locator, Page } from "@playwright/test";

export class PulpitPage {
  paymentLink: Locator;
  transferReceiver: Locator;
  transferAmountField: Locator;
  transferTitleField: Locator;
  executebutton: Locator;
  topupReceiver: Locator;
  topupAmount: Locator;
  topupAgreement: Locator;
  executeButton: Locator;
  messageField: Locator;

  constructor(private page: Page) {
    this.paymentLink = this.page.locator(".i-nav-payments");
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
  }
}
