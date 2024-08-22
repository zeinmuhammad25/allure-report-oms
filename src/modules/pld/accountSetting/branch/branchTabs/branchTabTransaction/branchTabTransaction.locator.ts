import BaseLocator from "../../../../../../base/base-locator";

export default class BranchTabTransactionLocator extends BaseLocator {

    static branchTransactionTab: string = "//div[contains(text(),'Transaksi')]";
    static paymentCashCheckBox: string = "//label[@class='ant-checkbox-wrapper ng-valid ng-dirty ng-touched cdk-focused cdk-mouse-focused']//input[@type='checkbox']";
    static branchTransactionSaveButton: string = "//button[@class='button button-orange button-small ng-star-inserted']";
    static branchTransactionCancelButton: string = "//button[@class='button button-outline-red button-small ng-star-inserted']";
    static branchTabTransactionCashCheckBox: string = "//label[.//p[@class='child-title' and contains(text(), 'Cash')]]//input[@type='checkbox']";
    static branchTabTransactionDanaCheckBox: string = "//label[.//p[@class='child-title' and contains(text(), 'Dana')]]//input[@type='checkbox']";
    static branchTabTransactionOvoCheckBox: string = "//label[.//p[@class='child-title' and contains(text(), 'OVO')]]//input[@type='checkbox']";
    static branchTabTransactionGoPayCheckBox: string = "//label[.//p[@class='child-title' and contains(text(), 'GoPay')]]//input[@type='checkbox']";
    static branchTabTransactionQRISCheckBox: string = "//label[.//p[@class='child-title' and contains(text(), 'QRIS')]]//input[@type='checkbox']"
}