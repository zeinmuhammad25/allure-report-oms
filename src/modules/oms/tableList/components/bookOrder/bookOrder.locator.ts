import BaseLocator from "../../../../../base/base-locator";

export default class BookOrderLocator extends BaseLocator {
    static paxButton = (numberOfPax: number): string => `//span[@class='mat-button-wrapper'][normalize-space()='${numberOfPax}']`;
    static salesModeButton = (salesModeName: string): string => `//button[contains(@class,'btn-vp')]//span[contains(text(),'${salesModeName}')]`;
    static numberOfPaxField = "(//app-number-input//input)[1]";
    static orderTimeOutField = "(//app-number-input//input)[2]";
    static bookTableButton = "//div[@class='ng-star-inserted']//button/span[contains(text(),'Book Table')]";
    static bookOrderButton = "//div[@class='ng-star-inserted']//button/span[contains(text(),'Book & Order')]";
    static bookScanAndApplyButton = (action: "Apply" | "Scan / Input"): string => `//span[normalize-space()='${action}']`;
    static bookTableTab = "//app-table-open//button[normalize-space()='Book Table']";
    static bookingListTab = "//app-table-open//button[normalize-space()='Booking List']";
    static customerDataPhoneField = "//app-sales-contact-info//input[@placeholder='8xx xxx xxx']";
    static laterCustomerDataButton = "//app-sales-contact-info//button[normalize-space()='Later']";
    static CustomerDataApplyButton = "//app-sales-contact-info//button[normalize-space()='Apply']";
}