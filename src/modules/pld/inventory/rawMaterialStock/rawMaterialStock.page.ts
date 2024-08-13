import BasePage from "../../../../base/base-page";
import Urls from "../../../../configs/urls";
import Element from "../../../../base/objects/Element";
import RawMaterialStockScenario from "./rawMaterialStock.scenario";
import RawMaterialStockLocator from "./rawMaterialStock.locator";


export default class RawMaterialStockPage extends BasePage implements RawMaterialStockScenario {


    pageUrl = (): string => Urls.rawmaterial;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(RawMaterialStockLocator.rawMaterialStockFilter),
            Element.ofSelector(RawMaterialStockLocator.rawMaterialStockDropdown),
            Element.ofSelector(RawMaterialStockLocator.rawMaterialStockSearch),
            Element.ofSelector(RawMaterialStockLocator.rawMaterialStockDownloadButton),
        ];
    }


}