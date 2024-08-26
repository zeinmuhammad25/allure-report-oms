import BasePosLitePage from "../../base-pos-lite-page";
import Element from "../../../../base/objects/Element";
import RawMaterialScenario from "./rawMaterial.scenario";
import RawMaterialLocator from "./rawMaterial.locator";


export default class RawMaterialPage extends BasePosLitePage implements RawMaterialScenario {


    pageUrl = (): string => this.urls.get.inventory.rawMaterialUrl;

    shouldHave(): Element[] {
        return [
            Element.ofText("Daftar Bahan Baku"),
            Element.ofSelector(RawMaterialLocator.addRawButton),
            Element.ofSelector(RawMaterialLocator.importRawButton),
            Element.ofSelector(RawMaterialLocator.rawMaterialSearch),
        ];
    }


}