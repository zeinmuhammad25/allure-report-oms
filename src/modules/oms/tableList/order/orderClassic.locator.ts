import BaseLocator from "../../../../base/base-locator";

export default class OrderClassicLocator extends BaseLocator {
    static memberPhoneButton: string = "//button//mat-icon[@class='mat-icon notranslate material-icons mat-icon-no-color']";
    static memberPhoneField: string = "//app-sales-contact-info//input";
    static memberPhoneApplyButton: string = "//app-sales-contact-info//button[normalize-space()='Apply']";
    static memberPhoneCancelButton: string = "//app-sales-contact-info//button[normalize-space()='Cancel']";
    static additionalInfoField: string =
        "//app-order//input[@placeholder='Information will be printed on checker printout']";
    static editTableButton: string = "//button//i[@class='glyphicon glyphicon-user mr-3']";
    static editTableApplyButton: string = "//app-table-open//button//span[normalize-space()='Apply']";
    static editTablePaxField: string = "(//app-number-input//input)[1]";
    static editTableTimeOutField: string = "(//app-number-input//input)[2]";
    static addPromotionButton: string = "//button[span[normalize-space()='Add Promotion']]";
    static salesModeButton = (salesMode:string): string => `//button[@class='flex-grow-1 mb-2 mat-flat-button mat-primary' and contains(., '${salesMode}')]`;
    static buttonApplySalesMode: string = "//button[normalize-space()='Apply']";

    static clickMenu = (menu: string): string => `//div[contains(@class, 'd-flex table-cell hover')]//span[contains(text(), '${menu}')]`;
    static buttonConfirmCloseOrder = (action: string): string => `//span[normalize-space()='${action}']`;

    static menuCategoryButton = (menuCategory: string): string => '//app-grid-menu-classic//button//div[normalize-space()=\'${menuCategory}\']'; //New
        static categoryButton = (category: string): string => `//app-grid-menu-classic//button//div[normalize-space()='${category}']`; //New
    static menuButton = (menu: string): string => `//app-grid-menu-classic//button//div[contains(text(),'${menu}')]`; //New
    static deleteMenuButton = (menu: string): string => `//app-order-list//div[span[normalize-space()='${menu}']]` +
        "/following-sibling::div//button[@color='danger']//i[@class='glyphicon glyphicon-remove']";

    private static bottomButton = (label: string): string => `//button[normalize-space()='${label}']`;
    private static bottomDisabledButton = (label: string): string => `//button[@disabled and normalize-space()='${label}']`;
    static saveOrderButton: string = this.bottomButton("Save"); //New
    static printBillButton: string = this.bottomButton("Print Bill");
    static printBillNowButton: string = this.bottomButton("Print Now");
    static printBillSplitPerPaxButton: string = this.bottomButton("Split per Pax");
    static closePrintingSetting: string = "//div[contains(@class, 'cdk-overlay-backdrop')]";
    static backSplitPerPax: string = "//button//span//img[@src='assets/images/icon-chevron-single-left-black.png']";
    static inputNumberOfPax: string = "//input[@placeholder='1']";
    static printSplitPerPax: string = this.bottomButton("Print");
    static cancelSplitPerPax: string = this.bottomButton("Cancel");

    static printCheckerButton: string = this.bottomButton("Checker");

    static cancelOrderButton: string = this.bottomButton("Cancel"); //New
    static cancelOrderDisabledButton: string = this.bottomDisabledButton("Cancel"); //New
    static cancelTablePanel = (notes: string): string => `//app-grid-pagination//button//span[normalize-space()='${notes}']`;
    static popUpCancelOrder: string = "//div[@class='modal-header bg-primary ng-star-inserted']";
    static cancelReasonTextArea: string = "//app-table-cancel//textarea";
    static cancelReasonApplyButton: string = "//app-table-cancel//button[normalize-space()='Apply']";
    static cancelReasonDisabledApplyButton: string = "//app-table-cancel//button[@disabled and normalize-space()='Apply']";
    static cancelReasonCancelButton: string = "//app-table-cancel//button[@class='btn-action mr-2 mat-raised-button mat-danger']//span[normalize-space()='Cancel']";
    static orderPanel: string = "//app-order";
    static cancelMenuAfterSave: string = "//textarea[contains(@class, 'form-control input-text-notes')]";

    static qtyForMenu = (menuName: string): string => `//div[normalize-space(span/text())='${menuName}']//preceding-sibling::div[contains(@class, 'text-primary pointer')]`;
    static qtyForOrder: string = "//div[@class='text-center']";
    static priceMenu = (menuName: string): string => `//span[contains(text(), '${menuName}')]/following-sibling::span[contains(text(), 'Total:')]`;
    static priceMenuExtraAndPackage = (menuName: string): string => `//div[contains(@class, 'd-flex flex-column flex-grow-1') and contains(text(), '${menuName}')]
    /span[contains(text(), 'Total:')]`;
    static valueSubtotal: string = "//div[contains(@class, 'flex-grow-1 text-right') and .//strong[text()='Subtotal']]/div[@class='ng-star-inserted']";
}