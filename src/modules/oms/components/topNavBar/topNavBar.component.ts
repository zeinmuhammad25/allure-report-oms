import Element from "../../../../base/objects/Element";
import BaseOmsPage from "../../base-oms-page";
import TopNavBarScenario from "./topNavBar.scenario";
import TopNavBarLocator from "./topNavBar.locator";


export default class TopNavBarComponent extends BaseOmsPage implements TopNavBarScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(TopNavBarLocator.profileButton),
            Element.ofSelector(TopNavBarLocator.signOutButton),
            Element.ofSelector(TopNavBarLocator.errorLog),
            Element.ofSelector(TopNavBarLocator.buttonSelectLog("ESB ORDER")),
            Element.ofSelector(TopNavBarLocator.buttonSelectLog("ERROR REPORT")),
            Element.ofSelector(TopNavBarLocator.buttonSelectEsbOrderReport("Full Service")),
            Element.ofSelector(TopNavBarLocator.buttonSelectEsbOrderReport("Quick Service")),
            Element.ofSelector(TopNavBarLocator.buttonNextSectionLog),
            Element.ofSelector(TopNavBarLocator.buttonBackSectionLog),
            Element.ofSelector(TopNavBarLocator.buttonSyncOrCloseLog("SYNC USER")),
            Element.ofSelector(TopNavBarLocator.buttonSyncOrCloseLog("Close Log")),
            Element.ofSelector(TopNavBarLocator.buttonMenuSideBar),
            Element.ofSelector(TopNavBarLocator.popupVerifySyncUser("Yes")),
            Element.ofSelector(TopNavBarLocator.popupVerifySyncUser("No")),
            Element.ofSelector(TopNavBarLocator.popSyncComplete)

        ];
    }

    async UserViewProfile(): Promise<void> {
        await this.expectVisible(TopNavBarLocator.profileButton);
        await this.click(TopNavBarLocator.profileButton);

    }

    async UserSignOut(): Promise<void> {
        await this.expectVisible(TopNavBarLocator.signOutButton);
        await this.click(TopNavBarLocator.signOutButton);
    }

    async UserViewProfileAndSignOut(): Promise<void> {
        await this.expectVisible(TopNavBarLocator.profileButton);
        await this.click(TopNavBarLocator.profileButton);
        await this.click(TopNavBarLocator.signOutButton);
    }

    async UserViewEsbOrderReportFullService(): Promise<void> {
        await this.click(TopNavBarLocator.errorLog);
        await this.click(TopNavBarLocator.buttonSelectLog("ESB ORDER"));
        await this.click(TopNavBarLocator.buttonSelectEsbOrderReport("Full Service"));
        await this.click(TopNavBarLocator.buttonSyncOrCloseLog("Close Log"));
    }

    async UserViewEsbOrderReportQuickService(): Promise<void> {
        await this.click(TopNavBarLocator.errorLog);
        await this.click(TopNavBarLocator.buttonSelectLog("ESB ORDER"));
        await this.click(TopNavBarLocator.buttonSelectEsbOrderReport("Quick Service"));
        await this.click(TopNavBarLocator.buttonSyncOrCloseLog("Close Log"));
    }

    async UserViewErrorReport(): Promise<void> {
        await this.click(TopNavBarLocator.errorLog);
        await this.click(TopNavBarLocator.buttonSelectLog("ERROR REPORT"));
        await this.click(TopNavBarLocator.buttonSyncOrCloseLog("Close Log"));
    }

    async UserViewEsbOrderReportFullServiceIFManyData(): Promise<void> {
        await this.click(TopNavBarLocator.errorLog);
        await this.click(TopNavBarLocator.buttonSelectLog("ESB ORDER"));
        await this.click(TopNavBarLocator.buttonSelectEsbOrderReport("Full Service"));
        await this.click(TopNavBarLocator.buttonNextSectionLog);
        await this.click(TopNavBarLocator.buttonBackSectionLog);
        await this.click(TopNavBarLocator.buttonSyncOrCloseLog("Close Log"));
    }

    async UserViewEsbOrderReportQuickServiceIFManyData(): Promise<void> {
        await this.click(TopNavBarLocator.errorLog);
        await this.click(TopNavBarLocator.buttonSelectLog("ESB ORDER"));
        await this.click(TopNavBarLocator.buttonSelectEsbOrderReport("Quick Service"));
        await this.click(TopNavBarLocator.buttonNextSectionLog);
        await this.click(TopNavBarLocator.buttonBackSectionLog);
        await this.click(TopNavBarLocator.buttonSyncOrCloseLog("Close Log"));
    }

    async UserViewErrorReportIFManyData(): Promise<void> {
        await this.click(TopNavBarLocator.errorLog);
        await this.click(TopNavBarLocator.buttonSelectLog("ERROR REPORT"));
        await this.click(TopNavBarLocator.buttonNextSectionLog);
        await this.click(TopNavBarLocator.buttonBackSectionLog);
        await this.click(TopNavBarLocator.buttonSyncOrCloseLog("Close Log"));
    }

    async UserSyncUserViaLog(): Promise<void> {
        await this.click(TopNavBarLocator.errorLog);
        await this.click(TopNavBarLocator.buttonSyncOrCloseLog("SYNC USER"));
        await this.click(TopNavBarLocator.popupVerifySyncUser("Yes"));
        await this.wait(10000);
        await this.click(TopNavBarLocator.popSyncComplete);

    }


}