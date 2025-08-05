import BaseLocator from "../../../../base/base-locator";


export default class SearchLocator extends BaseLocator {
    static getButton = (menuID: number, label: string): string => `(//div[@id='menu-${menuID}'])//button[@aria-label='${label}']`;
    static addButton = (menuID: number): string => this.getButton(menuID, 'add-button');
    static plusButton = (menuID: number): string => this.getButton(menuID, 'minus-button');
    static minusButton = (menuID: number): string => this.getButton(menuID, 'plus-button');
    static buttonCart: string = "//div[@id='itemsCart']";
}