import BaseLocator from "../../../../base/base-locator";

export default class RawMaterialReportLocator extends BaseLocator {

    static rawMaterialReportTypeDropdown: string = "//nz-select-item[@title='Rata-Rata Penggunaan']";
    static rawMaterialReportStartDate: string = "//input[@placeholder='Pilih Periode Mulai']";
    static rawMaterialReportEndDate: string = "//input[@placeholder='Pilih Periode Selesai']";
    static ramMaterialReportBranchDropdown: string = "//nz-select[@nzplaceholder='Pilih Cabang' and @nzsize='large']//input[contains(@class, 'ant-select-selection-search-input')]";
    static rawMaterialReportViewButton: string = "//button[normalize-space()='Tampilkan']";


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

