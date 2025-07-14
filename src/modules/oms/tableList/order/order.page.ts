import Element from "../../../../base/objects/Element";
import BaseOmsPage from "../../base-oms-page";
import OrderScenario from "./order.scenario";
import OrderLocator from "./order.locator";

export default class OrderPage extends BaseOmsPage implements OrderScenario {

    pageUrl: () => string;

    shouldHave(): Element[] {
        return [];
    }

    async inputPhoneNumber(phoneNumber: string): Promise<void> {
        await this.expectVisible(OrderLocator.memberPhoneButton);
        await this.click(OrderLocator.memberPhoneButton);
        await this.expectVisible(OrderLocator.memberPhoneField);
        await this.click(OrderLocator.memberPhoneField);
        await this.fill(OrderLocator.memberPhoneField, phoneNumber);
        await this.click(OrderLocator.memberPhoneApplyButton);
    }

    async addAdditionalInfo(additionalInfo: string): Promise<void> {
        await this.expectVisible(OrderLocator.additionalInfoField);
        await this.click(OrderLocator.additionalInfoField);
        await this.fill(OrderLocator.additionalInfoField, additionalInfo);
        await this.click(OrderLocator.orderPanel);
    }

    async editTable(qty: number, timeOut: number): Promise<void> {
        await this.expectVisible(OrderLocator.editTableButton);
        await this.click(OrderLocator.editTableButton);
        await this.expectVisible(OrderLocator.editTablePaxField);
        await this.click(OrderLocator.editTablePaxField);
        await this.fill(OrderLocator.editTablePaxField, qty.toString());
        await this.expectVisible(OrderLocator.editTableTimeOutField);
        await this.click(OrderLocator.editTableTimeOutField);
        await this.fill(OrderLocator.editTableTimeOutField, timeOut.toString());
        await this.click(OrderLocator.editTableButton);
    }

    async addPromotion(): Promise<void> {
        await this.wait(1000);
        await this.expectVisible(OrderLocator.addPromotionButton);
        await this.click(OrderLocator.addPromotionButton);
    }

    async selectCategoryMenu(categoryName: string): Promise<void> {
        await this.expectVisible(OrderLocator.categoryButton(categoryName));
        await this.click(OrderLocator.categoryButton(categoryName));
    }

    async selectCategoryDetailMenu(categoryDetailName: string): Promise<void> {
        await this.expectVisible(OrderLocator.categoryButton(categoryDetailName));
        await this.click(OrderLocator.categoryButton(categoryDetailName));
    }

    async selectMenu(menuName: string, qty?: number): Promise<void> {
        await this.expectVisible(OrderLocator.menuButton(menuName));
        if (typeof qty === "number") {
            for (let i = 0; i < qty; i++) {
                await this.click(OrderLocator.menuButton(menuName));
                await this.wait(200);
            }
        } else {
            await this.click(OrderLocator.menuButton(menuName));
        }
    }

    async deleteMenu(menuName: string): Promise<void> {
        await this.expectVisible(OrderLocator.deleteMenuButton(menuName));
        await this.click(OrderLocator.deleteMenuButton(menuName));
    }

    async saveOrder(): Promise<void> {
        await this.expectVisible(OrderLocator.saveOrderButton);
        await this.click(OrderLocator.saveOrderButton);
        await this.waitForResponse("/order");
    }

    async gotoPayment(): Promise<void> {
        await this.expectVisible(OrderLocator.paymentButton);
        await this.click(OrderLocator.paymentButton);
        await this.waitForResponse("/get-payment-method");
        await this.wait(1000);
    }

    async printBill(): Promise<void> {
        await this.expectVisible(OrderLocator.printBillButton);
        await this.click(OrderLocator.printBillButton);
        await this.waitForResponse("/order/print-bill");
    }

    async printNowPrintingSetting(): Promise<void> {
        await this.expectVisible(OrderLocator.printBillButton);
        await this.click(OrderLocator.printBillButton);
        await this.expectVisible(OrderLocator.printBillNowButton);
        await this.click(OrderLocator.printBillNowButton);
        await this.waitForResponse("/order/print-bill");
        await this.expectVisible(OrderLocator.closePrintingSetting);
        await this.click(OrderLocator.closePrintingSetting);
    }

    async printSplitPerPaxPrintingSetting(pax: number): Promise<void> {
        await this.expectVisible(OrderLocator.printBillButton);
        await this.click(OrderLocator.printBillButton);
        await this.expectVisible(OrderLocator.printBillSplitPerPaxButton);
        await this.click(OrderLocator.printBillSplitPerPaxButton);
        await this.expectVisible(OrderLocator.inputNumberOfPax);
        await this.fill(OrderLocator.inputNumberOfPax, pax.toString());
        await this.expectVisible(OrderLocator.printSplitPerPax);
        await this.click(OrderLocator.printSplitPerPax);
        await this.waitForResponse("/order/print-bill");
    }

