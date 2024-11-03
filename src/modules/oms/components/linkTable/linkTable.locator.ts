import BaseLocator from "../../../../base/base-locator";

export default class LinkTableLocator extends BaseLocator {

    //General Locator

    static buttonLinkTable: string = "//span[normalize-space()='Link Table']";
    static popupPage: string = "//h4[normalize-space()='Link Table']";
    static buttonNextPage: string = "//div[@class='d-flex justify-content-end pager-wrapper']//i[@class='glyphicon glyphicon-arrow-right']";
    static buttonBackPage: string = "//div[@class='d-flex justify-content-end pager-wrapper']//i[@class='glyphicon glyphicon-arrow-left']";
    static applyOrCancelButton = (applyOrCancel: string): string => `//span[normalize-space()='${applyOrCancel}']`;
    //span[normalize-space()='Apply']

    //Locator ACRoom
    static tableAc1: string = "div[@id='btn-wrap-1611']//div[@class='h-100 d-flex flex-column justify-content-center align-items-center']";
    static tableAc2: string = "div[@id='btn-wrap-1612']//div[@class='h-100 d-flex flex-column justify-content-center align-items-center']";
    static tableAc3: string = "div[@id='btn-wrap-1613']//div[@class='h-100 d-flex flex-column justify-content-center align-items-center']";
    static tableAc4: string = "div[@id='btn-wrap-1614']//div[@class='h-100 d-flex flex-column justify-content-center align-items-center']";
    //Locator ACRoom
    static tableSr1: string = "div[@id='btn-wrap-1615']//div[@class='h-100 d-flex flex-column justify-content-center align-items-center']";
    static tableSr2: string = "div[@id='btn-wrap-1616']//div[@class='h-100 d-flex flex-column justify-content-center align-items-center']";
    static tableSr3: string = "div[@id='btn-wrap-1617']//div[@class='h-100 d-flex flex-column justify-content-center align-items-center']";
    static tableSr4: string = "div[@id='btn-wrap-1618']//div[@class='h-100 d-flex flex-column justify-content-center align-items-center']";
}