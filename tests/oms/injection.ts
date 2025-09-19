import SideNavBarComponents from "../../src/modules/oms/components/sideNavBar/sideNavBar.components";
import {test as base} from "@playwright/test";
import {OmsPages} from "../../src/modules/oms/oms-pages";
import SynchronizeDataPage from "../../src/modules/oms/tools/synchronizeData/synchronizeData.page";
import TopNavBarComponent from "../../src/modules/oms/components/topNavBar/topNavBar.component";
import SignPinPage from "../../src/modules/oms/signPin/signPin.page";
import StartDayPage from "../../src/modules/oms/startDay/startDay.page";
import BookOrderComponent from "../../src/modules/oms/tableList/components/bookOrder/bookOrder.component";
import PromotionListComponent from "../../src/modules/oms/tableList/components/promotionList/promotionList.component";
import SplitBillComponent from "../../src/modules/oms/tableList/components/splitBill/splitBill.component";
import AddOrderComponent from "../../src/modules/oms/tableList/order/components/addOrder/addOrder.component";
import EditOrderComponents from "../../src/modules/oms/tableList/order/components/editOrder/editOrder.components";
import LinkTableComponent from "../../src/modules/oms/tableList/order/components/linkTable/linkTable.component";
import MergeTableComponent from "../../src/modules/oms/tableList/order/components/mergeTable/mergeTable.component";
import MoveItemComponents from "../../src/modules/oms/tableList/order/components/moveItem/moveItem.components";
import OrderPage from "../../src/modules/oms/tableList/order/order.page";
import DineInPage from "../../src/modules/oms/tableList/orderingDineIn/dineIn.page";
import PaymentPOSPage from "../../src/modules/oms/tableList/payment/paymentPOS.page";
import QuickServiceListPage from "../../src/modules/oms/tableList/quickServiceList/quickServiceList.page";
import TableListPage from "../../src/modules/oms/tableList/tableList.page";
import TerminalIDPage from "../../src/modules/oms/terminalID/terminalID.page";
import ApplicationSettingPage from "../../src/modules/oms/tools/applicationSetting/applicationSetting.page";
import ToolsPage from "../../src/modules/oms/tools/tools.page";
import TroubleshootComponent from "../../src/modules/oms/tools/troubleshoot/troubleshoot.component";
import MoveTableComponent from "../../src/modules/oms/tableList/order/components/moveTable/moveTable.component";
import AddOrderV2Component from "../../src/modules/oms/tableList/order/components/addOrderV2/addOrderV2.component";
import EditOrderV2Components from "../../src/modules/oms/tableList/order/components/editOrderV2/editOrderV2.components";
import PaymentV2Page from "../../src/modules/oms/tableList/paymentV2/paymentV2.page";
import RegularMemberPage from "../../src/modules/oms/regularMember/regularMember.page";
import RegularMemberDepositPage from "../../src/modules/oms/regularMemberDeposit/regularMemberDeposit.page";
import RegularMemberWithdrawalPage from "../../src/modules/oms/regularMemberWithdrawal/regularMemberWithdrawal.page";
import BranchMenuPage from "../../src/modules/oms/branchMenu/branchMenu.page";
import OrderClassicPage from "../../src/modules/oms/tableList/order/orderClassic.page";
import AddOrderClassicComponent
    from "../../src/modules/oms/tableList/order/components/addOrderClassic/addOrderClassic.component";
import BookOrderClassicComponent
    from "../../src/modules/oms/tableList/components/bookOrderClassic/bookOrderClassic.component";
import EditOrderClassicComponents
    from "../../src/modules/oms/tableList/order/components/editOrderClassic/editOrderClassic.components";
import PromotionListClassicComponent
    from "../../src/modules/oms/tableList/components/promotionListClassic/promotionListClassic.component";
import PromotionListTollsPage from "../../src/modules/oms/tools/promotionList/promotionListTolls.page";
import BranchEventListPage from "../../src/modules/oms/tools/branchEventList/branchEventList.page";

export const test = base.extend<OmsPages>({
    synchronizeData: async ({page}, use) => await use(new SynchronizeDataPage(page)),
    sideNavBar: async ({page}, use) => await use(new SideNavBarComponents(page)),
    topNavBar: async ({page}, use) => await use(new TopNavBarComponent(page)),
    signPin: async ({page}, use) => await use(new SignPinPage(page)),
    startDay: async ({page}, use) => await use(new StartDayPage(page)),
    bookOrder: async ({page}, use) => await use(new BookOrderComponent(page)),
    promotionList: async ({page}, use) => await use(new PromotionListComponent(page)),
    splitBill: async ({page}, use) => await use(new SplitBillComponent(page)),
    addOrder: async ({page}, use) => await use(new AddOrderComponent(page)),
    addOrderV2: async ({page}, use) => await use(new AddOrderV2Component(page)),
    editOrder: async ({page}, use) => await use(new EditOrderComponents(page)),
    editOrderV2: async ({page}, use) => await use(new EditOrderV2Components(page)),
    linkTable: async ({page}, use) => await use(new LinkTableComponent(page)),
    mergeTable: async ({page}, use) => await use(new MergeTableComponent(page)),
    moveItem: async ({page}, use) => await use(new MoveItemComponents(page)),
    moveTable: async ({page}, use) => await use(new MoveTableComponent(page)),
    order: async ({page}, use) => await use(new OrderPage(page)),
    dineIn: async ({page}, use) => await use(new DineInPage(page)),
    paymentPos: async ({page}, use) => await use(new PaymentPOSPage(page)),
    paymentV2: async ({page}, use) => await use(new PaymentV2Page(page)),
    quickServiceList: async ({page}, use) => await use(new QuickServiceListPage(page)),
    tableList: async ({page}, use) => await use(new TableListPage(page)),
    terminalID: async ({page}, use) => await use(new TerminalIDPage(page)),
    applicationSetting: async ({page}, use) => await use(new ApplicationSettingPage(page)),
    tools: async ({page}, use) => await use(new ToolsPage(page)),
    troubleshoot: async ({page}, use) => await use(new TroubleshootComponent(page)),
    regularMember: async ({page}, use) => await use(new RegularMemberPage(page)),
    regularMemberDeposit: async ({page}, use) => await use(new RegularMemberDepositPage(page)),
    regularMemberWithdrawal: async ({page}, use) => await use(new RegularMemberWithdrawalPage(page)),
    branchMenu: async ({page}, use) => await use(new BranchMenuPage(page)),
    orderClassic: async ({page}, use) => await use(new OrderClassicPage(page)),
    addOrderClassic: async ({page}, use) => await use(new AddOrderClassicComponent(page)),
    bookOrderClassic: async ({page}, use) => await use(new BookOrderClassicComponent(page)),
    editOrderClassic: async ({page}, use) => await use(new EditOrderClassicComponents(page)),
    promotionListClassic: async ({page}, use) => await use(new PromotionListClassicComponent(page)),
    promotionListTolls: async ({page}, use) => await use(new PromotionListTollsPage(page)),
    branchEventList: async ({page}, use) => await use(new BranchEventListPage(page))
});
