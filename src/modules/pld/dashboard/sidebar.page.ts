import BasePage from "../../../base/base-page";
import Element from "../../../base/objects/Element";
import SidebarScenario from "./sidebar.scenario";
import SidebarLocator from "./sidebar.locator";
import Urls from "../../../configs/urls";


export default class SidebarPage extends BasePosLitePage implements SidebarScenario {
    pageUrl = (): string => Urls.dashboard;

    shouldHave(): Element[] {
        return [];
    }


    async closeSidebar(): Promise<void> {
        await this.isEnabled(SidebarLocator.sidebarOpened)
        await this.click(SidebarLocator.sidebarToggle);
    }

    async openSidebar(): Promise<void> {
        await this.isEnabled(SidebarLocator.sidebarClosed)
        await this.click(SidebarLocator.sidebarToggle);
    }


}