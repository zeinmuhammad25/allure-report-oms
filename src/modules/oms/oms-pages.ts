import TerminalIDScenario from "./terminalID/terminalID.scenario";
import TableListScenario from "./tableList/tableList.scenario";
import QuickServiceListScenario from "./tableList/quickServiceList/quickServiceList.scenario";
import OrderScenario from "./tableList/order/order.scenario";
import AddOrderScenario from "./tableList/order/components/addOrder/addOrder.scenario";
import BookOrderScenario from "./tableList/components/bookOrder/bookOrder.scenario";
import SideNavBarScenario from "./components/sideNavBar/sideNavBar.scenario";
import EditOrderScenario from "./tableList/order/components/editOrder/editOrder.scenario";
import signPinScenario from "./signPin/signPin.scenario";
import SynchronizeDataScenario from "./tools/synchronizeData/synchronizeData.scenario";
import StartDayScenario from "./startDay/startDay.scenario";
import SplitBillScenario from "./tableList/components/splitBill/splitBill.scenario";
import PromotionListScenario from "./tableList/components/promotionList/promotionList.scenario";
import LinkTableScenario from "./tableList/order/components/linkTable/linkTable.scenario";
import MergeTableScenario from "./tableList/order/components/mergeTable/mergeTable.scenario";
import MoveItemScenario from "./tableList/order/components/moveItem/moveItem.scenario";
import dineInScenario from "./tableList/orderingDineIn/dineIn.scenario";
import PaymentPosScenario from "./tableList/payment/paymentPOS.scenario";
import ApplicationSettingScenario from "./tools/applicationSetting/applicationSetting.scenario";
import ToolsScenario from "./tools/tools.scenario";
import TroubleshootScenario from "./tools/troubleshoot/troubleshoot.scenario";
import topNavBarScenario from "./components/topNavBar/topNavBar.scenario";
import MoveTableScenario from "./tableList/order/components/moveTable/moveTable.scenario";

export type OmsPages = {
    synchronizeData: SynchronizeDataScenario
    sideNavBar: SideNavBarScenario
    topNavBar: topNavBarScenario
    signPin: signPinScenario
    startDay: StartDayScenario
    bookOrder: BookOrderScenario
    promotionList: PromotionListScenario
    splitBill: SplitBillScenario
    addOrder: AddOrderScenario
    editOrder: EditOrderScenario
    linkTable: LinkTableScenario
    mergeTable: MergeTableScenario
    moveItem: MoveItemScenario
    moveTable: MoveTableScenario
    order: OrderScenario
    dineIn: dineInScenario
    paymentPos: PaymentPosScenario
    quickServiceList: QuickServiceListScenario
    tableList: TableListScenario
    terminalID: TerminalIDScenario
    applicationSetting: ApplicationSettingScenario
    tools: ToolsScenario
    troubleshoot: TroubleshootScenario
};
