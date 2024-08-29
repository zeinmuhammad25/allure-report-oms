import {test} from "@playwright/test";
import LoginPage from "../../../src/modules/core/pages/login/login-page";
import PurchaseOrderCreatePage from "../../../src/modules/core/pages/purchaseOrder/create/purchase-order-create-page";
import CurrencyViewPage from "../../../src/modules/core/pages/currency/view/currency-view-page";
import SupplierViewPage from "../../../src/modules/core/pages/supplier/view/supplier-view-page";
import BranchViewPage from "../../../src/modules/core/pages/branch/view/branch-view-page";
import ProfitLossPage from "../../../src/modules/core/pages/report/profitLoss/profit-loss-page";

test('test-core', async ({page}) => {
    test.setTimeout(100000);
    const loginPage = new LoginPage(page);
    await loginPage.navigateHere();
    await loginPage.performLogin();
    let purchaseOrderCreatePage = await loginPage.gotoPage(PurchaseOrderCreatePage);
    // await purchaseOrderCreatePage.performFieldValidation();
    // let branchViewPage = await purchaseOrderCreatePage.gotoPage(BranchViewPage);
    // let currencyViewPage = await branchViewPage.gotoPage(CurrencyViewPage);
    // let supplierViewPage = await currencyViewPage.gotoPage(SupplierViewPage);

});

test('test-branch', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateHere();
    await loginPage.performLogin();
    let branchViewPage = new BranchViewPage(page);
    await branchViewPage.navigateHere(false);
    const branches = await branchViewPage.getBranchData();

    let profitLossPage = await branchViewPage.gotoPage(ProfitLossPage, false);
    await profitLossPage.validateBranch(branches);
    let purchaseOrderCreatePage = await profitLossPage.gotoPage(PurchaseOrderCreatePage);
    await purchaseOrderCreatePage.validateBranch(branches);

});