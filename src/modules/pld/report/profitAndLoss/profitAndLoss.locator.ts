import BaseLocator from "../../../../base/base-locator";

export default class ProfitAndLossLocator extends BaseLocator {

    static periodFromDateField: string = "//input[@class='ng-tns-c247-87 ng-pristine ng-valid ng-touched']";
    static periodToDateField: string = "//input[@class='ng-tns-c247-87 ng-pristine ng-valid ng-touched']";
    static reportTypeDropdown: string = "//nz-select-top-control[@class='ng-tns-c137-91 ant-select-selector']//nz-select-item[@title='Perusahaan'][normalize-space()='Perusahaan']";
    static businessField: string = "//input[@class='custom-dropdown ant-input ng-pristine ng-valid ant-input-lg ng-star-inserted ng-touched']";
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