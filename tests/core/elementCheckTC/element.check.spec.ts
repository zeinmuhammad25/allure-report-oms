import {test} from "@playwright/test";
import LoginPage from "../../../src/modules/core/pages/login/login-page";
import PurchaseOrderCreatePage from "../../../src/modules/core/pages/purchaseOrder/create/purchase-order-create-page";
import CurrencyViewPage from "../../../src/modules/core/pages/currency/view/currency-view-page";
import SupplierViewPage from "../../../src/modules/core/pages/supplier/view/supplier-view-page";

test('test-core', async ({page}) => {
    test.setTimeout(100000);
    const loginPage = new LoginPage(page);
    await loginPage.navigateHere();
    await loginPage.performLogin();
    let purchaseOrderCreatePage = await loginPage.gotoPage(PurchaseOrderCreatePage);
    await purchaseOrderCreatePage.performFieldValidation();
    let currencyViewPage = await purchaseOrderCreatePage.gotoPage(CurrencyViewPage);
    let supplierViewPage = await currencyViewPage.gotoPage(SupplierViewPage);

});