import BaseLocator from "../../../../base/base-locator";

export default class ProfitAndLossLocator extends BaseLocator {

    static periodFromDateField: string = "(//nz-date-picker[contains(@class, 'start-month')])[1]";
    static periodToDateField: string = "(//nz-date-picker[contains(@class, 'end-month')])[1]";
    static profitAndLossReportTypeDropdown: string = "(//nz-form-control)[3]";
    static profitAndLossCompanyDropdown: string = "(//nz-form-control)[4]";
    static profitAndLossBranchDropdown: string = "(//nz-form-control)[5]";
    static viewButton: string = "//button[normalize-space()='Tampilkan']";
    static downloadButton: string = "//button[normalize-space()='Unduh']";
    // Profit and Lost Card
    static profitAndLostCard: string = "//div[@class='ant-col ant-col-xs-24 ant-col-md-17']"

    // CompanyDrop
    static companyTypeCompany: string = "//div[text()='Perusahaan']"
    static companyTypeBranch: string = "//div[text()='Cabang']"

    // Branch Dialog
    static branchNameOption = (branchName:string): string => `//h4[normalize-space()='${branchName}']`
    static branchDialogCancelButton: string = "//button[normalize-space()='Batal']";
    static branchDialogApplyButton: string = "//button[normalize-space()='Pilih']";


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