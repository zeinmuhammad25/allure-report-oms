import BasePage from "../../../../base/base-page";
import Element from "../../../../base/objects/Element";
import BusinessScenario from "./business.scenario";
import BusinessLocator from "./business.locator";
import BasePosLitePage from "../../base-pos-lite-page";


export default class BusinessPage extends BasePosLitePage implements BusinessScenario {


    pageUrl = (): string => '';

    shouldHave(): Element[] {
        return [
            Element.ofSelector(BusinessLocator.infoButtonBusiness),
            Element.ofSelector(BusinessLocator.changeNameBusinessButton),
            Element.ofSelector(BusinessLocator.groupFieldBusiness),
            Element.ofSelector(BusinessLocator.searchFieldBusiness),
            Element.ofSelector(BusinessLocator.addButtonBusiness),

        ];
    }


}