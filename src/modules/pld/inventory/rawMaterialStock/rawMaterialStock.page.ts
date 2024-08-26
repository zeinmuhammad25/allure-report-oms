import BasePosLitePage from "../../base-pos-lite-page";
import Element from "../../../../base/objects/Element";
import RawMaterialStockScenario from "./rawMaterialStock.scenario";
import RawMaterialStockLocator from "./rawMaterialStock.locator";


export default class RawMaterialStockPage extends BasePosLitePage implements RawMaterialStockScenario {


    pageUrl = (): string => this.urls.get.inventory.rawMaterialStockUrl;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(RawMaterialStockLocator.rawMaterialStockFilter),
            Element.ofSelector(RawMaterialStockLocator.rawMaterialStockDropdown),
            Element.ofSelector(RawMaterialStockLocator.rawMaterialStockSearch),
            Element.ofSelector(RawMaterialStockLocator.rawMaterialStockDownloadButton),
        ];
    }


}