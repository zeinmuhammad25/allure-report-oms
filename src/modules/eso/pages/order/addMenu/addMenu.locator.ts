import BaseLocator from "../../../../../base/base-locator";

export default class AddMenuLocator extends BaseLocator {
    static confirmButton: string = "//button[@aria-label='confirmation-button']";
    static minusButton: string = "//div[@class='qty-counter-component medium']//button[@aria-label='plus-button']";
    static plusButton: string = "//div[@class='qty-counter-component medium']//button[@aria-label='minus-button']";
}