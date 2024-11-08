import BaseLocator from "../../../../../../base/base-locator";

export default class LinkTableLocator extends BaseLocator {

    //General Locator

    static buttonLinkTable: string = "//span[normalize-space()='Link Table']";
    static popupPage: string = "//h4[normalize-space()='Link Table']";
    static buttonNextPage: string = "//div[@class='d-flex justify-content-end pager-wrapper']//i[@class='glyphicon glyphicon-arrow-right']";
    static buttonBackPage: string = "//div[@class='d-flex justify-content-end pager-wrapper']//i[@class='glyphicon glyphicon-arrow-left']";
    static applyButton: string = "//span[normalize-space()='Apply']";
    static cancelButton: string = "//div[@class='modal-footer']//button[@type='button']//span[1]";
    static buttonActiveTable:string="(//app-table-link//app-grid-table-link//button[not(@disabled)]/span/div)[2]"
    static selectTableList = (selectTableLink: string): string => `//app-grid-table-link//button//div[normalize-space()='${selectTableLink}]']`;

}