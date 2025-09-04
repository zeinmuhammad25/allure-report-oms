import BaseLocator from "../../../../../base/base-locator";

export default class BookOrderClassicLocator extends BaseLocator {
    static paxButton = (numberOfPax: number): string => `//button[@color='primary']//span[@class='mat-button-wrapper' and normalize-space()='${numberOfPax}']`;
    static salesModeButton = (salesModeName: string): string => `//button[contains(@class,'btn-vp')]//span[contains(text(),'${salesModeName}')]`;
    static orderTimeOutField = "(//app-number-input//input)[2]";
    static popUpCustomerData = "//div[contains(@class, 'modal-header')]//h4[normalize-space()='Customer Data']";
    static customerDataPhoneField = "//app-sales-contact-info//input[@placeholder='8xx xxx xxx']";
    static laterCustomerDataButton = "//app-sales-contact-info//button[normalize-space()='Later']";
    static CustomerDataApplyButton = "//app-sales-contact-info//button[normalize-space()='Apply']";
    static bookApplyButton = `//span[normalize-space()='Apply']`;

}