    async cancelPrintSplitPerPaxPrintingSetting(pax: number): Promise<void> {
        await this.expectVisible(OrderLocator.printBillButton);
        await this.click(OrderLocator.printBillButton);
        await this.expectVisible(OrderLocator.printBillSplitPerPaxButton);
        await this.click(OrderLocator.printBillSplitPerPaxButton);
        await this.expectVisible(OrderLocator.inputNumberOfPax);
        await this.fill(OrderLocator.inputNumberOfPax, pax.toString());
        await this.expectVisible(OrderLocator.cancelSplitPerPax);
        await this.click(OrderLocator.cancelSplitPerPax);
    }

    async splitBill(): Promise<void> {
        await this.expectVisible(OrderLocator.splitBillButton);
        await this.click(OrderLocator.splitBillButton);
        await this.waitForResponse("/order/get-sales-head");
    }

    async disabledSplitBill(): Promise<void> {
        await this.expectVisible(OrderLocator.splitBillDisabledButton);
    }

    async expectDisabledMoveItem(): Promise<void> {
        const locatorMoveTable = await this.isVisible(OrderLocator.moveToTableDisabledButton)
            ? OrderLocator.moveToTableDisabledButton
            : OrderLocator.moveTableDisabledButton;
        await this.expectVisible(locatorMoveTable);
    }

    async printChecker(): Promise<void> {
        await this.expectVisible(OrderLocator.printCheckerButton);
        await this.click(OrderLocator.printCheckerButton);
        await this.waitForResponse("/order/print-all-checker");
    }

    async mergeTable(): Promise<void> {
        await this.expectVisible(OrderLocator.mergeTableButton);
        await this.click(OrderLocator.mergeTableButton);
    }

    async disabledMergeTable(): Promise<void> {
        await this.expectVisible(OrderLocator.mergeTableDisabledButton);
    }

    async moveTable(): Promise<void> {
        await this.wait(800);
        const locatorMoveTable = await this.isVisible(OrderLocator.moveTableButton)
            ? OrderLocator.moveTableButton
            : OrderLocator.moveToTableButton;

        await this.expectVisible(locatorMoveTable);
        await this.click(locatorMoveTable);
    }

    async expectDisabledMoveTable(): Promise<void> {
        const locatorMoveTable = await this.isVisible(OrderLocator.moveToTableDisabledButton)
            ? OrderLocator.moveToTableDisabledButton
            : OrderLocator.moveTableDisabledButton;
        await this.expectVisible(locatorMoveTable);
    }

    async moveItem(): Promise<void> {
        await this.expectVisible(OrderLocator.moveItemButton);
        await this.click(OrderLocator.moveItemButton);
    }

    async linkTable(): Promise<void> {
        await this.expectVisible(OrderLocator.linkTableButton);
        await this.click(OrderLocator.linkTableButton);
    }

    async disabledLinkTable(): Promise<void> {
        await this.expectVisible(OrderLocator.linkTableDisabledButton);
    }

    async cancelTable(notes: string): Promise<void> {
        await this.wait(300);
        const cancelButtonLocator = await this.isVisible(OrderLocator.cancelTableButton)
            ? OrderLocator.cancelTableButton : OrderLocator.cancelOrderButton;
        await this.expectVisible(cancelButtonLocator);
        await this.click(cancelButtonLocator);
        await this.expectVisible(OrderLocator.cancelReasonTextArea);
        await this.click(OrderLocator.cancelReasonTextArea);
        await this.fill(OrderLocator.cancelReasonTextArea, notes);
        await this.click(OrderLocator.popUpCancelTable);
        await this.click(OrderLocator.cancelReasonApplyButton);
    }

    async disabledCancelTable(): Promise<void> {
        const disableCancelLocator = await this.isVisible(OrderLocator.cancelTableDisabledButton)
            ? OrderLocator.cancelTableDisabledButton : OrderLocator.cancelOrderDisabledButton;
        await this.expectVisible(disableCancelLocator);
    }

    async cancelTableApplyDisabled(): Promise<void> {
        await this.wait(300);
        const cancelButtonLocator = await this.isVisible(OrderLocator.cancelTableButton)
            ? OrderLocator.cancelTableButton : OrderLocator.cancelOrderButton;
        await this.expectVisible(cancelButtonLocator);
        await this.click(cancelButtonLocator);
        await this.expectVisible(OrderLocator.popUpCancelTable);
        await this.expectVisible(OrderLocator.cancelReasonDisabledApplyButton);
    }

