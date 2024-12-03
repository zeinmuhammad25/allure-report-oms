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
    static addPromotionButton: string = "//button[span[normalize-space()='Add Promotion']]";

    static clickMenu = (menu: string): string => `//div[contains(@class, 'd-flex table-cell hover')]//span[contains(text(), '${menu}')]`;
    static buttonConfirmCloseTable = (action: string): string => `//span[normalize-space()='${action}']`;
    static categoryButton = (category: string): string => `//app-grid-menu//button//div[normalize-space()='${category}']`;
    static menuButton = (menu: string): string => `//app-grid-menu//button//div[contains(text(),'${menu}')]`;
    static deleteMenuButton = (menu: string): string => `//app-order-list//div[span[normalize-space()='${menu}']]` +
        "/following-sibling::div//button[@color='danger']//i[@class='glyphicon glyphicon-remove']";
    static holdMenuButton = (menu: string): string => `//app-order-list//div[span[normalize-space()='${menu}']]` +
        "/following-sibling::div//button//img[@src='assets/images/hold.png']";
    static holdAllMenuButton: string = "//span[contains(text(), 'Hold All')]";
    static fireMenuButton = (menu: string): string => ` //app-order-list//div[span[normalize-space()='${menu}']]` +
        "/following-sibling::div//button//img[@src='assets/images/fire.png']";
    static fireAllMenuButton: string = "//span[contains(text(), 'Fire All')]";

    private static bottomButton = (label: string): string => `//button[normalize-space()='${label}']`;
    private static bottomDisabledButton = (label: string): string => `//button[@disabled and normalize-space()='${label}']`;
    static saveOrderButton: string = this.bottomButton("Save Order");
    static printBillButton: string = this.bottomButton("Print Bill");
    static printCheckerButton: string = this.bottomButton("Checker");

    static mergeTableButton: string = this.bottomButton("Merge Table");
    static mergeTableDisabledButton: string = this.bottomDisabledButton("Merge Table");
    static moveTableButton: string = this.bottomButton("Move Table");
    static moveToTableButton: string = this.bottomButton("Move to Table");
    static moveTableDisabledButton: string = this.bottomDisabledButton("Move Table");
    static moveToTableDisabledButton: string = this.bottomDisabledButton("Move to Table");
    static moveItemButton: string = this.bottomButton("Move Item");
    static linkTableButton: string = this.bottomButton("Link Table");
    static linkTableDisabledButton: string = this.bottomDisabledButton("Link Table");
    static splitBillButton: string = this.bottomButton("Split Bill");
    static splitBillDisabledButton: string = this.bottomDisabledButton("Split Bill");
    static paymentButton: string = this.bottomButton("Payment");
    static paymentDisableButton: string = this.bottomDisabledButton("Payment");

    static cancelTableButton: string = this.bottomButton("Cancel Table");
    static cancelOrderButton: string = this.bottomButton("Cancel Order");
    static cancelTablePanel: string = "//app-table-cancel";
    static cancelReasonTextArea: string = "//app-table-cancel//textarea";
    static cancelReasonApplyButton: string = "//app-table-cancel//button[normalize-space()='Apply']";
    static cancelReasonCancelButton: string = "//app-table-cancel//button[normalize-space()='Cancel']";
    static orderPanel: string = "//app-order";
    static cancelMenuAfterSave: string = "//textarea[contains(@class, 'form-control input-text-notes')]";

    static tableInfo: string = "//button[@class='table-info']";
    static holdMenuDetailInTable = (tableName: string): string => `//span[normalize-space()='Table ${tableName}']`;
    static menuInHoldTable = (tableName: string, menuName: string): string => `//mat-expansion-panel//span[normalize-space(text())='Table ${tableName}']` +
        `//following::li[contains(text(), '${menuName}')]`;
    static buttonCloseHoldTable: string = "//i[@class='glyphicon glyphicon-remove ic-close']";
}