import Urls from "../../../../configs/urls";
import Element from "../../../../base/objects/Element";
import CompanyScenario from "./company.scenario";
import CompanyLocator from "./company.locator";
import BasePosLitePage from "../../base-pos-lite-page";


export default class CompanyPage extends BasePosLitePage implements CompanyScenario {


    pageUrl = (): string => Urls.menu;

    // Real URL = https://dev7.esb.co.id/esb-core-lite/account-setting/company/index
    shouldHave(): Element[] {
        return [
            Element.ofSelector(CompanyLocator.companyGroupNameField),
            Element.ofSelector(CompanyLocator.changeCompanyNameButton),
            Element.ofSelector(CompanyLocator.addCompanyButton),
            Element.ofSelector(CompanyLocator.archiveCompanyButton),
            Element.ofSelector(CompanyLocator.companySearch),
            Element.ofSelector(CompanyLocator.numberColumn),
            Element.ofSelector(CompanyLocator.companyColumn),
            Element.ofSelector(CompanyLocator.addressColumn),

        ];
    }


}