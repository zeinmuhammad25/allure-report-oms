import BaseLocator from "../../../../base/base-locator";

export default class AddOrderLocator extends BaseLocator {

    static buttonPackage = (selectPackage: string): string => `//span[contains(text(),'${selectPackage}')]`;
    static filedSearch: string = "//input[@placeholder='Search menu']";
    static refreshButton: string = "//i[@class='glyphicon glyphicon-repeat']";
    static nextPageItemList: string = "//div[@class='d-flex']//i[@class='glyphicon glyphicon-arrow-right']";
    static backPageItemList: string = "//div[@class='d-flex']//i[@class='glyphicon glyphicon-arrow-left']";
    static buttonQtyPlusByMenu = (menuName: string): string =>
        `//div[span[normalize-space() = '${menuName}']]/following-sibling::div//i[@class='glyphicon glyphicon-plus']`;
    static buttonQtyMinusByMenu = (menuName: string): string =>
        `//div[span[normalize-space() = '${menuName}']]/following-sibling::div//i[@class='glyphicon glyphicon-minus']`;
    static buttonAddNotesByMenu = (menuName: string): string =>
        `//div[span[normalize-space() = '${menuName}']]/following-sibling::div//i[@class='glyphicon glyphicon-pencil']`;
    static buttonNextOrBackInPopupAddOrder = (Label: "Next" | "Back"): string => `//span[normalize-space()='${Label}']`;
    static applyButton: string = "//span[normalize-space()='Apply']";
    static CancelButton: string = "//div[@class='modal-footer ng-star-inserted']//button[@type='button']//span[1]";

}