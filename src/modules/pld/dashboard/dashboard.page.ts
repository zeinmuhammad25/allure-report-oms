import Element from "../../../base/objects/Element";
import DashboardScenario from "./dashboard.scenario";
import BasePosLitePage from "../base-pos-lite-page";


export default class DashboardPage extends BasePosLitePage implements DashboardScenario {
    pageUrl = (): string => this.urls.get.dashboard.dashboardIndex

    shouldHave(): Element[] {
        return [];
    }


}