import BasePage from "../../../base/base-page";
import Urls from "../../../configs/urls";
import Element from "../../../base/objects/Element";
import BahanbakuScenario from "./bahanbaku.scenario";
import BahanbakuLocator from "./bahanbaku.locator";


export default class BahanbakuPage extends BasePage implements BahanbakuScenario {


    pageUrl = (): string => Urls.rawmaterial;

    shouldHave(): Element[] {
        return [
            Element.ofText("Daftar Bahan Baku"),
            Element.ofSelector(BahanbakuLocator.addrawbutton),
            Element.ofSelector(BahanbakuLocator.importrawbutton),
            Element.ofSelector(BahanbakuLocator.rawmaterialsearch),
        ];
    }


}