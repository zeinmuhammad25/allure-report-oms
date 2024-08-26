import BasePosLitePage from "../../base-pos-lite-page";
import Element from "../../../../base/objects/Element";
import BrandScenario from "./brand.scenario";
import BrandLocator from "./brand.locator";


export default class BrandPage extends BasePosLitePage implements BrandScenario {


    pageUrl = (): string => this.urls.get.accountSetting.brandUrl;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(BrandLocator.brandButtonAdd),
            Element.ofSelector(BrandLocator.brandDropdownSearch),
            Element.ofSelector(BrandLocator.brandSearchField),
            Element.ofSelector(BrandLocator.brandSDropdownStatus),
            Element.ofSelector(BrandLocator.brandButtonApply),
            Element.ofSelector(BrandLocator.brandTab),
            Element.ofSelector(BrandLocator.brandArrowNext),
            Element.ofSelector(BrandLocator.brandArrowPrev),
            Element.ofSelector(BrandLocator.brandPaginationIndicator),

        ];
    }


}