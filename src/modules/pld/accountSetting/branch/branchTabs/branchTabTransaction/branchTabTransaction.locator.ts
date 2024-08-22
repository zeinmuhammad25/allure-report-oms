import BaseLocator from "../../../../../../base/base-locator";

export default class BranchTabTransactionLocator extends BaseLocator {

    static branchTransactionTab: string = "//div[contains(text(),'Transaksi')]";
    static paymentCashCheckBox: string = "//label[@class='ant-checkbox-wrapper ng-valid ng-dirty ng-touched cdk-focused cdk-mouse-focused']//input[@type='checkbox']";
    static branchTransactionSaveButton: string = "//button[@class='button button-orange button-small ng-star-inserted']";
    static branchTransactionCancelButton: string = "//button[@class='button button-outline-red button-small ng-star-inserted']";
    static branchTabTransactionCashCheckBox: string = "//input[@type='checkbox' and contains(@class, 'ant-checkbox-input')]";


}