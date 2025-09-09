import TerminalIDScenario from "./terminalID/terminalID.scenario";
import TableListScenario from "./tableList/tableList.scenario";
import QuickServiceListScenario from "./tableList/quickServiceList/quickServiceList.scenario";
import OrderScenario from "./tableList/order/order.scenario";
import AddOrderScenario from "./tableList/order/components/addOrder/addOrder.scenario";
import BookOrderScenario from "./tableList/components/bookOrder/bookOrder.scenario";
import SideNavBarScenario from "./components/sideNavBar/sideNavBar.scenario";
import EditOrderScenario from "./tableList/order/components/editOrder/editOrder.scenario";
import SignPinScenario from "./signPin/signPin.scenario";
import SynchronizeDataScenario from "./tools/synchronizeData/synchronizeData.scenario";
import StartDayScenario from "./startDay/startDay.scenario";
import SplitBillScenario from "./tableList/components/splitBill/splitBill.scenario";
import PromotionListScenario from "./tableList/components/promotionList/promotionList.scenario";
import LinkTableScenario from "./tableList/order/components/linkTable/linkTable.scenario";
import MergeTableScenario from "./tableList/order/components/mergeTable/mergeTable.scenario";
import MoveItemScenario from "./tableList/order/components/moveItem/moveItem.scenario";
import DineInScenario from "./tableList/orderingDineIn/dineIn.scenario";
import PaymentPosScenario from "./tableList/payment/paymentPOS.scenario";
import ApplicationSettingScenario from "./tools/applicationSetting/applicationSetting.scenario";
import ToolsScenario from "./tools/tools.scenario";
import TroubleshootScenario from "./tools/troubleshoot/troubleshoot.scenario";
import TopNavBarScenario from "./components/topNavBar/topNavBar.scenario";
import MoveTableScenario from "./tableList/order/components/moveTable/moveTable.scenario";
import AddOrderV2Scenario from "./tableList/order/components/addOrderV2/addOrderV2.scenario";
import EditOrderV2Scenario from "./tableList/order/components/editOrderV2/editOrderV2.scenario";
import PaymentV2Scenario from "./tableList/paymentV2/paymentV2.scenario";
import RegularMemberScenario from "./regularMember/regularMember.scenario";
import RegularMemberDepositScenario from "./regularMemberDeposit/regularMemberDeposit.scenario";

export type OmsPages = {
    synchronizeData: SynchronizeDataScenario
    sideNavBar: SideNavBarScenario
    topNavBar: TopNavBarScenario
    signPin: SignPinScenario
    startDay: StartDayScenario
    bookOrder: BookOrderScenario
    promotionList: PromotionListScenario
    splitBill: SplitBillScenario
    addOrder: AddOrderScenario
    addOrderV2: AddOrderV2Scenario
    editOrder: EditOrderScenario
    editOrderV2: EditOrderV2Scenario
    linkTable: LinkTableScenario
    mergeTable: MergeTableScenario
    moveItem: MoveItemScenario
    moveTable: MoveTableScenario
    order: OrderScenario
    dineIn: DineInScenario
    paymentPos: PaymentPosScenario
    paymentV2: PaymentV2Scenario
    quickServiceList: QuickServiceListScenario
    tableList: TableListScenario
    terminalID: TerminalIDScenario
    applicationSetting: ApplicationSettingScenario
    tools: ToolsScenario
    troubleshoot: TroubleshootScenario
    regularMember: RegularMemberScenario
    regularMemberDeposit: RegularMemberDepositScenario
};