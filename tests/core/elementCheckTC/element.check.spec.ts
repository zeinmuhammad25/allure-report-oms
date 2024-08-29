import {test} from "@playwright/test";
import LoginPage from "../../../src/modules/core/pages/login/login-page";
import PurchaseOrderCreatePage from "../../../src/modules/core/pages/purchaseOrder/create/purchase-order-create-page";
import CurrencyViewPage from "../../../src/modules/core/pages/currency/view/currency-view-page";
import SupplierViewPage from "../../../src/modules/core/pages/supplier/view/supplier-view-page";
import BranchViewPage from "../../../src/modules/core/pages/branch/view/branch-view-page";

test('test-core', async ({page}) => {
    test.setTimeout(100000);
    const loginPage = new LoginPage(page);
    await loginPage.navigateHere();
    await loginPage.performLogin();
    let supplierViewPage = await loginPage.gotoPage(SupplierViewPage);
    // let purchaseOrderCreatePage = await loginPage.gotoPage(PurchaseOrderCreatePage);
    // await purchaseOrderCreatePage.performFieldValidation();
    // let branchViewPage = await purchaseOrderCreatePage.gotoPage(BranchViewPage);
    // let currencyViewPage = await branchViewPage.gotoPage(CurrencyViewPage);
    // let supplierViewPage = await currencyViewPage.gotoPage(SupplierViewPage);

});