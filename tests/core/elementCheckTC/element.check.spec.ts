import {test} from "@playwright/test";
import LoginPage from "../../../src/modules/core/pages/login/login-page";
import PurchaseOrderCreatePage from "../../../src/modules/core/pages/purchaseOrder/create/purchase-order-create-page";
import CurrencyViewPage from "../../../src/modules/core/pages/currency/view/currency-view-page";

test('Login', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateHere();
    await loginPage.performLogin();
    let purchaseOrderCreatePage = await loginPage.gotoPage(PurchaseOrderCreatePage);
    await purchaseOrderCreatePage.performFieldValidation();
    let currencyView = await  purchaseOrderCreatePage.gotoPage(CurrencyViewPage);

});