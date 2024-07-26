import BasePage from "../../base/base-page";
import Element from "../../base/objects/Element";
import SidebarScenario from "./sidebar.scenario";
import SidebarLocator from "./sidebar.locator";
import Urls from "../../configs/urls";


export default class SidebarPage extends BasePage implements SidebarScenario {
    pageUrl = (): string => Urls.dashboard;

    shouldHave(): Element[] {
        return [];
    }


    async closeSidebar(): Promise<void> {
        await this.isEnabled(SidebarLocator.sidebarisopen)
        await this.click(SidebarLocator.sidebartoggle);
    }

    async openSidebar(): Promise<void> {
        await this.isEnabled(SidebarLocator.sidebarisclosed)
        await this.click(SidebarLocator.sidebartoggle);
    }


}