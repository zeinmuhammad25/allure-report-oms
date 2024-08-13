import BaseLocator from "../../../../base/base-locator";

export default class PromoCodeHistoryLocator extends BaseLocator {
    static codePromoInputButton: string = "//button[text() = ' Kode Promo ']";
    static promoCodePopUp: string = "//app-modal-applied-promotion-reward";
    static closeButtonPopUp: string = "//img[@alt='icon close']";
    static promoCodeField: string = "//input[@placeholder='Isi kode di sini']";
    static historyPromoCodeButton: string = "//button[@ng-reflect-router-link='/promotion-reward']";
    static applyPromoCodeButton: string = "//button[text()=' Terapkan ']";

    static startDateSearch: string = "//nz-date-picker[@nzplaceholder='Pilih Tanggal Mulai']";
    static endDateSearch: string = "//nz-date-picker[@nzplaceholder='Pilih Tanggal Berakhir']";
    static promoCodeNameSearch: string = "//input[@placeholder='Cari berdasarkan nama atau kode promosi']";
    static statusSearch: string = "//nz-select[@nzplaceholder='Cari Berdasarkan Status']";


    static promoNameColumn: string = "//nz-table-sorters/span[text() = ' Nama Promo ']";
    static promoCodeColumn: string = "//nz-table-sorters/span[text() = ' Kode Promo ']";
    static benefitColumn: string = "//nz-table-sorters/span[text() = ' Benefit ']";
    static startDateColumn: string = "//nz-table-sorters/span[text() = ' Tanggal Mulai ']";
    static endDateColumn: string = "//nz-table-sorters/span[text() = ' Tanggal Berakhir ']";
    static statusNameColumn: string = "//th[text() = ' Status ']";


}