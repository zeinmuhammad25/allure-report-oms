import BasePosLitePage from "../../base-pos-lite-page";
import Element from "../../../../base/objects/Element";
import StockMenuScenario from "./stockMenu.scenario";
import StockMenuLocator from "./stockMenu.locator";
import SidebarLocator from "../sidebar.locator";
import {Keyboard} from "../../../../base/constants/Keyboard";


export default class StockMenuPage extends BasePosLitePage implements StockMenuScenario {
    private branch = "Anugerah Food";
    private menuName = "Kopi Panas"

    private apiStockMenu = "/stock-menu"
    pageUrl = (): string => this.urls.get.dashboard.stockMenuUrl;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(StockMenuLocator.branchFilter),
            Element.ofSelector(StockMenuLocator.inputFilter),
            Element.ofSelector(StockMenuLocator.advancedFilter),
            Element.ofSelector(StockMenuLocator.advancedFilter),
            Element.ofSelector(StockMenuLocator.numberColumn),
            Element.ofSelector(StockMenuLocator.menuColumn),
            Element.ofSelector(StockMenuLocator.categoryColumn),
            Element.ofSelector(StockMenuLocator.statusColumn),
            Element.ofSelector(StockMenuLocator.availabilityColumn),
            Element.ofSelector(StockMenuLocator.remainingStockColumn),
        ];
    }

    private async navigateToStockMenu(): Promise<void> {
        await this.expectVisible(SidebarLocator.sidebarStockMenu);
        await this.click(SidebarLocator.sidebarStockMenu);
        await this.waitForResponse(this.apiStockMenu)
    }

    async validateDataOnDashboardStockMenu(): Promise<void> {
        await this.navigateToStockMenu()
        await this.fillFilterAndShow()
        await this.expectVisible(StockMenuLocator.firstDataNumber)
    }

    private async fillFilterAndShow() {
        await this.inputBranch()
        await this.inputMenu()
    }

    private async inputBranch() {
        await this.expectVisible(StockMenuLocator.branchFilter)
        await this.click(StockMenuLocator.branchFilter)
        await this.expectVisible(StockMenuLocator.filterOptionItem(this.branch))
        await this.click(StockMenuLocator.branchFilter)
    }

    private async inputMenu() {
        await this.expectVisible(StockMenuLocator.inputFilter)
        await this.fill(StockMenuLocator.inputFilter, this.menuName)
        await this.pressKeyboard(Keyboard.ENTER)
    }
}