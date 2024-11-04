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

    async userViewProfile(): Promise<void> {
        await this.expectVisible(TopNavBarLocator.profileButton);
        await this.click(TopNavBarLocator.profileButton);

    }

    async userSignOut(): Promise<void> {
        await this.expectVisible(TopNavBarLocator.signOutButton);
        await this.click(TopNavBarLocator.signOutButton);
    }

    async userViewProfileAndSignOut(): Promise<void> {
        await this.expectVisible(TopNavBarLocator.profileButton);
        await this.click(TopNavBarLocator.profileButton);
        await this.click(TopNavBarLocator.signOutButton);
    }

    async userViewEsbOrderReportFullService(): Promise<void> {
        await this.click(TopNavBarLocator.errorLog);
        await this.click(TopNavBarLocator.buttonSelectLog("ESB ORDER"));
        await this.click(TopNavBarLocator.buttonSelectEsbOrderReport("Full Service"));
        await this.click(TopNavBarLocator.buttonSyncOrCloseLog("Close Log"));
    }

    async userViewEsbOrderReportQuickService(): Promise<void> {
        await this.click(TopNavBarLocator.errorLog);
        await this.click(TopNavBarLocator.buttonSelectLog("ESB ORDER"));
        await this.click(TopNavBarLocator.buttonSelectEsbOrderReport("Quick Service"));
        await this.click(TopNavBarLocator.buttonSyncOrCloseLog("Close Log"));
    }

    async userViewErrorReport(): Promise<void> {
        await this.click(TopNavBarLocator.errorLog);
        await this.click(TopNavBarLocator.buttonSelectLog("ERROR REPORT"));
        await this.click(TopNavBarLocator.buttonSyncOrCloseLog("Close Log"));
    }

    async userViewEsbOrderReportFullServiceIFManyData(): Promise<void> {
        await this.click(TopNavBarLocator.errorLog);
        await this.click(TopNavBarLocator.buttonSelectLog("ESB ORDER"));
        await this.click(TopNavBarLocator.buttonSelectEsbOrderReport("Full Service"));
        await this.click(TopNavBarLocator.buttonNextSectionLog);
        await this.click(TopNavBarLocator.buttonBackSectionLog);
        await this.click(TopNavBarLocator.buttonSyncOrCloseLog("Close Log"));
    }

    async userViewEsbOrderReportQuickServiceIFManyData(): Promise<void> {
        await this.click(TopNavBarLocator.errorLog);
        await this.click(TopNavBarLocator.buttonSelectLog("ESB ORDER"));
        await this.click(TopNavBarLocator.buttonSelectEsbOrderReport("Quick Service"));
        await this.click(TopNavBarLocator.buttonNextSectionLog);
        await this.click(TopNavBarLocator.buttonBackSectionLog);
        await this.click(TopNavBarLocator.buttonSyncOrCloseLog("Close Log"));
    }

    async userViewErrorReportIFManyData(): Promise<void> {
        await this.click(TopNavBarLocator.errorLog);
        await this.click(TopNavBarLocator.buttonSelectLog("ERROR REPORT"));
        await this.click(TopNavBarLocator.buttonNextSectionLog);
        await this.click(TopNavBarLocator.buttonBackSectionLog);
        await this.click(TopNavBarLocator.buttonSyncOrCloseLog("Close Log"));
    }

    async userSyncUserViaLog(): Promise<void> {
        await this.click(TopNavBarLocator.errorLog);
        await this.click(TopNavBarLocator.buttonSyncOrCloseLog("SYNC USER"));
        await this.click(TopNavBarLocator.popupVerifySyncUser("Yes"));
        await this.wait(10000);
        await this.click(TopNavBarLocator.popSyncComplete);

    }


}