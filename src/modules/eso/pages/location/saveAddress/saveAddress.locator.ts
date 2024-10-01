import BaseLocator from "../../../../../base/base-locator";


export default class SaveAddressLocator extends BaseLocator {
    static labelField: string = "//input[@id='label']";
    static addressField: string = "//input[@id='addressInfo']";
    static nameField: string = "//input[@id='name']";
    static phoneField: string = "//input[@id='phoneNumber']";
}