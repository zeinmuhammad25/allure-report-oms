import BaseLocator from "../../../../../../base/base-locator";

export default class AddOrderLocator extends BaseLocator {

    static buttonPackage = (selectPackage: string): string => `//span[contains(text(),'${selectPackage}')]`;
    static filedSearch: string = "//input[@placeholder='Search menu']";
    static refreshButton: string = "//i[@class='glyphicon glyphicon-repeat']";
    static nextPageItemList: string = "//div[@class='d-flex']//i[@class='glyphicon glyphicon-arrow-right']";
    static backPageItemList: string = "//div[@class='d-flex']//i[@class='glyphicon glyphicon-arrow-left']";
    static fieldNotes : string = "//app-menu-notes//textarea"
    static popUpNotes : string = "//app-menu-notes"
    //app-menu-notes//textarea
    //div/div//textarea[@class='form-control input-text-notes ng-pristine ng-valid ng-touched']
    static buttonApplyNotes: string ="//button[@type='button']//span[@class='mat-button-wrapper'][normalize-space()='Apply']"
    static buttonCancelNotes: string ="//button[@type='button']//span[@class='mat-button-wrapper'][normalize-space()='Cancel']"
    private static buttonModifier = (menuName: string, icon: string): string =>
        `//div[span[normalize-space() = '${menuName}']]/following-sibling::div//i[@class='glyphicon glyphicon-${icon}']`;
    static buttonQtyPlusByMenu = (menuName: string): string => this.buttonModifier(menuName, "plus");
    static buttonQtyMinusByMenu = (menuName: string): string => this.buttonModifier(menuName, "minus");
    static buttonAddNotesByMenu = (menuName: string): string => this.buttonModifier(menuName, "pencil");
    static buttonNext: string = `//span[normalize-space()='Next']`;
    static buttonBack: string = `//span[normalize-space()='Back']`;
    static applyButton: string = "//span[normalize-space()='Apply']";
    static cancelButton: string = "//div[@class='modal-footer ng-star-inserted']//button[@type='button']//span[1]";

}