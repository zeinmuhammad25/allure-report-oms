import BaseOmsPage from "../base-oms-page";
import Element from "../../../base/objects/Element";
import SalesRecapScenario from "./salesRecap.scenario";
import SalesRecapLocator from "./salesRecap.locator";

export default class SalesRecapPage extends BaseOmsPage implements SalesRecapScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [];
    }

    async salesRecapTab(tabSection: string): Promise<void> {
        await this.expectVisible(SalesRecapLocator.salesRecapTabSection(tabSection));
        await this.click(SalesRecapLocator.salesRecapTabSection(tabSection));
    }

    //salesOverView

    async clickFilterDate(): Promise<void> {
        await this.expectVisible(SalesRecapLocator.btnDate);
        await this.click(SalesRecapLocator.btnDate);
    }

    async selectMonthAndYear(side: "left" | "right", nav: "prev" | "next"): Promise<void> {
        await this.expectVisible(SalesRecapLocator.selectDateMonthAndYearCalendarNav(side, nav));
        await this.click(SalesRecapLocator.selectDateMonthAndYearCalendarNav(side, nav));
    }

    async datePickerFilterDate(day: string | number, side?: "left" | "right"): Promise<void> {
        const cell = side === "left"
            ? SalesRecapLocator.leftCalendarCell(day)
            : SalesRecapLocator.rightCalendarCell(day);

        await this.expectVisible(cell);
        await this.click(cell);
    }

    async applyDateInFilterDate(): Promise<void> {
        await this.expectVisible(SalesRecapLocator.btnApplyDate);
        await this.click(SalesRecapLocator.btnApplyDate);
    }

    async cancelDateInFilterDate(): Promise<void> {
        await this.expectVisible(SalesRecapLocator.btnCancelDate);
        await this.click(SalesRecapLocator.btnCancelDate);
    }


    async searchTransactionBillNumberSalesOverView(value: string): Promise<void> {
        await this.expectVisible(SalesRecapLocator.filedTransactionBillNumber);
        await this.click(SalesRecapLocator.filedTransactionBillNumber);
        await this.fill(SalesRecapLocator.filedTransactionBillNumber, value);
        await this.click(SalesRecapLocator.escapeKeyboardSalesOverView);
    }

    async searchMemberCustomerSalesOverView(value: string): Promise<void> {
        await this.expectVisible(SalesRecapLocator.filedMemberCustomer);
        await this.click(SalesRecapLocator.filedMemberCustomer);
        await this.fill(SalesRecapLocator.filedMemberCustomer, value);
        await this.click(SalesRecapLocator.escapeKeyboardSalesOverView);
    }

    async searchTableSalesOverView(value: string): Promise<void> {
        await this.expectVisible(SalesRecapLocator.filedTable);
        await this.click(SalesRecapLocator.filedTable);
        await this.fill(SalesRecapLocator.filedTable, value);
        await this.click(SalesRecapLocator.escapeKeyboardSalesOverView);
    }

    async showDropDownVisitPurpose(): Promise<void> {
        await this.expectVisible(SalesRecapLocator.showDropDownVisitPurpose);
        await this.click(SalesRecapLocator.showDropDownVisitPurpose);
    }

    async setVisitPurpose(values: "all" | string | string[], opts?: { close?: boolean }): Promise<void> {
        const shouldClose = opts?.close ?? true;
        if (values === "all") {
            await this.expectVisible(SalesRecapLocator.selectAllVisitPurpose);
            await this.click(SalesRecapLocator.selectAllVisitPurpose);
        } else if (Array.isArray(values)) {
            for (const v of values) {
                const option = SalesRecapLocator.selectVisitPurpose(v);
                await this.expectVisible(option);
                await this.click(option);
            }
        } else {
            const option = SalesRecapLocator.selectVisitPurpose(values);
            await this.expectVisible(option);
            await this.click(option);
        }
        if (shouldClose && (await this.isVisible?.(SalesRecapLocator.closeAfterSet))) {
            await this.click(SalesRecapLocator.closeAfterSet);
        }
        await this.wait(500);
    }

    async showDropDownPaymentMethod(): Promise<void> {
        await this.expectVisible(SalesRecapLocator.showDropDownPaymentMethod);
        await this.click(SalesRecapLocator.showDropDownPaymentMethod);
    }

    async setPaymentMethod(values: "all" | string | string[], opts?: { close?: boolean }): Promise<void> {
        const shouldClose = opts?.close ?? true;
        if (values === "all") {
            await this.expectVisible(SalesRecapLocator.selectAllPaymentMethod);
            await this.click(SalesRecapLocator.selectAllPaymentMethod);
        } else if (Array.isArray(values)) {
            for (const v of values) {
                const option = SalesRecapLocator.selectPaymentMethod(v);
                await this.expectVisible(option);
                await this.click(option);
            }
        } else {
            const option = SalesRecapLocator.selectPaymentMethod(values);
            await this.expectVisible(option);
            await this.click(option);
        }
        if (shouldClose && (await this.isVisible?.(SalesRecapLocator.closeAfterSet))) {
            await this.click(SalesRecapLocator.closeAfterSet);
        }
        await this.wait(500);
    }

    async searchInformation(value: string): Promise<void> {
        await this.expectVisible(SalesRecapLocator.filedAdditionalInfo);
        await this.click(SalesRecapLocator.filedAdditionalInfo);
        await this.fill(SalesRecapLocator.filedAdditionalInfo, value);
        await this.click(SalesRecapLocator.escapeKeyboardSalesOverView);
    }

    async dataValidationSalesOverView(value: string, opts?: { maxProbe?: number }): Promise<number> {
        const baseLocator = SalesRecapLocator.dataValidationSalesOverView(value);
        const maxProbe = opts?.maxProbe ?? 200; // batas aman
        let count = 0;
        for (let i = 1; i <= maxProbe; i++) {
            const indexed = `(${baseLocator})[${i}]`;
            try {
                await this.expectVisible(indexed);
                count++;
            } catch {
                break;
            }
        }
        if (count === 0) {
            console.warn(`⚠️ Data "${value}" tidak ditemukan di SalesOverView list.`);
            return 0;
        }
        console.log(`Data "${value}" ditemukan sebanyak: ${count} row(s).`);
        return count;
    }

    async shortingAscSalesOverView(headerName: "Transaction Number" | "Bill Number" | "Date" | "Regular Member" | "Loyalty Member" | "Customer" |
        "Table" | "Visit Purpose" | "Grand Total" | "Status" | "Payment Method" | "Payment Time" | "Payment By"): Promise<void> {
        await this.expectVisible(SalesRecapLocator.headersSalesOverView(headerName));
        await this.click(SalesRecapLocator.headersSalesOverView(headerName));
    }

    async shortingDescSalesOverView(headerName: "Transaction Number" | "Bill Number" | "Date" | "Regular Member" | "Loyalty Member" | "Customer" |
        "Table" | "Visit Purpose" | "Grand Total" | "Status" | "Payment Method" | "Payment Time" | "Payment By"): Promise<void> {
        await this.expectVisible(SalesRecapLocator.headersSalesOverView(headerName));
        await this.click(SalesRecapLocator.headersSalesOverView(headerName));
        await this.click(SalesRecapLocator.headersSalesOverView(headerName));
    }

    async shortingAscAndDescSalesOverView(headerName: "Transaction Number" | "Bill Number" | "Date" | "Regular Member" | "Loyalty Member" | "Customer" |
        "Table" | "Visit Purpose" | "Grand Total" | "Status" | "Payment Method" | "Payment Time" | "Payment By", value: string): Promise<void> {
        await this.expectVisible(SalesRecapLocator.headersSalesOverView(headerName));
        await this.click(SalesRecapLocator.headersSalesOverView(headerName));
        await this.dataValidationSalesOverView(value);
        await this.click(SalesRecapLocator.headersSalesOverView(headerName));
        await this.dataValidationSalesOverView(value);
    }

    async salesOverViewPagination(type: "First page" | "previous" | "next" | "Last page"): Promise<void> {
        await this.expectVisible(SalesRecapLocator.paginationButtonSalesOverView(type));
        await this.click(SalesRecapLocator.paginationButtonSalesOverView(type));
    }

    async viewDetailSalesOverView(value: string, index: number): Promise<void> {
        await this.expectVisible(SalesRecapLocator.viewDetailSalesOverView(value, index));
        await this.click(SalesRecapLocator.viewDetailSalesOverView(value, index));
    }

    async actionDetailOverView(
        action: "Close" | "Void Sales" | "Edit Remarks" | "Reprint Receipt",
        shouldBeDisabled: boolean
    ): Promise<void> {
        const locator = SalesRecapLocator.actionDetailSalesOverView(action);
        await this.expectVisible(locator);
        if (shouldBeDisabled) {
            await this.expectDisabled(locator);
            console.log(`[CHECK] ${action} -> disabled`);
        } else {
            await this.click(locator);
        }
    }

    //Void Menu

    async btnVoidMenu(index: number, shouldBeDisabled: boolean): Promise<void> {
        const locator = SalesRecapLocator.deleteButtonMenuDetailSalesOverView(index);
        await this.expectVisible(locator);
        if (shouldBeDisabled) {
            await this.expectDisabled(locator);
            console.log(`[CHECK] ${index} -> disabled`);
        } else {
            await this.click(locator);
        }
    }

    async inputQtyMenu(qty: string): Promise<void> {
        await this.expectVisible(SalesRecapLocator.fieldQtyVoidMenuSales);
        await this.click(SalesRecapLocator.fieldQtyVoidMenuSales);
        await this.fill(SalesRecapLocator.fieldQtyVoidMenuSales, qty);
        await this.click(SalesRecapLocator.escapeKeyboardVoidMenuQty);
    }

    async actionVoidMenu(action: "Cancel" | "Apply"): Promise<void> {
        await this.expectVisible(SalesRecapLocator.actionVoidMenuSales(action));
        await this.click(SalesRecapLocator.actionVoidMenuSales(action));
    }

    //Void Sales

    async inputVoidNotes(notes: string): Promise<void> {
        const finalNotes = notes.length > 200 ? notes.slice(0, 200) : notes;
        await this.expectVisible(SalesRecapLocator.voidSalesNotes);
        await this.click(SalesRecapLocator.voidSalesNotes);
        await this.fill(SalesRecapLocator.voidSalesNotes, finalNotes);
        await this.click(SalesRecapLocator.escapeKeyboardVoidSales);
    }

    async selectVoidNotes(notes: string): Promise<void> {
        await this.expectVisible(SalesRecapLocator.voidSalesNotes);
        await this.expectVisible(SalesRecapLocator.voidTablePanel(notes));
        await this.click(SalesRecapLocator.voidTablePanel(notes));
    }

    async paginationVoidSales(arrow: "left" | "right"): Promise<void> {
        await this.expectVisible(SalesRecapLocator.paginationVoidSales(arrow));
        await this.click(SalesRecapLocator.paginationVoidSales(arrow));
    }

    async cancelVoidSales(): Promise<void> {
        await this.expectVisible(SalesRecapLocator.cancelVoidSales);
        await this.click(SalesRecapLocator.cancelVoidSales);
    }

    async applyVoidSales(shouldBeDisabled: boolean): Promise<void> {
        const locator = SalesRecapLocator.ApplyVoidSales;
        await this.expectVisible(locator);
        if (shouldBeDisabled) {
            await this.expectDisabled(locator);
        } else {
            await this.click(locator);
        }
    }

    //EditRemarks

    async inputRemarks(remarks: string): Promise<void> {
        const finalRemarks = remarks.length > 200 ? remarks.slice(0, 200) : remarks;
        await this.expectVisible(SalesRecapLocator.fieldRemarks);
        await this.click(SalesRecapLocator.fieldRemarks);
        await this.fill(SalesRecapLocator.fieldRemarks, finalRemarks);
        await this.click(SalesRecapLocator.escapeKeyboardRemarks);
    }

    async actionRemarks(action: "Cancel" | "Apply"): Promise<void> {
        await this.expectVisible(SalesRecapLocator.actionRemarks(action));
        await this.click(SalesRecapLocator.actionRemarks(action));
    }

    //ReprintReceipt

    async reprintReceiptTab(tab: "Reprint Receipt" | "Resend Receipt"): Promise<void> {
        await this.expectVisible(SalesRecapLocator.receiptTab(tab));
        await this.click(SalesRecapLocator.receiptTab(tab));
    }

    async inputEmailOrWhatsappNumber(emailOrWhatsappNumber: string): Promise<void> {
        await this.expectVisible(SalesRecapLocator.fieldEmailOrWaNumber);
        await this.click(SalesRecapLocator.fieldEmailOrWaNumber);
        await this.fill(SalesRecapLocator.fieldEmailOrWaNumber, emailOrWhatsappNumber);
        await this.click(SalesRecapLocator.escapeKeyboardResendEmail);
    }

    async reprintReceiptAction(action: "Reprint Receipt" | "Send Receipt"): Promise<void> {
        await this.expectVisible(SalesRecapLocator.reprintReceiptAction(action));
        await this.click(SalesRecapLocator.reprintReceiptAction(action));
    }

    async cancelReprintReceiptAction(): Promise<void> {
        await this.expectVisible(SalesRecapLocator.closeReprintReceipt);
        await this.click(SalesRecapLocator.closeReprintReceipt);
    }

    //Online Payment

    async searchTransactionReference(fieldTransactionReference: string): Promise<void> {
        await this.expectVisible(SalesRecapLocator.fieldTransactionReference);
        await this.click(SalesRecapLocator.fieldTransactionReference);
        await this.fill(SalesRecapLocator.fieldTransactionReference, fieldTransactionReference);
        await this.click(SalesRecapLocator.escapeKeyboardOnlinePayment);
    }

    async showDropDownPaymentMethodOnline(): Promise<void> {
        await this.expectVisible(SalesRecapLocator.dropdownOnlinePaymentMethod);
        await this.click(SalesRecapLocator.dropdownOnlinePaymentMethod);
    }

    async setPaymentMethodOnline(values: "all" | string | string[], opts?: { close?: boolean }): Promise<void> {
        const shouldClose = opts?.close ?? true;
        if (values === "all") {
            await this.expectVisible(SalesRecapLocator.selectAllOnlinePaymentMethod);
            await this.click(SalesRecapLocator.selectAllOnlinePaymentMethod);
        } else if (Array.isArray(values)) {
            for (const v of values) {
                const option = SalesRecapLocator.selectOnlinePaymentMethod(v);
                await this.expectVisible(option);
                await this.click(option);
            }
        } else {
            const option = SalesRecapLocator.selectOnlinePaymentMethod(values);
            await this.expectVisible(option);
            await this.click(option);
        }
        if (shouldClose && (await this.isVisible?.(SalesRecapLocator.closeAfterSelect))) {
            await this.click(SalesRecapLocator.closeAfterSelect);
        }
        await this.wait(500);
    }

    async showDropDownStatusOnline(): Promise<void> {
        await this.expectVisible(SalesRecapLocator.dropdownPaymentStatus);
        await this.click(SalesRecapLocator.dropdownPaymentStatus);
    }

    async setStatusOnline(values: "all" | string | string[], opts?: { close?: boolean }): Promise<void> {
        const shouldClose = opts?.close ?? true;
        if (values === "all") {
            await this.expectVisible(SalesRecapLocator.selectAllPaymentStatus);
            await this.click(SalesRecapLocator.selectAllPaymentStatus);
        } else if (Array.isArray(values)) {
            for (const v of values) {
                const option = SalesRecapLocator.selectPaymentStatus(v);
                await this.expectVisible(option);
                await this.click(option);
            }
        } else {
            const option = SalesRecapLocator.selectPaymentStatus(values);
            await this.expectVisible(option);
            await this.click(option);
        }
        if (shouldClose && (await this.isVisible?.(SalesRecapLocator.closeAfterSelect))) {
            await this.click(SalesRecapLocator.closeAfterSelect);
        }
        await this.wait(500);
    }

}