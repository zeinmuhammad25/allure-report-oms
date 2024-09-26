import BasePosLitePage from "../../base-pos-lite-page";
import Element from "../../../../base/objects/Element";
import StockMenuScenario from "./stockMenu.scenario";
import StockMenuLocator from "./stockMenu.locator";


export default class StockMenuPage extends BasePosLitePage implements StockMenuScenario {


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


}