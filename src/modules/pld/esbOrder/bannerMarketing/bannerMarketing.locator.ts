import BaseLocator from "../../../../base/base-locator";

export default class BannerMarketingLocator extends BaseLocator {
    static bannerMarketingTab: string = "//div[@role='tab' and text()='Banner Marketing']";

    // Index Banner Marketing

    static bannerNameSearch: string = "//input[@placeholder='Cari Berdasarkan Nama Banner']";
    static branchSearch: string = "//nz-select[@nzplaceholder='Cari Berdasarkan Cabang']";
    static startDateSearch: string = "//nz-date-picker[@nzplaceholder='Cari Berdasarkan Tanggal Mulai']";
    static endDateSearch: string = "//nz-date-picker[@nzplaceholder='Cari Berdasarkan Tanggal Berakhir']";
    static statusSearch: string = "//nz-select[@nzplaceholder='Cari Berdasarkan Status']";

    static bannerNameColumn: string = "//nz-table-sorters/span[text() = ' Nama Banner ']";
    static branchColumn: string = "//nz-table-sorters/span[text() = ' Cabang ']";
    static startDateColumn: string = "//nz-table-sorters/span[text() = ' Tanggal Mulai ']";
    static endDateColumn: string = "//nz-table-sorters/span[text() = ' Tanggal Berakhir ']";
    static statusNameColumn: string = "//th[text() = ' Status ']";

    static addBannerMarketingButton: string = "//button[text() = ' Tambah Banner Marketing ']";


    // Add Banner Marketing
    static bannerNameField: string = "#bannerName";
    static branchField: string = "#branchIDs";
    static startDateField: string = "//input[@placeholder='Tanggal Mulai']";
    static endDateField: string = "//input[@placeholder='Tanggal Berakhir']";
    static addImageButton: string = "//span[text() = 'Tambah Gambar']/parent::button";

    static orderBannerCheckBox: string = "//span[text() = 'Pemesanan']/preceding-sibling::span/input";
    static paymentBannerCheckBox: string = "//span[text() = 'Pembayaran']/preceding-sibling::span/input";
    static imageUpload: string = "#browse";

    static cancelButton: string = "//button[@routerlink='/esb-order/banner/index']";
    static saveButton: string = "//button[text()=' Simpan ']";


}