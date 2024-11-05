import Element from "../../../../base/objects/Element";
import BaseOmsPage from "../../base-oms-page";
import MoveTableScenario from "./moveTable.scenario";
import MoveTableLocator from "./moveTable.locator";
import ApplicationSettingLocator from "../../tools/applicationSetting/applicationSetting.locator";

export default class MoveTableComponent extends BaseOmsPage implements MoveTableScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(MoveTableLocator.buttonMoveTable),
            Element.ofSelector(MoveTableLocator.moveTableSelect("AC ROOM")),
            Element.ofSelector(MoveTableLocator.moveTableSelect("SMOKING ROOM")),
            Element.ofSelector(MoveTableLocator.moveTableList("AC 1")),
            Element.ofSelector(MoveTableLocator.moveTableList("AC 2")),
            Element.ofSelector(MoveTableLocator.moveTableList("AC 3")),
            Element.ofSelector(MoveTableLocator.moveTableList("AC 4")),
            Element.ofSelector(MoveTableLocator.moveTableList("SR 1")),
            Element.ofSelector(MoveTableLocator.moveTableList("SR 2")),
            Element.ofSelector(MoveTableLocator.moveTableList("SR 3")),
            Element.ofSelector(MoveTableLocator.moveTableList("SR 3")),
            Element.ofSelector(MoveTableLocator.nextArrow),
            Element.ofSelector(MoveTableLocator.backArrow),
            Element.ofSelector(MoveTableLocator.buttonApplyOrCancel("Apply")),
            Element.ofSelector(MoveTableLocator.buttonApplyOrCancel("Cancel"))
        ];


    }

    async userSelectMoveTableToTable(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async userSelectMoveQuickServiceToTable(): Promise<void> {
        throw new Error("Method not implemented.");
    }

}