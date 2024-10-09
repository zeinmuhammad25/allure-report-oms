import BaseLocator from "../../../../base/base-locator";

export default class OrderLocator extends BaseLocator {

    private static getMainButton = (buttonName: string): string => `//button[@aria-label='${buttonName}-button']`;
    static backButton: string = this.getMainButton('back');
    static searchButton: string = this.getMainButton('search');
    static sideBarButton: string = this.getMainButton('sidenav');

    private static getOrderButton =
        (menuID: number, buttonName: string): string =>
            `//app-menu-list-item[@id='menu-${menuID}']//button[@aria-label='${buttonName}-button']`;
    static addButton = (menuID: number): string => this.getOrderButton(menuID, 'add');
    static minusButton = (menuID: number): string => this.getOrderButton(menuID, 'plus');
    static plusButton = (menuID: number): string => this.getOrderButton(menuID, 'minus');
    static loopLiteButton: string = "//button[@aria-label='looplite-button']";
    static phoneField: string = "//input[@id='whatsAppNumber']";
    static passwordField: string = "//input[@placeholder='Password']";
    static membershipLoginButton: string = "//button//span[contains(text(),'Log In')]";
    static errorMessage: string = "//mat-error[@id='mat-mdc-error-6']";
    static tableField: string = "//input[@id='table-name-input']";
    static tableSaveButton: string = "//button[@id='submit-table-button']";

    //Language Dialog
    static idLanguage: string = "//app-language-dialog//div[text()=' Indonesia ']";
    static enLanguage: string = "//app-language-dialog//div[text()=' English ']";
    static languageCloseButton: string = "//app-language-dialog//i[@class='icon-svg ic-close close-dialog bg-grey-800 scale-2x']";
    static enActiveLang: string = `//button[@aria-label='change-language-button']//span[contains(text(),'Language')]`;
    static idActiveLang: string = `//button[@aria-label='change-language-button']//span[contains(text(),'Bahasa')]`;

    // Sidebar
    static sideBarHistory: string = "//button[@aria-label='history-button']";
    static languageButton: string = "//button[@aria-label='change-language-button']";
    static voucherButton: string = "//button[@aria-label='voucher-button']";
    static privacyPolicyButton: string = "//button[@aria-label='privacy-policy-button']";

    // Checkout
    static checkOutButton: string = "//div[@id='checkoutButton']";
    static paymentTotalButton: string = "//div[@id='checkoutButton']";
    static applyPromoAndVoucherButton: string = "//mat-icon[text()='expand_more']";


}