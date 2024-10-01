import BaseLocator from "../../../../base/base-locator";

export default class OrderLocator extends BaseLocator {

    private static getMainButton = (buttonName: string): string => `//button[@aria-label='${buttonName}-button']`;
    static backButton: string = this.getMainButton('back');
    static searchButton: string = this.getMainButton('search');
    static sideBarButton: string = this.getMainButton('sidenav');

    private static getOrderButton =
        (menuID: number, buttonName: string): string =>
            `//app-menu-list-item[@id='menu-${menuID}']//button[aria-label='${buttonName}-button']`;
    static addButton = (menuID: number): string => this.getOrderButton(menuID, 'add');
    static minusButton = (menuID: number): string => this.getOrderButton(menuID, 'plus');
    static plusButton = (menuID: number): string => this.getOrderButton(menuID, 'minus');
    static checkOutButton = (menuID: number): string => "//div[@id='checkoutButton']";


}