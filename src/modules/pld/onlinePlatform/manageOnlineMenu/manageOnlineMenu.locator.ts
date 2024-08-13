import BaseLocator from "../../../../base/base-locator";

export default class ManageOnlineMenuLocator extends BaseLocator {

    static grabFoodButton: string = "//div[@class='c-pointer button-menu disabled introjs-showElement']//img[@id='img-grabfood-button']";
    static grabFoodCoachMark: string = "//div[@class='introjs-tooltiptext']";
    static brachSearchField: string = "//input[@placeholder='Cari berdasarkan kata kunci']";

}