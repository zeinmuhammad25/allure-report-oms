import BaseLocator from "../../../../../base/base-locator";
import {DeliveryCourier} from "../../../objects/deliveryCourier";

export default class ViewOrderLocator extends BaseLocator {
    static confirmButton: string = "(//button[@aria-label='confirmation-button'])[1]";
    static updateButton: string = "(//button[@aria-label='confirmation-button'])[2]";
    static backButton: string = "//button[@aria-label='back-button']";
    static editButton: string = "//button[@aria-label='edit-button']";
    static notesField: string = "//textarea[@id='am-menu-notes']";
    static buttonCourier: string = "//button[@id='select-courier-button']";
    static courierOption = (courier: DeliveryCourier): string => `//div[contains(@class,'delivery-courier-container')]/ul/li//strong[text()='${courier}']`;
}