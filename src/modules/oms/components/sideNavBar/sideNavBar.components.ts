import BaseOmsPage from "../../base-oms-page";
import SideNavBarScenario from "./sideNavBar.scenario";
import Element from "../../../../base/objects/Element";
import SideNavBarLocator from "./sideNavBar.locator";

export default class SideNavBarComponents extends BaseOmsPage implements SideNavBarScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(SideNavBarLocator.GetLocatorHideNav("/table")),
            Element.ofSelector(SideNavBarLocator.GetLocatorHideNav("/ezo-delivery")),
            Element.ofSelector(SideNavBarLocator.GetLocatorHideNav("/ezo-delivery-booking"))
        ];
    }

    async gotoPageTableList(): Promise<void> {
        throw new Error("Method not implemented");

    }

    async gotoPageEsbOrderDashboard(): Promise<void> {
        throw new Error("Method not implemented");

    }

    async gotoPageEsbOrderDeliveryHistory(): Promise<void> {
        throw new Error("Method not implemented");
    }

    async gotoPagePickupDeliveryDashboard(): Promise<void> {
        throw new Error("Method not implemented");
    }

    async gotoPageSalesRecapitulation(): Promise<void> {
        throw new Error("Method not implemented");
    }

    async gotoPageRegularMember(): Promise<void> {
        throw new Error("Method not implemented");
    }

    async gotoPageRegularMemberDeposit(): Promise<void> {
        throw new Error("Method not implemented");
    }

    async gotoPageTools(): Promise<void> {
        throw new Error("Method not implemented");
    }

    async gotoPageOthers(): Promise<void> {
        throw new Error("Method not implemented");
    }

    async gotoPageRegularMemberWithdrawal(): Promise<void> {
        throw new Error("Method not implemented");
    }

    async gotoPageDayStartEnd(): Promise<void> {
        throw new Error("Method not implemented");
    }

    async gotoPageDayShiftLog(): Promise<void> {
        throw new Error("Method not implemented");
    }

    async gotoPageBranchMenu(): Promise<void> {
        throw new Error("Method not implemented");
    }

    async gotoPageStation(): Promise<void> {
        throw new Error("Method not implemented");
    }

}