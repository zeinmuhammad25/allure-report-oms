import BaseLocator from "../../../../../base/base-locator";

export default class SplitBillLocator extends BaseLocator {
    private static getActionButton = (label: string): string => `//button[normalize-space()='${label}']`;
    static renameBillButton: string = this.getActionButton("Rename Bill");
    static deleteBillButton: string = this.getActionButton("Delete Bill");
    static addBillButton: string = this.getActionButton("Add Bill");
    static closeButton: string = this.getActionButton("Close");
    static selectBillButton = (billName: string): string => `(//app-split-bill//div[contains(text(), '(${billName})')])[1]`;
    static dialogInputNameField: string = "//app-split-bill-name//input";
    static dialogInputNameApplyButton: string = "//app-split-bill-name//button";
    static popUpQty: string = "//app-split-bill-qty[@class='ng-star-inserted']//div//div[@class='modal-header bg-primary']";
    static moveMenuButton = (menuName: string): string => `(//app-split-bill//div[span[normalize-space()='${menuName}']]/following-sibling::div//i[@class='glyphicon glyphicon-plus'])[1]`;
    static returnMenuButton = (menuName: string): string => `(//app-split-bill//div[span[normalize-space()='${menuName}']]/following-sibling::div//i[@class='glyphicon glyphicon-remove'])[1]`;
    static dialogSplitBillQtyField: string = "//app-split-bill-qty//input";
    static dialogSplitBillQtyApply: string = "//app-split-bill-qty//button[normalize-space()='Apply']";
    static dialogSplitBillQtyCancelButton: string = "//app-split-bill-qty//button[normalize-space()='Cancel']";
}