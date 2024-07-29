import BasePage from "../../../base/base-page";
import Urls from "../../../configs/urls";
import Element from "../../../base/objects/Element";
import RawMaterialScenario from "./rawMaterial.scenario";
import RawMaterialLocator from "./rawMaterial.locator";


export default class RawMaterialPage extends BasePage implements RawMaterialScenario {


    pageUrl = (): string => Urls.rawmaterial;

    shouldHave(): Element[] {
        return [
            Element.ofText("Daftar Bahan Baku"),
            Element.ofSelector(RawMaterialLocator.addrawbutton),
            Element.ofSelector(RawMaterialLocator.importrawbutton),
            Element.ofSelector(RawMaterialLocator.rawmaterialsearch),
        ];
    }


}