import Element from "../../../../base/objects/Element";
import BaseEsoPage from "../../base/base-eso-page";
import HistoryScenario from "./history.scenario";
import HistoryLocator from "./history.locator";
import OrderLocator from "../order/order.locator";

export default class HistoryPage extends BaseEsoPage implements HistoryScenario {
    pageUrl = (): string => this.urls.get.history;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(HistoryLocator.orderTab),
            Element.ofSelector(HistoryLocator.reservationTab),
        ]
    }

    async showOrderHistory(): Promise<void> {
        await this.expectVisible(HistoryLocator.orderTab);
        await this.click(HistoryLocator.orderTab);
    }

    async showReservationHistory(): Promise<void> {
        await this.expectVisible(HistoryLocator.orderTab);
        await this.click(HistoryLocator.orderTab);
    }

    async selectItem(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async reorder(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async hasHistoryItems(): Promise<void> {
        await this.expectHasElements(HistoryLocator.historyItems)
    }

    async hasEmptyHistoryItems(): Promise<void> {
        await this.expectHasEmptyElement(HistoryLocator.historyItems)
    }

}