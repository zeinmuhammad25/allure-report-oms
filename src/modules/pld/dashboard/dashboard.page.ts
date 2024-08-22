import Element from "../../../base/objects/Element";
import Urls from "../../../configs/urls";
import DashboardScenario from "./dashboard.scenario";
import DashboardLocator from "./dashboard.locator";
import BasePosLitePage from "../base-pos-lite-page";


export default class DashboardPage extends BasePosLitePage implements DashboardScenario {
    pageUrl = (): string => this.urls.get.dashboard.dashboardIndex

    shouldHave(): Element[] {
        return [
            Element.ofSelector(DashboardLocator.buttonProfile),
            Element.ofSelector(DashboardLocator.findButton),
            Element.ofSelector(DashboardLocator.findCompanyField),
            Element.ofSelector(DashboardLocator.findBrandField),
            Element.ofSelector(DashboardLocator.findBranchField),
            Element.ofSelector(DashboardLocator.dayButtonChecked),
            Element.ofSelector(DashboardLocator.monthButtonChecked),

        ];
    }


}