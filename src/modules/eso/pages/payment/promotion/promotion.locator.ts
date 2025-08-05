import BaseLocator from "../../../../../base/base-locator";


export default class PromotionLocator extends BaseLocator {
    static searchField: string = "//input[@id='searchInput']";
    static applySearchButton: string = "//div[@class='search-button']//button";

    static promoCard = (promoName: string):string => `//app-promotion-voucher-list//div[text()='${promoName}']`
    static promotionDialogBackButton: string = "//button[@aria-label='back-button']";
    static promotionDialogUseButton: string = "//button[@aria-label='submit-button']";
    static applyPromotionButton: string = "//button[@id='apply-voucher-button']";
}