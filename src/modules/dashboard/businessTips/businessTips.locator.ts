import BaseLocator from "../../../base/base-locator";

export default class BusinessTipsLocator extends BaseLocator {
    static businessTipsTittle: string = "//h1[normalize-space()='Tips Bisnis']";
    static businessTipsFooter: string = "//div[@class='card radius-10 shadow h-100 mt-3']//div[@class='card-body d-flex flex-column']";


}