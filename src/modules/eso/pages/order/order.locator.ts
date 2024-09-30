import BaseLocator from "../../../../base/base-locator";

export default class OrderLocator extends BaseLocator {
    static backButton: string = "//button[@aria-label='back-button']";
    static searchButton: string = "//button[@aria-label='search-button']";
    static sideBarButton: string = "//button[@aria-label='sidenav-button']";

    static addButton = (menuID: number): string => `//app-menu-list-item[@id='menu-${menuID}']//button[aria-label='add-button']`;
    static minusButton = (menuID: number): string => `//app-menu-list-item[@id='menu-${menuID}']//button[aria-label='plus-button']`;
    static plusButton = (menuID: number): string => `//app-menu-list-item[@id='menu-${menuID}']//button[aria-label='minus-button']`;
    static checkOutButton = (menuID: number): string => "//div[@id='checkoutButton']";


}