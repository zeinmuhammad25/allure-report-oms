import Element from "../../../base/objects/Element";
import BaseOmsPage from "../base-oms-page";
import TableListScenario from "./tableList.scenario";
import TableListLocator from "./tableList.locator";
import TerminalIDLocator from "../terminalID/terminalID.locator";


export default class TableListPage extends BaseOmsPage implements TableListScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(TableListLocator.buttonQuickService),
            Element.ofSelector(TableListLocator.buttonListBook),
            Element.ofSelector(TableListLocator.buttonSalesList),
            Element.ofSelector(TableListLocator.buttonNextPage),
            Element.ofSelector(TableListLocator.buttonPreviousPage)
        ];
    }

    async gotoQuickService(): Promise<void> {
        await this.expectVisible(TableListLocator.buttonQuickService);
        await this.click(TableListLocator.buttonQuickService);
    }

    async gotoListBook(): Promise<void> {
        await this.expectVisible(TableListLocator.buttonListBook);
        await this.click(TableListLocator.buttonListBook);
    }

    async gotoSalesList(): Promise<void> {
        await this.expectVisible(TableListLocator.buttonSalesList);
        await this.click(TableListLocator.buttonSalesList);
    }

    async selectRoom(roomName: string): Promise<void> {
        await this.expectVisible(TableListLocator.buttonRoom(roomName));
        await this.click(TableListLocator.buttonRoom(roomName));
    }

    async selectTable(tableName: string): Promise<void> {
        await this.expectVisible(TableListLocator.buttonTable(tableName));
        await this.click(TableListLocator.buttonTable(tableName));
    }

    async nextPage(): Promise<void> {
        await this.expectVisible(TableListLocator.buttonNextPage);
        await this.click(TableListLocator.buttonNextPage);
    }

    async previousPage(): Promise<void> {
        await this.expectVisible(TableListLocator.buttonPreviousPage);
        await this.click(TableListLocator.buttonPreviousPage);
    }


}