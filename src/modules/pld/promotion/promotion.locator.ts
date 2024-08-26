import BaseLocator from "../../../base/base-locator";

export default class PromotionLocator extends BaseLocator {
    static promotionSearchByName: string = "//input[@placeholder='Cari Berdasarkan Nama Promosi']";
    static promotionStatusDropdown: string = "//nz-select-item[@title='Aktif']";
    static promotionTypeDropdown: string = "//nz-select-top-control[@ng-reflect-place-holder='Cari Berdasarkan Tipe Promosi']//input[@autocomplete='off']";
    static promotionBranchDropdown: string = "//nz-select-top-control[@ng-reflect-place-holder='Cari Berdasarkan Cabang']//input[@autocomplete='off']";
    static promotionStartDateDropdown: string = "//input[@placeholder='Cari Berdasarkan Tanggal Mulai']";
    static promotionEndDateDropdown: string = "//input[@placeholder='Cari Berdasarkan Tanggal Berakhir']";
    static promotionAddButton: string = "//button[normalize-space()='Promosi']";

    //Detail Promo
    static discNameField: string = "(//input[@id='notes'])[1]";
    static discDiscField: string = "(//input[@id='discount'])[1]";
    static discBranchField: string = "(//input[@id='discount'])[1]";
    static discPercentField: string = "(//input[@id='discount'])[1]";
    static minTransField: string = "(//input[@id='minSalesPrice'])[1]";
    static maxDiscField: string = "(//input[@id='maxSalesPrice'])[1]";
    static paymentMethodField: string = "(//input[@class='ant-select-selection-search-input ng-untouched ng-pristine ng-valid'])[2]";


}