import BaseLocator from "../../../../base/base-locator";

export default class BrandLocator extends BaseLocator {

    static brandButtonAdd: string = "(//button[normalize-space()='Tambah Brand'])[1]";
    static brandSearchField: string = "(//nz-input-group[@class='ant-input-affix-wrapper'])[1]";
    static brandDropdownSearch: string = "(//input[@class='ant-select-selection-search-input ng-untouched ng-pristine ng-valid'])[1]";
    static brandSDropdownStatus: string = "(//nz-select-item[@title='Aktif'])[1]";
    static brandStatusInactive: string = "(//div[normalize-space()='Tidak Aktif'])[1]";
    static brandButtonApply: string = "(//button[normalize-space()='Terapkan Cabang'])[1]";
    static brandTab: string = "//div[@class='ant-tabs-tab ant-tabs-tab-active ng-star-inserted']";

    //brandPagination
    static brandArrowPrev: string = "//li[@title='Halaman Sebelumnya']//button[@type='button']";
    static brandArrowNext: string = "//li[@title='Halaman Berikutnya']//button[@type='button']";
    static brandPaginationIndicator: string = "//li[@title='1']";

    //Add brand page ater clicking brand button

    static brandNameField: string = "(//input[@id='brandName'])[1]";
    static brandCodeField: string = "(//input[@id='brandCode'])[1]";
    static brandCodeRefresh: string = "(//button[@type='button'])[1]";
    static brandCancelButton: string = "(//button[normalize-space()='Batal'])[1]";
    static brandSaveButton: string = "(//button[normalize-space()='Simpan'])[1]";

}