import BaseLocator from "../../../../base/base-locator";

export default class HomeLocator extends BaseLocator {
    static backButton: string = "//button[@aria-label='back-button']";
    static searchButton: string = "//button[@aria-label='search-button']";
    static sideBarButton: string = "//button[@aria-label='sidenav-button']";
    static tableField: string = "//input[@id='table-name-input']";
    static modeButton: string = "//button[@id='o-change-mode']";
    static getCategoryByName =
        (categoryName: string): string =>
            `//app-menu-category-container//h3[contains(text(),'${categoryName}')]`;

    //Side Bar
    static sideBarLoginButton: string = "//button[contains(@class,'btn-login-whatsapp')]";
    static sideBarHistoryButton: string = "//button[@aria-label='history-button']";
    static sideBarLanguageButton: string = "//button[@aria-label='change-language-button']";
    static sideBarPrivacyButton: string = "//button[@aria-label='privacy-policy-button']";
    static sideBarCloseButton: string = "//button[@aria-label='close-button']";

}