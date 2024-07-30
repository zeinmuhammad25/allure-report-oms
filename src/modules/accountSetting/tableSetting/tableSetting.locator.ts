import BaseLocator from "../../../base/base-locator";

export default class TableSettingLocator extends BaseLocator {
    static addTableSettingButton: string = "(//button[normalize-space()='Tambah Pengaturan Meja'])[1]";
    static tableSettingSearchCompany: string = "(//input[@class='ant-select-selection-search-input ng-untouched ng-pristine ng-valid'])[1]";
    static tableSettingSearchBranch: string = "(//input[@class='ant-select-selection-search-input ng-untouched ng-pristine ng-valid'])[2]";
    static tableSettingSearchRoom: string = "(//input[@placeholder='Cari Berdasarkan Bagian Ruangan'])[1]";
    static tableSettingStatus: string = "(//nz-select-item[@title='Aktif'])[1]";

    // Add Table Setting

    static tableSettingInputCompany: string = "(//input[@class='ant-select-selection-search-input ng-untouched ng-pristine ng-valid'])[1]";
    static tableSettingInputBranch: string = "(//input[@class='ant-select-selection-search-input ng-untouched ng-pristine ng-valid'])[2]";
    static tableSettingInputRoom: string = "(//input[@id='tableSectionName'])[1]";
    static tableSettingCancelButton: string = "(//button[normalize-space()='Batal'])[1]";
    static tableSettingSaveBUtton: string = "(//button[normalize-space()='Simpan'])[1]";

}