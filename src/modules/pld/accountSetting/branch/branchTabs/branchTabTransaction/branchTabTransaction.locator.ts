import BaseLocator from "../../../../../../base/base-locator";

export default class BranchTabTransactionLocator extends BaseLocator {

    static branchTransactionTab: string = "//div[contains(text(),'Transaksi')]";
    static branchMenuBookDropdown: string = "//nz-select[@id='menuTemplateID']";
    static branchRadioBtnBeforeDisc: string = "//label[.//span[text()=' Sebelum Diskon ']]//input[@type='radio']";
    static branchRadioBtnAfterDisc: string = "//label[.//span[text()=' Setelah Diskon ']]//input[@type='radio']";
    static branchTaxValueField: string = "//input[@formcontrolname='taxValue' and @placeholder='Nilai Pajak (%)']";
    static branchServiceChargeField: string = "//input[@placeholder='Nilai Service Charge']";
    static branchRadioBtnOtherTax: string = "//nz-form-control//nz-switch[@id='flagOtherTaxVat']";


    static paymentCashCheckBox: string = "//label[@class='ant-checkbox-wrapper ng-valid ng-dirty ng-touched cdk-focused cdk-mouse-focused']//input[@type='checkbox']";
    static branchTransactionSaveButton: string = "//button[@class='button button-orange button-small ng-star-inserted']";
    static branchTransactionCancelButton: string = "//button[@class='button button-outline-red button-small ng-star-inserted']";
    static branchTabTransactionCheckBoxCash: string = "//label[.//p[@class='child-title' and contains(text(), 'Cash')]]//input[@type='checkbox']";
    static branchTabTransactionCheckBoxDana: string = "//label[.//p[@class='child-title' and contains(text(), 'Dana')]]//input[@type='checkbox']";
    static branchTabTransactionCheckBoxOVO: string = "//label[.//p[@class='child-title' and contains(text(), 'OVO')]]//input[@type='checkbox']";
    static branchTabTransactionCheckBoxGoPay: string = "//label[.//p[@class='child-title' and contains(text(), 'GoPay')]]//input[@type='checkbox']";
    static branchTabTransactionCheckBoxQRIS: string = "//label[.//p[@class='child-title' and contains(text(), 'QRIS')]]//input[@type='checkbox']"
}