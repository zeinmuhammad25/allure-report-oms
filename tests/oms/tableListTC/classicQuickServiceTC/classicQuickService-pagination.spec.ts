import {test} from "../../injection";
import MenuList from "../../../../src/modules/oms/objects/menuList";
import QuickServiceListScenario from "../../../../src/modules/oms/tableList/quickServiceList/quickServiceList.scenario";
import {safeTest} from "../../../../src/base/utils/safeTest";
import BookOrderClassicScenario
    from "../../../../src/modules/oms/tableList/components/bookOrderClassic/bookOrderClassic.scenario";

test.setTimeout(600000);
test.describe.serial("Quick Service Classic Pagination Order", () => {
    const tag = "@smokeTest @oms @quickService @addOrder ";

    const makeOrder = async (
        salesMode: "AT EXCLUSIVE" | "AT INCLUSIVE", bookOrderClassic: BookOrderClassicScenario, quickServiceList: QuickServiceListScenario) => {
        await bookOrderClassic.setPax(2);
        await bookOrderClassic.selectSalesMode(salesMode);
        await bookOrderClassic.applyQuickService();
        await bookOrderClassic.skipCustomerPhoneNumber();
    };

    let featuresActivated = false;
    test.beforeEach(async ({terminalID, signPin,orderClassic}) => {
        const testWithAuthentication = [
            "[TCAT_OMS_CQSTM_0023] Validate user can click arrow up and down on menu list if no item on list"
        ];

        if (testWithAuthentication.includes(test.info().title)) {
            await terminalID.goHere();
            await terminalID.performTerminalID();
            await signPin.inputPinByTouch("22");
            await signPin.validateShowStarCashClassic("20.000");
            await signPin.storeAuthState();
            if (!featuresActivated) {
                await orderClassic.activatePosFilterAccess()
                await orderClassic.activateOrderingV2();
                await orderClassic.activatePaymentV2();
                featuresActivated = true;
            }
        }
        await orderClassic.goHere();

    });

    test.afterEach(async ({tableList}) => {
        await Promise.all([
            tableList.cancelAllQuickServices()
        ]);
    });


    test("[TCAT_OMS_CQSTM_0023] Validate user can click arrow up and down on menu list if no item on list",
        {tag: tag + "@positive"}, async ({bookOrderClassic, orderClassic, quickServiceList, sideNavBar}, testInfo) => {
            await safeTest(async ({bookOrderClassic, orderClassic, quickServiceList}) => {
                await makeOrder("AT INCLUSIVE", bookOrderClassic, quickServiceList);
                await orderClassic.paginationOrder("down");
                await orderClassic.paginationOrder("up");

            }, {bookOrderClassic, orderClassic, quickServiceList, sideNavBar}, testInfo);
        });

    test("[TCAT_OMS_CQSTM_0024] Validate user can click arrow up and down on menu list item <=4",
        {tag: tag + "@positive"}, async ({bookOrderClassic, orderClassic, quickServiceList, sideNavBar}, testInfo) => {
            await safeTest(async ({bookOrderClassic, orderClassic, quickServiceList}) => {
                await makeOrder("AT INCLUSIVE", bookOrderClassic, quickServiceList);
                await orderClassic.selectCategoryMenu(MenuList.atCategory.name);
                await orderClassic.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
                await orderClassic.selectMenu(MenuList.menus.atMenuBiasaGoreng.name, 1);
                await orderClassic.selectMenu(MenuList.menus.atMenuBiasaRebus.name, 1);
                await orderClassic.selectMenu(MenuList.menus.atMenuBiasaBakar.name, 1);
                await orderClassic.paginationOrder("down");
                await orderClassic.paginationOrder("up");

            }, {bookOrderClassic, orderClassic, quickServiceList, sideNavBar}, testInfo);
        });

    test("[TCAT_OMS_CQSTM_0025] User can click arrow down and menu direct to hide menu",
        {tag: tag + "@positive"}, async ({bookOrderClassic, orderClassic, quickServiceList, addOrderV2, sideNavBar}, testInfo) => {
            await safeTest(async ({bookOrderClassic, orderClassic, quickServiceList}) => {
                await makeOrder("AT INCLUSIVE", bookOrderClassic, quickServiceList);
                await new Promise(resolve => setTimeout(resolve, 3000));
                await orderClassic.selectCategoryMenu(MenuList.atCategory.name);
                await orderClassic.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
                await orderClassic.selectMenu(MenuList.menus.atMenuBiasaGoreng.name, 1);
                await orderClassic.selectMenu(MenuList.menus.atMenuBiasaRebus.name, 1);
                await orderClassic.selectMenu(MenuList.menus.atMenuBiasaBakar.name, 1);

                await orderClassic.selectCategoryMenu(MenuList.whisky.name);
                await orderClassic.selectCategoryDetailMenu(MenuList.whisky.minumanWhisky.name);
                await orderClassic.selectMenu(MenuList.menus.bataviaBlended700ml.name, 1);
                await orderClassic.selectMenu(MenuList.menus.gilbeysWhisky350ml.name, 1);
                await orderClassic.selectMenu(MenuList.menus.teacherWhisky700ml.name, 1);

                await orderClassic.paginationOrder("down", 2);

            }, {bookOrderClassic, orderClassic, quickServiceList, addOrderV2, sideNavBar}, testInfo);
        });


});