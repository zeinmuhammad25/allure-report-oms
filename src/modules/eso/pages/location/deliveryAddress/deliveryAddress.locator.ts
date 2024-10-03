import BaseLocator from "../../../../../base/base-locator";

export default class DeliveryAddressLocator extends BaseLocator {
    static searchField: string = "//input[@class='search-input']";
    static backButton: string = "//button[contains(@class, 'back-button')]";
    static addHomeAddress: string = "//li//div[text()=' Add Home Address ']";
    static addOfficeAddress: string = "//li//div[text()=' Add Office Address ']";
    static addOtherAddress: string = "//li//span[text()='Add Other Address']";
}