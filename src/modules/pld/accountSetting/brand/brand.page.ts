import BasePage from "../../../../base/base-page";
import Urls from "../../../../configs/urls";
import Element from "../../../base/objects/Element";
import BrandScenario from "./brand.scenario";
import BrandLocator from "./brand.locator";


export default class BrandPage extends BasePage implements BrandScenario {


    pageUrl = (): string => Urls.accbranch;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(BrandLocator.addBrandButton),
            Element.ofSelector(BrandLocator.searchBrandDropdown),
            Element.ofSelector(BrandLocator.searchBrandField),
            Element.ofSelector(BrandLocator.statusBrandDropdown),
            Element.ofSelector(BrandLocator.applyBrandButton),

        ];
    }


}