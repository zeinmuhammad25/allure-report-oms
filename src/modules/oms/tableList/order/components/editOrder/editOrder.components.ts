import Element from "../../../../../../base/objects/Element";
import BaseOmsPage from "../../../../base-oms-page";
import EditOrderScenario from "./editOrder.scenario";

export default class EditOrderComponents extends BaseOmsPage implements EditOrderScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [];
    }

    async editOrderQty(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async inputNotesMenu(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async applyPromotionMenu(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
