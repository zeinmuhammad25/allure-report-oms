import Element from "../../../../base/objects/Element";
import BaseEsoPage from "../../base/base-eso-page";
import HistoryScenario from "./history.scenario";
import HistoryLocator from "./history.locator";

export default class HistoryPage extends BaseEsoPage implements HistoryScenario {

    pageUrl = (): string => this.urls.get.history;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(HistoryLocator.orderTab),
            Element.ofSelector(HistoryLocator.reservationTab),
        ]
    }

    async showOrderHistory(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async showReservationHistory(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async selectItem(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async reorder(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}