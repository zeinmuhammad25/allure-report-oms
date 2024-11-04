import BaseLocator from "../../../../../base/base-locator";

export default class SplitBillLocator extends BaseLocator {
    private static getActionButton = (label: string): string => `//button[normalize-space()='${label}']`;
    static buttonRenameBill: string = this.getActionButton("Rename Bill");
    static buttonDeleteBill: string = this.getActionButton("Delete Bill");
    static buttonAddBill: string = this.getActionButton("Add Bill");
    static buttonClose: string = this.getActionButton("Close");
    static buttonSelectBill = (billName: string): string => `(//app-split-bill//div[contains(text(), '(${billName})')])[1]`;
    static dialogInputNameField: string = "//app-split-bill-name//input";
    static dialogInputNameButton: string = "//app-split-bill-name//button";
    static buttonMoveMenu = (menuName: string): string => `(//app-split-bill//div[span[normalize-space()='${menuName}']]/following-sibling::div//i[@class='glyphicon glyphicon-plus'])[1]`;
    static buttonReturnMenu = (menuName: string): string => `(//app-split-bill//div[span[normalize-space()='${menuName}']]/following-sibling::div//i[@class='glyphicon glyphicon-remove'])[1]`;
    static dialogSplitBillQtyField: string = "//app-split-bill-qty//input";
    static dialogSplitBillQtyApply: string = "//app-split-bill-qty//button[normalize-space()='Apply']";
    static dialogSplitBillQtyCancel: string = "//app-split-bill-qty//button[normalize-space()='Cancel']";
}