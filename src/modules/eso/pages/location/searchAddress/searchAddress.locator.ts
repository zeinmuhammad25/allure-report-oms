import BaseLocator from "../../../../../base/base-locator";

export default class SearchAddressLocator extends BaseLocator {
    static selectButton: string = "//button//span[text()=' Select Address ']";
    static saveButton: string = "//button//span[text()=' Save Address ']";
}