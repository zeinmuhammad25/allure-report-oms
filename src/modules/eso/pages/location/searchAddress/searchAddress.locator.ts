import BaseLocator from "../../../../../base/base-locator";

export default class SearchAddressLocator extends BaseLocator {
    static selectButton: string = "//button//span[text()=' Select Address ']";
    static confirmButton: string = "//button//span[text()=' Confirm ']";
    static saveButton: string = "//button//span[text()=' Save Address ']";
    static searchField: string = "//input";
    static searchSuggestions: string = "//img[@class='me-3']";
    static selectSuggestionByIndex = (index:number): string => `(//img[@class='me-3'])[${index}]`;
    static gpsButton: string = "//div[@class='current-location m-2']//button";
}