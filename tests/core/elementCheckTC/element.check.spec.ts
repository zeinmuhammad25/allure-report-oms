import {test} from "@playwright/test";
import LoginPage from "../../../src/modules/core/login/login-page";
import PurchaseOrderCreatePage from "../../../src/modules/core/purchaseOrder/create/purchase-order-create-page";

test('Login', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateHere();
    await loginPage.performLogin();
    let purchaseOrderCreatePage = await loginPage.gotoPage(PurchaseOrderCreatePage);
    await purchaseOrderCreatePage.performFieldValidation();
});