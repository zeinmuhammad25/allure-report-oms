import BaseScenario from "../../../../base/base-scenario";

export default interface SideNavBarScenario extends BaseScenario {

    gotoPageTableList(): Promise<void>;

    gotoPageEsbOrderDashboard(): Promise<void>;

    gotoPageEsbOrderDeliveryHistory(): Promise<void>;

    gotoPagePickupDeliveryDashboard(): Promise<void>;

    gotoPageSalesRecapitulation(): Promise<void>;

    gotoPageRegularMember(): Promise<void>;

    gotoPageRegularMemberDeposit(): Promise<void>;

    gotoPageTools(): Promise<void>;

    gotoPageOthers(): Promise<void>;

    gotoPageRegularMemberWithdrawal(): Promise<void>;

    gotoPageDayStartEnd(): Promise<void>;

    gotoPageDayShiftLog(): Promise<void>;

    gotoPageBranchMenu(): Promise<void>;

    gotoPageStation(): Promise<void>;
}