    async cancelTableSelectNotes(notes: string): Promise<void> {
        await this.wait(300);
        const cancelButtonLocator = await this.isVisible(OrderLocator.cancelTableButton)
            ? OrderLocator.cancelTableButton : OrderLocator.cancelOrderButton;
        await this.expectVisible(cancelButtonLocator);
        await this.click(cancelButtonLocator);
        await this.expectVisible(OrderLocator.cancelReasonTextArea);
        await this.click(OrderLocator.cancelTablePanel(notes));
        await this.click(OrderLocator.cancelReasonApplyButton);
    }

    async UndoCancelTable(notes: string): Promise<void> {
        await this.wait(300);
        const cancelButtonLocator = await this.isVisible(OrderLocator.cancelTableButton)
            ? OrderLocator.cancelTableButton : OrderLocator.cancelOrderButton;
        await this.expectVisible(cancelButtonLocator);
        await this.click(cancelButtonLocator);
        await this.expectVisible(OrderLocator.cancelReasonTextArea);
        await this.click(OrderLocator.cancelTablePanel(notes));
        await this.click(OrderLocator.cancelReasonCancelButton);
    }

    async clickMenuDetail(menu: string): Promise<void> {
        await this.expectVisible(OrderLocator.clickMenu(menu));
        await this.click(OrderLocator.clickMenu(menu));
    }

    async cancelMenuAfterSave(notes: string): Promise<void> {
        await this.expectVisible(OrderLocator.cancelMenuAfterSave);
        await this.click(OrderLocator.cancelMenuAfterSave);
        await this.fill(OrderLocator.cancelMenuAfterSave, notes);
    }

    async confirmationCloseTable(action: "Yes" | "No"): Promise<void> {
        await this.expectVisible(OrderLocator.buttonConfirmCloseTable(action));
        await this.click(OrderLocator.buttonConfirmCloseTable(action));
        await this.waitForResponse("/table");
    }

    async validateMenuNotVisible(menu: string): Promise<void> {
        await this.expectInvisible(OrderLocator.clickMenu(menu));
        console.warn(`Validation passed: Menu "${menu}" is now invisible.`);
    }

    async validateMenuVisible(menu: string): Promise<void> {
        await this.expectVisible(OrderLocator.clickMenu(menu));
        console.warn(`Validation passed: Menu "${menu}" is visible.`);
    }

    async holdMenu(menuName: string): Promise<void> {
        await this.expectVisible(OrderLocator.holdMenuButton(menuName));
        await this.click(OrderLocator.holdMenuButton(menuName));
    }

    async fireMenu(menuName: string): Promise<void> {
        await this.expectVisible(OrderLocator.fireMenuButton(menuName));
        await this.click(OrderLocator.fireMenuButton(menuName));
    }

    async holdAllMenu(): Promise<void> {
        await this.expectVisible(OrderLocator.holdAllMenuButton);
        await this.click(OrderLocator.holdAllMenuButton);
    }

    async fireAllMenu(): Promise<void> {
        await this.expectVisible(OrderLocator.fireAllMenuButton);
        await this.click(OrderLocator.fireAllMenuButton);
    }

    async cancelMenuButtonIsNotVisible(menuName: string): Promise<void> {
        await this.expectInvisible(OrderLocator.deleteMenuButton(menuName));
        console.warn(`Validation passed: Button Cancel Not Displayed.`);
    }

    async tableInfo(): Promise<void> {
        await this.expectVisible(OrderLocator.tableInfo);
        await this.click(OrderLocator.tableInfo);
    }

    async detailInfoHoldTable(tableName: string): Promise<void> {
        await this.expectVisible(OrderLocator.holdMenuDetailInTable(tableName));
        await this.click(OrderLocator.holdMenuDetailInTable(tableName));
    }

    async validateMenuInHoldTable(tableName: string, menuName: string): Promise<void> {
        await this.expectVisible(OrderLocator.menuInHoldTable(tableName, menuName));
        console.warn(`Validation passed: ${menuName} displayed in Table info`);
        await this.click(OrderLocator.buttonCloseHoldTable);
    }

    async expectDisabledPayment(): Promise<void> {
        const locatorPayment = await this.isVisible(OrderLocator.paymentDisableButton)
            ? OrderLocator.paymentDisableButton
            : OrderLocator.paymentDisableButton;
        await this.expectVisible(locatorPayment);
    }

    async holdMenuButtonNotDisplayed(menuName: string): Promise<void> {
        await this.expectInvisible(OrderLocator.holdMenuButton(menuName));
        console.warn(`Validation passed: Button holdMenu in "${menuName}" Not Displayed.`);
    }

    async holdAllMenuButtonNotDisplayed(): Promise<void> {
        await this.expectInvisible(OrderLocator.holdAllMenuButton);
        console.warn(`Validation passed: Button holdAllMenu Not Displayed.`);
    }

