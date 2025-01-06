import BaseLocator from "../../../../../../base/base-locator";

export default class MoveTableLocator extends BaseLocator {


    static buttonMoveTable: string = "//span[normalize-space()='Move Table']";
    static moveTableSelect = (selectTableGroup: string): string => `//app-grid-table-move//button//div [normalize-space() = '${selectTableGroup}']`;
    static disableButtonByLabel = (label: string): string => `(//app-table-move//button[@disabled and normalize-space()='${label}'])[1]`;
    static moveTableList = (selectTableInTableList: string): string => `//app-grid-table-move//button//div [normalize-space() = '${selectTableInTableList}']`;
    static buttonActiveTable: string = "(//app-table-move//app-grid-table-move//button[not(@disabled)]/span/div)[2]";
    static buttonBackToRoom: string = "(//app-table-move//app-grid-table-move//button[not(@disabled)]/span/div)[1]";
    static nextArrow = "//app-grid-pager[@class='ng-star-inserted']//i[@class='glyphicon glyphicon-arrow-right']";
    static backArrow = "//app-grid-pager[@class='ng-star-inserted']//i[@class='glyphicon glyphicon-arrow-right']";
    static buttonApplyOrCancel = (label: "Apply" | "Cancel"): string => `//span[normalize-space()='${label}']`;
    static buttonBackToTableList = "//a[@class='d-flex align-items-center active']";
}

