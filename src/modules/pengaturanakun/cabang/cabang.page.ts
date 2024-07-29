import BasePage from "../../../base/base-page";
import Urls from "../../../configs/urls";
import Element from "../../../base/objects/Element";
import CabangScenario from "./cabang.scenario";
import CabangLocator from "./cabang.locator";


export default class CabangPage extends BasePage implements CabangScenario {


    pageUrl = (): string => Urls.accbranch;

    shouldHave(): Element[] {
        return [
            Element.ofText("Daftar Cabang"),
            Element.ofSelector(CabangLocator.addbranchbtn),
            Element.ofSelector(CabangLocator.accsearchbranch),
            Element.ofSelector(CabangLocator.accsearchexpired),
            Element.ofSelector(CabangLocator.accbranchamount),

        ];
    }


}