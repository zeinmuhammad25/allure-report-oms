import BaseLocator from "../../../../../base/base-locator";

export default class ViewOrderLocator extends BaseLocator {
    static confirmButton: string = "(//button[@aria-label='confirmation-button'])[1]";
    static updateButton: string = "(//button[@aria-label='confirmation-button'])[2]";
    static backButton: string = "//button[@aria-label='back-button']";
    static editButton: string = "//button[@aria-label='edit-button']";
    static notesField: string = "//textarea[@id='am-menu-notes']";
}