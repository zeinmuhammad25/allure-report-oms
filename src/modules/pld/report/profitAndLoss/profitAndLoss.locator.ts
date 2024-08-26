import BaseLocator from "../../../../base/base-locator";

export default class ProfitAndLossLocator extends BaseLocator {

    static periodFromDateField: string = "//div[@ng-reflect-ng-class='[object Object]']//app-profit-loss//app-profit-loss-index//div//div//div//div//div//div//nz-form-item//nz-form-control//div//div//nz-date-picker[@nzsize='large']//div//input[@placeholder='Pilih Periode Mulai']";
    static periodToDateField: string = "//div[@ng-reflect-ng-class='[object Object]']//app-profit-loss//app-profit-loss-index//div//div//div//div//div//div//nz-form-item//nz-form-control//div//div//nz-date-picker[@nzsize='large']//div//input[@placeholder='Pilih Periode Selesai']";
    static profitAndLossReportTypeDropdown: string = "//div[@ng-reflect-ng-class='[object Object]']//app-profit-loss//app-profit-loss-index//div//div//div//div//div//div//nz-form-item//nz-form-control//div//div//nz-select-item[@title='Perusahaan'][normalize-space()='Perusahaan']";
    static profitAndLossCompanyDropdown: string = "//nz-input-group[@nzsize='large']//nz-input-group[@nzsize='large']//input[@placeholder='Pilih Usaha']";
    static viewButton: string = "//button[@class='btn-md-primary full-width']";

//Month Picker
    static janDatePicker: string = "//div[normalize-space()='Jan']";
    static febDatePicker: string = "//div[normalize-space()='Feb']";
    static marDatePicker: string = "//div[normalize-space()='Mar']";
    static aprDatePicker: string = "//div[normalize-space()='Apr']";
    static mayDatePicker: string = "//div[normalize-space()='May']";
    static junDatePicker: string = "//div[normalize-space()='Jun']";
    static julDatePicker: string = "//div[normalize-space()='Jul']";
    static augDatePicker: string = "//div[normalize-space()='Aug']";
    static sepDatePicker: string = "//div[normalize-space()='Sep']";
    static oktDatePicker: string = "//div[normalize-space()='Okt']";
    static novDatePicker: string = "//div[normalize-space()='Nov']";
    static decDatePicker: string = "//div[normalize-space()='Dec']";


}