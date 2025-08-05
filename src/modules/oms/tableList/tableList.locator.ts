import BaseLocator from "../../../base/base-locator";

export default class TableListLocator extends BaseLocator {
    static buttonRoom = (roomName: string): string => `//app-grid-pagination//button//span[normalize-space()='${roomName}']`;
    static buttonQuickService = this.buttonRoom("QUICK SERVICE");
    static buttonTable = (tableName: string): string => `(//app-table-map//button//div[normalize-space()='${tableName}'])[1]`;
    static buttonListBook = "//div//button//span[normalize-space()='List of book']";
    static buttonSalesList = "//div[@class='d-flex flex-column h-100 ml-2']//div[@class='d-flex flex-grow-1']";
    static buttonPreviousPage = "//button//span//i[@class='glyphicon glyphicon-arrow-left']";
    static buttonNextPage = "//button//span//i[@class='glyphicon glyphicon-arrow-right']";
    static firstBookedTableButton: string = "//app-table-map//button[not(contains(@class, 'mat-primary'))][1]";
    static tableSplitBill = (splitName: string): string => `//button[span[contains(text(), '${splitName}')]]`;
}