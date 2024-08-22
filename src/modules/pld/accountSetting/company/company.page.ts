import Element from "../../../../base/objects/Element";
import CompanyScenario from "./company.scenario";
import CompanyLocator from "./company.locator";
import BasePosLitePage from "../../base-pos-lite-page";


export default class CompanyPage extends BasePosLitePage implements CompanyScenario {


    pageUrl = (): string => this.urls.get.accountSetting.company;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(CompanyLocator.companyGroupNameField),
            Element.ofSelector(CompanyLocator.companyChangeNameButton),
            // Element.ofSelector(CompanyLocator.companyAddButton),
            // Element.ofSelector(CompanyLocator.companyArchiveButton),
            // Element.ofSelector(CompanyLocator.companySearchField),
            // Element.ofSelector(CompanyLocator.companyNumberColumn),
            // Element.ofSelector(CompanyLocator.companyNameColumn),
            // Element.ofSelector(CompanyLocator.companyAddressColumn),

        ];
    }


}