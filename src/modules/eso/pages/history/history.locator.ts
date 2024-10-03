import BaseLocator from "../../../../base/base-locator";

export default class HistoryLocator extends BaseLocator {
    static orderTab: string = "//div[@class='mat-mdc-tab-labels']//span[text()='Order']";
    static reservationTab: string = "//div[@class='mat-mdc-tab-labels']//span[text()='Reservation']";
    static reorderButtons: string = "//button[@aria-label='order-again-button']";
    static firstReorderButton: string = `(${this.reorderButtons})[1]`;
    static historyItems: string = `//mat-card`;

}