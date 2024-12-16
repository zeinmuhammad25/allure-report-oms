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

    private apiBaseUrl = "http://localhost/fnb-pos-v2/api/web/v1";

    async goHere(): Promise<void> {
        await this.navigateHere();
        await this.wait(300);
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

        await this.selectRoom(Table.acRoom.name);
        while (await this.isVisible(TableListLocator.firstBookedTableButton)) {
            await this.click(TableListLocator.firstBookedTableButton);
            await orderPage.cancelTable("Tidak Jadi");
            await this.wait(500);
            await this.click("//app-confirm-dialog//button[1]");
            await this.wait(500);
            await this.selectRoom(Table.acRoom.name);
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


    async cancelAllQuickServices(): Promise<void> {
        const token = await this.getLocalStorage("session");
        const result = await this.makeApiRequest<{ salesNum: string }[]>("/order/index-take-away/", {
            baseUrl: this.apiBaseUrl,
            method: "POST",
            headers: {"Authorization": `Bearer ${token}`}
        });

        let salesNums = [];
        if (result.status == 200) {
            salesNums = result.data.map(item => item.salesNum);
        }

        await Promise.all(salesNums.map((salesNum) =>
            this.makeApiRequest("/order/cancel-table", {
                baseUrl: this.apiBaseUrl,
                method: "POST",
                headers: {"Authorization": `Bearer ${token}`, "Content-Type": "application/json"},
                body: {
                    "tableID": 0,
                    "salesNum": salesNum,
                    "cancelNotes": "Test Cancel Quick Service",
                    "checkCurrentOrder": false
                }
            })
        ));
    }

    async cancelAllTables(): Promise<void> {
        const token = await this.getLocalStorage("session");
        const result = await this.makeApiRequest<{
            tables: { tableStatusName: string, tableID: number, salesNum: string }[]
        }[]>("/table", {
            baseUrl: this.apiBaseUrl,
            method: "POST",
            headers: {"Authorization": `Bearer ${token}`, "Content-Type": "application/json"},
            body: {"terminalCode": "07", "activatedDate": null}
        });

        let tables = [];
        if (result.status == 200) {
            tables = result.data.flatMap(section => section.tables
                .filter(table => table.tableStatusName !== "Available")
                .map(table => ({
                    tableStatusName: table.tableStatusName,
                    tableID: table.tableID,
                    salesNum: table.salesNum
                }))
            );
        }

        await Promise.all(tables.map((table) =>
            this.makeApiRequest("/order/cancel-table", {
                baseUrl: this.apiBaseUrl,
                method: "POST",
                headers: {"Authorization": `Bearer ${token}`, "Content-Type": "application/json"},
                body: {
                    "tableID": table.tableID,
                    "salesNum": table.salesNum,
                    "cancelNotes": "Test Cancel Dine In",
                    "checkCurrentOrder": false
                }
            })
        ));
    }
}