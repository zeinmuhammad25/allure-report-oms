import BaseLocator from "../../../../../../base/base-locator";

export default class MoveItemLocator extends BaseLocator {

    static sectionDineIn = "//span[normalize-space()='Dine In']";
    static sectionQuickService = "//span[normalize-space()='Quick Service']";
    static getLocatorDestinationTable = (tableManagementName: string): string =>
        `//span[normalize-space()='${tableManagementName}']`;
    static tableName = (tableName: string): string => `//button[.//div[normalize-space(text())='${tableName}']]`;
    static buttonActionFooter = (actionName: string): string => `//button[normalize-space(.)='${actionName}']`;
    static buttonNewQuickService = "//span[normalize-space()='New Quick Service']";
    static buttonSelectAll = "//span[normalize-space()='Select All']";
    static buttonYes = "//span[normalize-space()='Yes']";
    static buttonNo = "//span[normalize-space()='No']";
    static buttonDeselectAll = "//span[normalize-space()='Deselect All']";
    static buttonArrowUp = "//button[contains(@class, 'mr-2')]//i[contains(@class, 'glyphicon-arrow-up')]";
    static buttonArrowDown = "//button[contains(@class, 'mr-2')]//i[contains(@class, 'glyphicon-arrow-down')]";
    static buttonSaveOrder = "//span[contains(text(),'Save Order')]";
    static buttonApplyBookTable = "//button[@type='button']//span[@class='mat-button-wrapper'][normalize-space()='Apply']";
    static escapeKeyboard = "//h4[normalize-space()='Book Table (New Quick Service)']";
    static getLocatorButtonActionFooter = (actionName: string): string => `//span[normalize-space()='${actionName}']`;
    static verifyMenu = (menuName: string): string => `//cdk-virtual-scroll-viewport//*[contains(text(), '${menuName}')]`;
    static verifyQtyMenu = (menuName: string): string => `//div[@class='d-flex table-cell hover ng-star-inserted' 
    and .//span[contains(text(), '${menuName}')]]//div[@class='pointer']`;

    private static buttonActionPlusMinusMenu = (menuName: string, action: string): string =>
        `//div[div[contains(text(), '${menuName}')]]/following-sibling::div//button//i[@class='glyphicon glyphicon-${action}']`;
    static buttonPlusMenu = (menuName: string): string => this.buttonActionPlusMinusMenu(menuName, "plus");
    static buttonMinusMenu = (menuName: string): string => this.buttonActionPlusMinusMenu(menuName, "minus");
    static buttonMoveAll = (menuName: string): string => `//div[div[contains(text(), '${menuName}')]]
    /following-sibling::div//button//span[normalize-space()='Move All']`;

}