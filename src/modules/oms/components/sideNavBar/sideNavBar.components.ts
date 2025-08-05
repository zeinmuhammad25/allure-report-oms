import BaseOmsPage from "../../base-oms-page";
import SideNavBarScenario from "./sideNavBar.scenario";
import Element from "../../../../base/objects/Element";
import SideNavBarLocator from "./sideNavBar.locator";

export default class SideNavBarComponents extends BaseOmsPage implements SideNavBarScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(SideNavBarLocator.getSideNavBarButtons("/table")),
            Element.ofSelector(SideNavBarLocator.getSideNavBarButtons("/ezo-delivery")),
            Element.ofSelector(SideNavBarLocator.getSideNavBarButtons("/ezo-delivery-booking"))
        ];
    }

    async gotoPageTableList(): Promise<void> {
        await this.expectVisible(SideNavBarLocator.getSideNavBarButtons("/table"));
        await this.click(SideNavBarLocator.getSideNavBarButtons("/table"));
        await this.waitForResponse("/table");
    }

    async gotoPageEsbOrderDashboard(): Promise<void> {
        await this.expectVisible(SideNavBarLocator.getSideNavBarButtons("/ezo-delivery"));
        await this.click(SideNavBarLocator.getSideNavBarButtons("/ezo-delivery"));
        await this.waitForResponse("/ezo-delivery-pos");

    }

    async gotoPageEsbOrderDeliveryHistory(): Promise<void> {
        await this.expectVisible(SideNavBarLocator.getSideNavBarButtons("/ezo-delivery-booking"));
        await this.click(SideNavBarLocator.getSideNavBarButtons("/ezo-delivery-booking"));
        await this.waitForResponse("/ezo-delivery-pos");
    }

    async gotoPagePickupDeliveryDashboard(): Promise<void> {
        await this.expectVisible(SideNavBarLocator.getSideNavBarButtons("/pickup-delivery-dashboard"));
        await this.click(SideNavBarLocator.getSideNavBarButtons("/pickup-delivery-dashboard"));
        await this.waitForResponse("/ezo-delivery-pos");
    }

    async gotoPageSalesRecapitulation(): Promise<void> {
        await this.expectVisible(SideNavBarLocator.getSideNavBarButtons("/sales"));
        await this.click(SideNavBarLocator.getSideNavBarButtons("/sales"));
        await this.waitForResponse("/sales");
    }

    async gotoPageRegularMember(): Promise<void> {
        await this.expectVisible(SideNavBarLocator.getSideNavBarButtons("/member"));
        await this.click(SideNavBarLocator.getSideNavBarButtons("/member"));
        await this.waitForResponse("/member");
    }

    async gotoPageRegularMemberDeposit(): Promise<void> {
        await this.expectVisible(SideNavBarLocator.getSideNavBarButtons("/member-deposit"));
        await this.click(SideNavBarLocator.getSideNavBarButtons("/member-deposit"));
        await this.waitForResponse("/deposit");
    }

    async gotoPageTools(): Promise<void> {
        await this.expectVisible(SideNavBarLocator.getSideNavBarButtons("/tools"));
        await this.click(SideNavBarLocator.getSideNavBarButtons("/tools"));
        await this.expectTextVisible("Troubleshoot", true);
        await this.expectTextVisible("Application Setting", true);
        await this.expectTextVisible("Synchronize Data", true);
    }

    async gotoPageRegularMemberWithdrawal(): Promise<void> {
        await this.expectVisible(SideNavBarLocator.sideNavBarOthersButton);
        await this.click(SideNavBarLocator.sideNavBarOthersButton);
        await this.expectVisible(SideNavBarLocator.menuSectionOther("Regular Member Withdrawal"));
        await this.click(SideNavBarLocator.menuSectionOther("Regular Member Withdrawal"));
        await this.waitForResponse("/withdrawal");
    }

    async gotoPageDayStartEnd(): Promise<void> {
        await this.expectVisible(SideNavBarLocator.sideNavBarOthersButton);
        await this.click(SideNavBarLocator.sideNavBarOthersButton);
        await this.expectVisible(SideNavBarLocator.menuSectionOther("Day Start / End"));
        await this.click(SideNavBarLocator.menuSectionOther("Day Start / End"));
        await this.waitForResponse("/current");
    }

    async gotoPageDayShiftLog(): Promise<void> {
        await this.expectVisible(SideNavBarLocator.sideNavBarOthersButton);
        await this.click(SideNavBarLocator.sideNavBarOthersButton);
        await this.expectVisible(SideNavBarLocator.menuSectionOther("Shift Log"));
        await this.click(SideNavBarLocator.menuSectionOther("Shift Log"));
        await this.waitForResponse("/shift");
    }

    async gotoPageBranchMenu(): Promise<void> {
        await this.expectVisible(SideNavBarLocator.sideNavBarOthersButton);
        await this.click(SideNavBarLocator.sideNavBarOthersButton);
        await this.expectVisible(SideNavBarLocator.menuSectionOther("Branch Menu"));
        await this.click(SideNavBarLocator.menuSectionOther("Branch Menu"));
        await this.waitForResponse("branch-menu");
    }

    async gotoPageStation(): Promise<void> {
        await this.expectVisible(SideNavBarLocator.sideNavBarOthersButton);
        await this.click(SideNavBarLocator.sideNavBarOthersButton);
        await this.expectVisible(SideNavBarLocator.menuSectionOther("Station"));
        await this.click(SideNavBarLocator.menuSectionOther("Station"));
        await this.expectTextVisible("Station Management", true);
    }

    async selectStation(stationName: string): Promise<void> {
        await this.expectVisible(SideNavBarLocator.toolsMenu("Application Setting"));
        await this.click(SideNavBarLocator.toolsMenu("Application Setting"));
        await this.expectVisible(SideNavBarLocator.dropDownStation);
        await this.click(SideNavBarLocator.dropDownStation);
        await this.expectVisible(SideNavBarLocator.stationName(stationName));
        await this.click(SideNavBarLocator.stationName(stationName));
        await this.expectVisible(SideNavBarLocator.textButton("Save"));
        await this.click(SideNavBarLocator.textButton("Save"));
        await this.expectVisible(SideNavBarLocator.textButton("Ok"));
        await this.click(SideNavBarLocator.textButton("Ok"));
    }

}