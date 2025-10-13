import { Locator, Page } from "@playwright/test";
import { SideMenuComponent } from "../components/side-menu.component";

export class PaymentPage {
  transferReceiver: Locator;
  toField: Locator;
  amountField: Locator;
  executeButton: Locator;
  closeButton: Locator;
  paymentMessage: Locator;
  sideMenuComponent: SideMenuComponent;

  constructor(private page: Page) {
    this.sideMenuComponent = new SideMenuComponent(this.page);
    this.transferReceiver = this.page.getByTestId("transfer_receiver");
    this.toField = this.page.getByTestId("form_account_to");
    this.amountField = this.page.getByTestId("form_amount");
    this.executeButton = this.page.locator("#execute_btn");
    this.closeButton = this.page.getByTestId("close-button");
    this.paymentMessage = this.page.locator("#show_messages");
  }
}
