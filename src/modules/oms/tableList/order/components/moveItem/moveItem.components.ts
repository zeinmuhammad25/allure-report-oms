import Element from "../../../../../../base/objects/Element";
import BaseOmsPage from "../../../../base-oms-page";
import MoveItemScenario from "./moveItem.scenario";

export default class MoveItemComponents extends BaseOmsPage implements MoveItemScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [];
    }

    async moveAllMenu(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async movePartialItemMenu(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async moveItemToSectionDineIn(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async moveItemToSectionQuickService(): Promise<void> {
        throw new Error("Method not implemented.");
    }

}