    async fireMenuButtonNotDisplayed(menuName: string): Promise<void> {
        await this.expectInvisible(OrderLocator.fireMenuButton(menuName));
        console.warn(`Validation passed: Button fireMenu in "${menuName}" Not Displayed.`);
    }

    async fireAllMenuButtonNotDisplayed(): Promise<void> {
        await this.expectInvisible(OrderLocator.fireAllMenuButton);
        console.warn(`Validation passed: Button fireAllMenu Not Displayed.`);
    }

    async activateKitchenFireManagement(): Promise<void> {
        const query: string = "UPDATE ms_setting SET value1 = 1 WHERE key1 = 'POS' AND key2 = 'Kitchen Fire Management';";
        await this.sqlExecute(this.configs.get.dbConfig, query);
    }

    async notActivateKitchenFireManagement(): Promise<void> {
        const query: string = "UPDATE ms_setting SET value1 = 0 WHERE key1 = 'POS' AND key2 = 'Kitchen Fire Management';";
        await this.sqlExecute(this.configs.get.dbConfig, query);
    }

    async activatePosFilterAccess(): Promise<void> {
        const query: string = "UPDATE lk_posfilteraccess set subNodes = '/payment,/take-away/payment,/take-away-classic/payment,/payment/v2,/take-away/payment/v2,/take-away-classic/payment/v2' where posAccessID = 'A' && filterAccessID = 'A9';";
        await this.sqlExecute(this.configs.get.dbConfig, query);
    }

    async activateOrderingV2(): Promise<void> {
        const query: string = "INSERT INTO ms_setting (key1, key2, value1, value2)  VALUES ('POS', 'Show New Ordering Layout Version', \"true\", '');";
        await this.sqlExecute(this.configs.get.dbConfig, query);
    }

    async activatePaymentV2(): Promise<void> {
        const query: string = "INSERT INTO ms_setting (key1, key2, value1, value2) VALUES ('POS', 'Show New Payment Version', \"true\", '');";
        await this.sqlExecute(this.configs.get.dbConfig, query);
    }

    async expectVisibleCustomerName(name: string): Promise<void> {
        await this.wait(800);
        await this.expectTextVisible(name);
    }

    async validateQtyOrderWithMenu(menuNames: string | string[]): Promise<void> {
        let totalQtyFromMenus = 0;
        const menuNameArray = Array.isArray(menuNames) ? menuNames : [menuNames];

        for (const menuName of menuNameArray) {
            const qtyText = await this.getTextValue(OrderLocator.qtyForMenu(menuName));
            let qtyValue = parseInt(qtyText.trim(), 10);

            if (!isNaN(qtyValue)) {
                totalQtyFromMenus += qtyValue;
            }
        }

        const qtyOrder = await this.getTextValue(OrderLocator.qtyForOrder);
        let qtyOrderValue = parseInt(qtyOrder.split("Total")[1]?.trim() || "0", 10);

        if (isNaN(qtyOrderValue)) {
            throw new Error(`Failed to extract numeric qty from order: ${qtyOrder}`);
        }

        if (qtyOrderValue === totalQtyFromMenus) {
            console.log(`Validation successful! Qty Order (${qtyOrderValue}) matches total qty from menus (${totalQtyFromMenus}).`);
        } else {
            throw new Error(`Validation failed! Qty Order (${qtyOrderValue}) does not match total qty from menus (${totalQtyFromMenus}).`);
        }
    }

    async validatePriceExclusiveWithSubtotal(menuNames: string[], extraPackageNames: string[]): Promise<void> {
        let totalCalculated = 0;

        for (const menuName of menuNames) {
            const locator = OrderLocator.priceMenu(menuName);
            const priceText = await this.getTextValue(locator);
            const price = parseFloat(priceText.split("Total:")
                [1]?.trim().replace(/\./g, "").replace(",", "."));
            if (!isNaN(price)) {
                totalCalculated += price;
            }
        }

        for (const extraPackageName of extraPackageNames) {
            const extraPackageLocator = OrderLocator.priceMenuExtraAndPackage(extraPackageName);
            const extraPackageText = await this.getTextValue(extraPackageLocator);
            const extraPrice = parseFloat(extraPackageText.split("Total:")
                [1]?.trim().replace(/\./g, "").replace(",", "."));
            if (!isNaN(extraPrice)) {
                totalCalculated += extraPrice;
            }
        }

        const subtotalText = await this.getTextValue(OrderLocator.valueSubtotal);
        const subtotal = parseFloat(subtotalText.trim().replace(/\./g, "").replace(",", "."));

        if (totalCalculated === subtotal) {
            console.log(`Total menu price matches the subtotal. Total Menu Price: ${totalCalculated}, Subtotal: ${subtotal}`);
        } else {
            throw new Error(`Price mismatch! Total Menu Price: ${totalCalculated}, Subtotal: ${subtotal}`);
        }
    }


}