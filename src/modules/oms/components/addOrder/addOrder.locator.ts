import BaseLocator from "../../../../base/base-locator";

export default class AddOrderLocator extends BaseLocator {

    static buttonPackage = (selectPackage: string): string => `//span[contains(text(),'${selectPackage}')]`;
    static filedSearch: string = "//input[@placeholder='Search menu']";
    static refreshButton: string = "//i[@class='glyphicon glyphicon-repeat']";
    static nextPageItemList: string = "//div[@class='d-flex']//i[@class='glyphicon glyphicon-arrow-right']";
    static backPageItemList: string = "//div[@class='d-flex']//i[@class='glyphicon glyphicon-arrow-left']";
    private static buttonModifier = (menuName: string, icon: string): string =>
        `//div[span[normalize-space() = '${menuName}']]/following-sibling::div//i[@class='glyphicon glyphicon-${icon}']`;
    static addOrderLocatorButtonNext: string = `//span[normalize-space()='Next']`;
    static addOrderLocatorButtonBack: string = `//span[normalize-space()='Back']`;
    static applyButton: string = "//span[normalize-space()='Apply']";
    static cancelButton: string = "//div[@class='modal-footer ng-star-inserted']//button[@type='button']//span[1]";

}