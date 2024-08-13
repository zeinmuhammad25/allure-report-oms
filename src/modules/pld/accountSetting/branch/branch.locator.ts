import BaseLocator from "../../../../base/base-locator";

export default class BranchLocator extends BaseLocator {

    static addBranchButton: string = "(//a[normalize-space()='Cabang'])[1]";
    static accountSearchBranch: string = "(//input[@placeholder='Cari Berdasarkan Nama Cabang'])[1]";
    static accountSearchExpired: string = "(//input[@class='ant-select-selection-search-input ng-untouched ng-pristine ng-valid'])[1]";
    static accountBranchAmount: string = "(//div[@class='page-total-container'])[1]";


    //Second Form

    static yearlySubsOption: string = "(//span[@class='ant-radio-button ant-radio-button-checked'])[1]";
    static submitPlanButton: string = "(//button[@id='btn-submit-plan-form'])[1]";
    static cancelPlanButton: string = "//button[@id='btn-cancel-plan-form']";

    //Tambah cabang tab

    static mainTab: string = "(//div[@class='ant-tabs-tab ng-star-inserted ant-tabs-tab-active'])[1]";
    static transactionTab: string = "(//div[contains(text(),'Transaksi')])[1]";
    static salesModelTab: string = "(//div[@class='ng-star-inserted'][normalize-space()='Mode Penjualan'])[1]";
    static posSettingTab: string = "(//div[contains(text(),'Pengaturan POS')])[1]";
    static printSettingTab: string = "(//div[@role='tab'][normalize-space()='Pengaturan Cetakan'])[1]";
    static noteSettingTab: string = "(//div[contains(text(),'Pengaturan Nota')])[1]";
    static branchSettingSaveButton: string = "(//button[@class='button button-orange button-small ng-star-inserted'])[1]";

}