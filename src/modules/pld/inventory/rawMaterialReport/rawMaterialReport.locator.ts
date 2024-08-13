import BaseLocator from "../../../../base/base-locator";

export default class RawMaterialReportLocator extends BaseLocator {

    static reportTypeRawMaterialReportDropdown: string = "//nz-select-item[@title='Rata-Rata Penggunaan']";
    static startDateRawMaterialReport: string = "//input[@placeholder='Pilih Periode Mulai']";
    static endDateRawMaterialReport: string = "//input[@placeholder='Pilih Periode Selesai']";
    static branchRawMaterialReportDropdown: string = "//input[@class='ant-select-selection-search-input ng-pristine ng-valid ng-touched']";
    static viewRawMaterialReportButton: string = "//button[normalize-space()='Tampilkan']";


    //month picker

    static prevYearRawMaterialReport: string = "//span[@class='ant-picker-super-prev-icon']";
    static nexYearRawMaterialReport: string = "//span[@class='ant-picker-super-next-icon']";
    static nowYearRawMaterialReport: string = "//button[@title='Pilih satu tahun']";
    static janStartDateRawMaterialReport: string = "//div[normalize-space()='Jan']";
    static febStartDateRawMaterialReport: string = "//div[normalize-space()='Feb']";
    static aprStartDateRawMaterialReport: string = "//div[normalize-space()='Apr']";
    static mayStartDateRawMaterialReport: string = "//div[normalize-space()='May']";
    static junStartDateRawMaterialReport: string = "//div[normalize-space()='Jun']";
    static julStartDateRawMaterialReport: string = "//div[normalize-space()='Jul']";
    static augStartDateRawMaterialReport: string = "//div[normalize-space()='Aug']";
    static sepStartDateRawMaterialReport: string = "//div[normalize-space()='Sep']";
    static octStartDateRawMaterialReport: string = "//div[normalize-space()='Oct']";
    static novStartDateRawMaterialReport: string = "//div[normalize-space()='Nov']";
    static decStartDateRawMaterialReport: string = "//div[normalize-space()='Dec']";
}

