import BaseLocator from "../../../../../base/base-locator";

export default class BookOrderLocator extends BaseLocator {
    static buttonPax = (numberOfPax: number): string => `//span[@class='mat-button-wrapper'][text()='${numberOfPax}']`;
    static buttonSalesMode = (salesModeName: string): string => `//button[contains(@class,'btn-vp')]//span[contains(text(),'${salesModeName}')]`;
    static fieldNumberOfPax = "(//app-number-input//input)[1]";
    static fieldOrderTimeOut = "(//app-number-input//input)[2]";
    static buttonBookTable = "//div[@class='ng-star-inserted']//button/span[contains(text(),'Book Table')]";
    static buttonBookOrder = "//div[@class='ng-star-inserted']//button/span[contains(text(),'Book & Order')]";
    static phoneFieldCustomerData = "//input[@placeholder='8xx xxx xxx']";
    static buttonLaterCustomerData = "//button[normalize-space()='Later']";
    static buttonApplyCustomerData = "//button[normalize-space()='Apply']";
}