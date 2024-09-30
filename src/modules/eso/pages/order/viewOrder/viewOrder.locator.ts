import BaseLocator from "../../../../../base/base-locator";

export default class ViewOrderLocator extends BaseLocator {
    static confirmButton: string = "//button[@aria-label='confirmation-button']";
    static backButton: string = "//button[@aria-label='back-button']";
}