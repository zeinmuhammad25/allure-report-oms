import BasePage from "../../base/base-page";
import Element from "../../base/objects/Element";
import Urls from "../../configs/urls";
import DashboardScenario from "./dashboard.scenario";
import DashboardLocator from "./dashboard.locator";


export default class DashboardPage extends BasePage implements DashboardScenario {
    pageUrl = (): string => Urls.dashboard;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(DashboardLocator.buttonProfile),
            Element.ofSelector(DashboardLocator.findbutton),
            Element.ofSelector(DashboardLocator.findcompanyfield),
            Element.ofSelector(DashboardLocator.findbrandfield),
            Element.ofSelector(DashboardLocator.findbranchfield),
            Element.ofSelector(DashboardLocator.daybuttonchecked),
            Element.ofSelector(DashboardLocator.monthbuttonunchecked),
            Element.ofText("Filter Dashboard"),

        ];
    }


}