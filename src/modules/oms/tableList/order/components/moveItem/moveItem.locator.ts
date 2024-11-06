import BaseLocator from "../../../../../../base/base-locator";

export default class MoveItemLocator extends BaseLocator {

    static sectionDineIn = "//span[normalize-space()='Dine In']";
    static sectionQuickService = "//span[normalize-space()='Quick Service']";
    static destinationTable = (tableManagementName: string): string =>
        `//span[normalize-space()='${tableManagementName}']']`;
    static tableName = (tableName: string): string => `//button[.//div[normalize-space(text())='${tableName}']]`;
    static buttonActionFooter = (actionName: string): string => `//button[normalize-space(.)='${actionName}']`;
    static buttonNewQuickService = "//span[normalize-space()='New Quick Service']";
    static buttonSelectAll = "//span[normalize-space()='Select All']";
    static buttonDeselectAll = "//span[normalize-space()='Deselect All']";
    static buttonArrowUp = "//button[contains(@class, 'mr-2')]//i[contains(@class, 'glyphicon-arrow-up')]";
    static buttonArrowDown = "//button[contains(@class, 'mr-2')]//i[contains(@class, 'glyphicon-arrow-down')]";

    private static buttonActionPlusMinusMenu = (menuName: string, action: string): string =>
        `//div[div[contains(text(), '${menuName}')]]/following-sibling::div//button//i[@class='glyphicon glyphicon-${action}']`;

    static buttonPlusMenu = (menuName: string): string => this.buttonActionPlusMinusMenu(menuName, "plus");
    static buttonMinusMenu = (menuName: string): string => this.buttonActionPlusMinusMenu(menuName, "minus");
    static buttonMoveAll = (menuName: string): string => `//div[div[contains(text(), '${menuName}')]]
    /following-sibling::div//button//span[normalize-space()='Move All']`;

}