import BaseLocator from "../../../../base/base-locator";

export default class OrderLocator extends BaseLocator {
    static memberPhoneButton: string = "//button//mat-icon[@class='mat-icon notranslate material-icons mat-icon-no-color']";
    static memberPhoneField: string = "//app-sales-contact-info//input";
    static memberPhoneApplyButton: string = "//app-sales-contact-info//button//span[normalize-space()='Apply']";
    static memberPhoneCancelButton: string = "//app-sales-contact-info//button//span[normalize-space()='Cancel']";
    static additionalInfoField: string =
        "//app-order//input[@placeholder='Information will be printed on checker printout']";
    static editTableButton: string = "//button//i[@class='glyphicon glyphicon-user mr-3']";
    static editTableApplyButton: string = "//app-table-open//button//span[normalize-space()='Apply']";
    static editTablePaxField: string = "(//app-number-input//input)[1]";
    static editTableTimeOutField: string = "(//app-number-input//input)[2]";


    static categoryButton = (category: string): string => `//app-grid-menu//button//div[normalize-space()='${category}']`;
    static menuButton = (menu: string): string => `//app-grid-menu//button//div[contains(text(),'${menu}')]`;
    static deleteMenuButton = (menu: string): string =>
        `//app-order-list//div[span[normalize-space()='${menu}']]`
        + "/following-sibling::div//button[//i[@class='glyphicon glyphicon-remove']]";

    private static bottomButton = (label: string): string => `//button[normalize-space()='${label}']`;
    static saveOrderButton: string = this.bottomButton("Save Order");
    static printBillButton: string = this.bottomButton("Print Bill");
    static printCheckerButton: string = this.bottomButton("Checker");
    static cancelTableButton: string = this.bottomButton("Cancel Table");
    static cancelTablePanel: string = "//app-table-cancel";
    static cancelReasonTextArea: string = "//app-table-cancel//textarea";
    static cancelReasonApplyButton: string = "//app-table-cancel//button[normalize-space()='Apply']";
    static cancelReasonCancelButton: string = "//app-table-cancel//button[normalize-space()='Cancel']";
    static orderPanel: string = "//app-order";
}