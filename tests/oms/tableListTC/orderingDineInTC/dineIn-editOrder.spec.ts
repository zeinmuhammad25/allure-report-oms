import {test} from "../../injection";
import {safeTest} from "../../../../src/base/utils/safeTest";
import Table from "../../../../src/modules/oms/objects/table";
import BookOrderScenario from "../../../../src/modules/oms/tableList/components/bookOrder/bookOrder.scenario";

test.setTimeout(60000);
test.describe.serial("Transaction Edit Order", () => {
    const tags = "@smokeTest @oms @orderingDineIn @editOrder ";

    test.beforeEach(async ({terminalID, signPin, sideNavBar}) => {
        await terminalID.goHere();
        await terminalID.performTerminalID();
        await signPin.inputPinByTouch("22");
        await signPin.validateShowStarCash("20.000");
        await signPin.storeAuthState();
    });

    test.afterEach(async ({tableList}) => {
        await Promise.all([
            tableList.cancelAllQuickServices(),
            tableList.cancelAllTables()
        ]);
    });

    const makeOrder = async (salesMode: "AT EXCLUSIVE" | "AT INCLUSIVE", bookOrder: BookOrderScenario) => {
        await bookOrder.selectSalesMode(salesMode);
        await bookOrder.bookAndOrder();
        await bookOrder.skipCustomerPhoneNumber();
    };


});