import BaseLocator from "../../../base/base-locator";

export default class BranchLocator extends BaseLocator {

    static addbranchbtn: string = "(//a[normalize-space()='Cabang'])[1]";
    static accsearchbranch: string = "(//input[@placeholder='Cari Berdasarkan Nama Cabang'])[1]";
    static accsearchexpired: string = "(//input[@class='ant-select-selection-search-input ng-untouched ng-pristine ng-valid'])[1]";
    static accbranchamount: string = "(//div[@class='page-total-container'])[1]";


    //Second Form

    static oneyearsubs: string = "(//span[@class='ant-radio-button ant-radio-button-checked'])[1]";
    static submitplanbtn: string = "(//button[@id='btn-submit-plan-form'])[1]";
    static cancelplanbtn: string = "//button[@id='btn-cancel-plan-form']";

    //Tambah cabang tab

    static tabutama: string = "(//div[@class='ant-tabs-tab ng-star-inserted ant-tabs-tab-active'])[1]";
    static tabtransaksi: string = "(//div[contains(text(),'Transaksi')])[1]";
    static tabmodepenjualan: string = "(//div[@class='ng-star-inserted'][normalize-space()='Mode Penjualan'])[1]";
    static tabpossetting: string = "(//div[contains(text(),'Pengaturan POS')])[1]";
    static tabprintsetting: string = "(//div[@role='tab'][normalize-space()='Pengaturan Cetakan'])[1]";
    static tabnotesetting: string = "(//div[contains(text(),'Pengaturan Nota')])[1]";
    static branchsettingsavebtn: string = "(//button[@class='button button-orange button-small ng-star-inserted'])[1]";

}