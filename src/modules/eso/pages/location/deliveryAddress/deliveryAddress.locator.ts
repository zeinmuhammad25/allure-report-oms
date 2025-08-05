import BaseLocator from "../../../../../base/base-locator";

export default class DeliveryAddressLocator extends BaseLocator {
    static searchField: string = "//input[@class='search-input']";
    static backButton: string = "//button[contains(@class, 'back-button')]";
    static addHomeAddress: string = "//li//div[text()=' Add Home Address ']";
    static addOfficeAddress: string = "//li//div[text()=' Add Office Address ']";
    static addOtherAddress: string = "//li//span[text()='Add Other Address']";
    static selectButtonByLabel = (label: string): string => `//app-item-address//div[text()='${label}']`;
    static deleteButtonByLabel = (label: string): string => `${this.selectButtonByLabel(label)}/following-sibling::div/button[1]`;
    static editButtonByLabel = (label: string): string => `${this.selectButtonByLabel(label)}/following-sibling::div/button[2]`;
    static confirmDeleteButton: string = "//button[@id='selection-botton-0']";
}