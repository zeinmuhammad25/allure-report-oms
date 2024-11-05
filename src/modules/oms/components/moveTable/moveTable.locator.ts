import BaseLocator from "../../../../base/base-locator";

export default class MoveTableLocator extends BaseLocator {


    static buttonMoveTable: string = "//span[normalize-space()='Move Table']";
    static moveTableSelect = (selectTableGroup: string): string => `//app-grid-table-move//button//div [normalize-space() = '${selectTableGroup}']`;
    static moveTableList = (selectTableInTableList: string): string => `//app-grid-table-move//button//div [normalize-space() = '${selectTableInTableList}']`;
    static nextArrow = "//app-grid-pager[@class='ng-star-inserted']//i[@class='glyphicon glyphicon-arrow-right']";
    static backArrow = "//app-grid-pager[@class='ng-star-inserted']//i[@class='glyphicon glyphicon-arrow-right']";
    static buttonApplyOrCancel = (label: "Apply" | "Cancel"): string => `//span[normalize-space()='${label}']`;

}

