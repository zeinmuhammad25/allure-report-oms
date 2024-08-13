import BaseLocator from "../../../../base/base-locator";

export default class SpecialPriceLocator extends BaseLocator {
    static guideButton: string = "//a[@href='https://help.esb.id/content/POSLite/topic/111104701641800']";
    static addSpecialPrice: string = "//button[@routerlink='/catalog/special-price/create']";

    static startDateSearch: string = "//nz-date-picker[@nzplaceholder='Cari Berdasarkan Tanggal Mulai']";
    static endDateSearch: string = "//nz-date-picker[@nzplaceholder='Cari Berdasarkan Tanggal Berakhir']";
    static menuBookSearch: string = "//input[@placeholder='Cari Berdasarkan Buku Menu']";
    static statusSearch: string = "//nz-select[@nzplaceholder='Cari Berdasarkan Status']";

    static startDateColumn: string = "//nz-table-sorters/span[text() = ' Tanggal Mulai ']";
    static endDateColumn: string = "//nz-table-sorters/span[text() = ' Tanggal Berakhir ']";
    static menuBookColumn: string = "//nz-table-sorters/span[text() = ' Buku Menu ']";
    static statusNameColumn: string = "//th[text() = ' Status ']";


    // Add
    static specialPriceInfo: string = "//div[@class='card-body']//strong[text()='Harga Spesial']";
    static branchField: string = "//nz-select-top-control[@ng-reflect-place-holder='Pilih Cabang']";
    static startDateField: string = "//nz-date-picker[@formcontrolname='startDate']";
    static endDateField: string = "//nz-date-picker[@formcontrolname='endDate']";

    static everydayButton: string = "//span[text()='Setiap Hari']/parent::div";
    static mondayButton: string = "//span[text()='Senin']/parent::div";
    static tuesdayButton: string = "//span[text()='Selasa']/parent::div";
    static wednesdayButton: string = "//span[text()='Rabu']/parent::div";
    static thursdayButton: string = "//span[text()='Kamis']/parent::div";
    static fridayButton: string = "//span[text()='Jumat']/parent::div";
    static saturdayButton: string = "//span[text()='Sabtu']/parent::div";
    static sundayButton: string = "//span[text()='Minggu']/parent::div";

    static everyHourRadio: string = "//span[text()=' Sepanjang Hari ']/preceding-sibling::span";
    static specificRadio: string = "//span[text()=' Spesifik ']/preceding-sibling::span";

    static addMenuBookButton: string = "//span[text()='Pilih / Ubah Buku Menu']/parent::button";
    static menuBookPopUp: string = "//app-modal-list-select";
    static cancelButtonPopUp: string = "//app-modal-list-select//button[text()='Batal']";
    static saveButtonPopUp: string = "//app-modal-list-select//button[text()=' Pilih ']";


}