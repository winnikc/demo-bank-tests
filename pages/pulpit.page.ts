import { Locator, Page } from "@playwright/test";
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
  sideMenuComponent: SideMenuComponent

  constructor(private page: Page) {
    this.sideMenuComponent = new SideMenuComponent(this.page)

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
}
