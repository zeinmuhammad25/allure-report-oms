import Element from "../../../base/objects/Element";
import BaseOmsPage from "../base-oms-page";
import TableListScenario from "./tableList.scenario";
import TableListLocator from "./tableList.locator";
import QuickServiceListPage from "./quickServiceList/quickServiceList.page";
import OrderPage from "./order/order.page";
import Table from "../objects/table";


export default class TableListPage extends BaseOmsPage implements TableListScenario {
    pageUrl = (): string => this.urls.get.tableList.orderDineIn;

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

    async deleteAllQuickService(): Promise<void> {
        const quickServiceListPage = new QuickServiceListPage(this._page);
        const orderPage = new OrderPage(this._page);

        await this.gotoQuickService();
        while (await quickServiceListPage.quickServiceHasData()) {
            await quickServiceListPage.selectSalesNum("first");
            await orderPage.cancelTable("Tidak Jadi");
            await this.wait(500);
            await this.click("//app-confirm-dialog//button[1]");
            await this.wait(500);
            await this.gotoQuickService();
        }
    }

    async deleteAllDineIn(): Promise<void> {
        const orderPage = new OrderPage(this._page);
        while (await this.isVisible(TableListLocator.firstBookedTableButton)) {
            await this.wait(500);
            await this.click(TableListLocator.firstBookedTableButton);
            await orderPage.cancelTable("Tidak Jadi");
            await this.wait(500);
            await this.click("//app-confirm-dialog//button[1]");
            await this.wait(500);
        }

        await this.selectRoom(Table.smokingRoom.name);
        while (await this.isVisible(TableListLocator.firstBookedTableButton)) {
            await this.click(TableListLocator.firstBookedTableButton);
            await orderPage.cancelTable("Tidak Jadi");
            await this.wait(500);
            await this.click("//app-confirm-dialog//button[1]");
            await this.wait(500);
            await this.selectRoom(Table.smokingRoom.name);
        }

    }


    async deleteSplitBill(splitName: "Main Bill" | "Bill 2" | "Bill 3" | "Bill 4"): Promise<void> {
        const orderPage = new OrderPage(this._page);
        const isTableVisible = await this.isVisible(TableListLocator.firstBookedTableButton);
        if (isTableVisible) {
            await this.wait(500);
            await this.click(TableListLocator.firstBookedTableButton);
            await this.expectVisible(TableListLocator.tableSplitBill(splitName));
            await this.click(TableListLocator.tableSplitBill(splitName));
            await orderPage.cancelTable("Tidak Jadi");
            await this.wait(500);
            await this.click("//app-confirm-dialog//button[1]");
            await this.wait(500);
        } else {
            await this.selectRoom(Table.smokingRoom.name);
        }
        await this.selectRoom(Table.smokingRoom.name);
        await this.wait(500);
        const isTableVisibleAgain = await this.isVisible(TableListLocator.firstBookedTableButton);
        if (isTableVisibleAgain) {
            await this.click(TableListLocator.firstBookedTableButton);
            await this.expectVisible(TableListLocator.tableSplitBill(splitName));
            await this.click(TableListLocator.tableSplitBill(splitName));
            await orderPage.cancelTable("Tidak Jadi");
            await this.wait(500);
            await this.click("//app-confirm-dialog//button[1]");
            await this.wait(500);
        }
    }

    async selectTableSplitBill(splitName: "Main Bill" | "Bill 2" | "Bill 3" | "Bill 4"): Promise<void> {
        await this.expectVisible(TableListLocator.tableSplitBill(splitName));
        await this.click(TableListLocator.tableSplitBill(splitName));
    }
}