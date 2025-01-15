import Element from "../../../../../../base/objects/Element";
import BaseOmsPage from "../../../../base-oms-page";
import MoveTableScenario from "./moveTable.scenario";
import MoveTableLocator from "./moveTable.locator";
import Table from "../../../../objects/table";

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

    async selectRoom(roomName: string): Promise<void> {
        await this.click(MoveTableLocator.moveTableSelect(roomName));
        await this.waitForResponse("/table");
    }

    async selectTable(tableName: string): Promise<void> {
        await this.click(MoveTableLocator.moveTableSelect(tableName));
        await this.click(MoveTableLocator.buttonApplyOrCancel("Apply"))
    }

    async disableButtonByLabel(label: string): Promise<void> {
        await this.expectVisible(MoveTableLocator.disableButtonByLabel(label));
    }

    async autoMoveTable(): Promise<void> {
        await this.click(MoveTableLocator.moveTableSelect(Table.acRoom.name));
        await this.waitForResponse("/table");
        const hasTable = await this.isVisible(MoveTableLocator.buttonActiveTable);
        if (hasTable) {
            await this.click(MoveTableLocator.buttonActiveTable);
            await this.click(MoveTableLocator.buttonApplyOrCancel("Apply"));
        } else {
            await this.expectVisible(MoveTableLocator.buttonBackToRoom);
            await this.click(MoveTableLocator.buttonBackToRoom);

            await this.click(MoveTableLocator.moveTableSelect(Table.smokingRoom.name));
            await this.waitForResponse("/table");
            const hasTable = await this.isVisible(MoveTableLocator.buttonActiveTable);
            if (hasTable) {
                await this.click(MoveTableLocator.buttonActiveTable);
                await this.click(MoveTableLocator.buttonApplyOrCancel("Apply"));
            } else {
                await this.expectVisible(MoveTableLocator.buttonApplyOrCancel("Cancel"));
                await this.click(MoveTableLocator.buttonApplyOrCancel("Cancel"));
            }
        }
    }

    async selectTableAndCancelInAcRoom(): Promise<void> {
        await this.click(MoveTableLocator.moveTableSelect(Table.acRoom.name));
        await this.waitForResponse("/table");
        await this.expectVisible(MoveTableLocator.buttonActiveTable);
        await this.click(MoveTableLocator.buttonActiveTable);
        await this.wait(300);
        await this.click(MoveTableLocator.buttonApplyOrCancel("Cancel"));
    }

    async selectTableAndCancelInSmokingRoom(): Promise<void> {
        await this.click(MoveTableLocator.moveTableSelect(Table.smokingRoom.name));
        await this.waitForResponse("/table");
        await this.expectVisible(MoveTableLocator.buttonActiveTable);
        await this.click(MoveTableLocator.buttonActiveTable);
        await this.wait(300);
        await this.click(MoveTableLocator.buttonApplyOrCancel("Cancel"));
    }

    async cancelMoveTableBackTableList(): Promise<void> {
        await this.click(MoveTableLocator.buttonApplyOrCancel("Cancel"));
        await this.click(MoveTableLocator.buttonBackToTableList);
    }


    async selectTableAndApplyInSmokingRoom(): Promise<void> {
        await this.click(MoveTableLocator.moveTableSelect(Table.smokingRoom.name));
        await this.waitForResponse("/table");
        await this.expectVisible(MoveTableLocator.buttonActiveTable);
        await this.click(MoveTableLocator.buttonActiveTable);
        await this.wait(300);
        await this.click(MoveTableLocator.buttonApplyOrCancel("Apply"));
    }

}