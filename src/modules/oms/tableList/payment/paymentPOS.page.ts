import BaseOmsPage from "../../base-oms-page";
import Element from "../../../../base/objects/Element";
import PaymentPosScenario from "./paymentPOS.scenario";
import {PaymentObject} from "./PaymentObject";
import PaymentPOSLocator from "./paymentPOS.locator";

export default class PaymentPOSPage extends BaseOmsPage implements PaymentPosScenario {
    pageUrl: () => string;
    shouldHave(): Element[] {
        return [
            Element.ofSelector(PaymentPOSLocator.buttonApplyMember)
        ];
    }

    private apiBaseUrl = "http://localhost/fnb-pos-v2/api/web/v1";

    async paymentPinUserAuthorization(Pin: string): Promise<void> {
        await this.expectVisible(PaymentPOSLocator.popUpUserAuthorization);
        await this.expectVisible(PaymentPOSLocator.inputPinOrOtpField);
        await this.click(PaymentPOSLocator.inputPinOrOtpField);
        await this.fill(PaymentPOSLocator.inputPinOrOtpField, Pin);
        await this.click(PaymentPOSLocator.popUpUserAuthorization);
        await this.expectVisible(PaymentPOSLocator.authorizeButton);
        await this.click(PaymentPOSLocator.authorizeButton);
    }

    async paymentType(paymentType: PaymentObject): Promise<void> {
        await this.wait(1000)
        await this.expectVisible(PaymentPOSLocator.getLocatorPaymentType(paymentType));
        await this.click(PaymentPOSLocator.getLocatorPaymentType(paymentType));
    }

    async paymentMethod(paymentMethod: PaymentObject): Promise<void> {
        await this.expectVisible(PaymentPOSLocator.getLocatorPaymentType(paymentMethod));
        await this.click(PaymentPOSLocator.getLocatorPaymentType(paymentMethod));
    }

    async actionPayment(actionPayment: PaymentObject): Promise<void> {
        await this.wait(500);
        await this.expectVisible(PaymentPOSLocator.getLocatorPaymentMethod(actionPayment));
        await this.click(PaymentPOSLocator.getLocatorPaymentMethod(actionPayment));
    }

    async paymentInputAmount(inputAmount: string): Promise<void> {
        await this.expectVisible(PaymentPOSLocator.inputPaymentAmount);
        await this.expectVisible(PaymentPOSLocator.escapeKeyboard);
        await this.fill(PaymentPOSLocator.inputPaymentAmount, inputAmount);
        await this.click(PaymentPOSLocator.escapeKeyboard);
    }

    async selectCashBoard(cashBord: PaymentObject, click: number): Promise<void> {
        await this.expectVisible(PaymentPOSLocator.inputPaymentAmount);
        await this.expectVisible(PaymentPOSLocator.escapeKeyboard);
        await this.click(PaymentPOSLocator.escapeKeyboard);
        for (let i = 0; i < click; i++) {
            await this.click(PaymentPOSLocator.gridSelectCashBord(cashBord));
        }
    }

    async disableApplyPayment(): Promise<void> {
        await this.expectVisible(PaymentPOSLocator.disabledApply);
    }

    async clearAmount(): Promise<void> {
        await this.expectVisible(PaymentPOSLocator.buttonClearCashAmount);
        await this.click(PaymentPOSLocator.buttonClearCashAmount);
    }

    async paymentGetOutstandingAmount(): Promise<void> {
        await this.expectVisible(PaymentPOSLocator.buttonGetOutstandingPayment);
        await this.click(PaymentPOSLocator.buttonGetOutstandingPayment);
    }

    async paymentCashFullAmount(): Promise<void> {
        await this.expectVisible(PaymentPOSLocator.buttonPayCashFullAmount);
        await this.click(PaymentPOSLocator.buttonPayCashFullAmount);
    }

    async inputFieldDebitBCA(inputField: PaymentObject, value: string): Promise<void> {
        await this.expectVisible(PaymentPOSLocator.getLocatorInputPaymentDebit(inputField));
        await this.click(PaymentPOSLocator.getLocatorInputPaymentDebit(inputField));
        await this.fill(PaymentPOSLocator.getLocatorInputPaymentDebit(inputField), value);
        await this.click(PaymentPOSLocator.escapeKeyboard);
    }

    async paymentQrisShopee(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async paymentQrisEsb(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async paymentComplimentGetOutstanding(notes: string): Promise<void> {
        const MAXLENGTH = 100;
        await this.paymentGetOutstandingAmount();
        await this.expectVisible(PaymentPOSLocator.inputComplimentNotes);
        if (notes.length > MAXLENGTH) {
            console.warn(`Input notes terlalu panjang (${notes.length} karakter). Maksimum adalah ${MAXLENGTH} karakter. Notes akan dipotong.`);
            notes = notes.substring(0, MAXLENGTH);
        }
        await this.fill(PaymentPOSLocator.inputComplimentNotes, notes);
        await this.expectVisible(PaymentPOSLocator.escapeKeyboard);
        await this.click(PaymentPOSLocator.escapeKeyboard);
    }

    async paymentComplimentPercentage(percentage: number, notes: string): Promise<void> {
        const MAXLENGTH = 100;
        await this.expectVisible(PaymentPOSLocator.inputComplimentPercentage);
        await this.fill(PaymentPOSLocator.inputComplimentPercentage, percentage.toString());
        await this.expectVisible(PaymentPOSLocator.escapeKeyboard);
        await this.click(PaymentPOSLocator.escapeKeyboard);
        await this.expectVisible(PaymentPOSLocator.inputComplimentNotes);
        if (notes.length > MAXLENGTH) {
            console.warn(`Input notes terlalu panjang (${notes.length} karakter). Maksimum adalah ${MAXLENGTH} karakter. Notes akan dipotong.`);
            notes = notes.substring(0, MAXLENGTH);
        }
        await this.fill(PaymentPOSLocator.inputComplimentNotes, notes);
        await this.expectVisible(PaymentPOSLocator.escapeKeyboard);
        await this.click(PaymentPOSLocator.escapeKeyboard);
    }

    async paymentComplimentAmount(amount: string, notes: string): Promise<void> {
        const MAXLENGTH = 100;
        await this.expectVisible(PaymentPOSLocator.inputComplimentAmount);
        await this.fill(PaymentPOSLocator.inputComplimentAmount, amount);
        await this.expectVisible(PaymentPOSLocator.escapeKeyboard);
        await this.click(PaymentPOSLocator.escapeKeyboard);
        await this.expectVisible(PaymentPOSLocator.inputComplimentNotes);
        if (notes.length > MAXLENGTH) {
            console.warn(`Input notes terlalu panjang (${notes.length} karakter). Maksimum adalah ${MAXLENGTH} karakter. Notes akan dipotong.`);
            notes = notes.substring(0, MAXLENGTH);
        }
        await this.fill(PaymentPOSLocator.inputComplimentNotes, notes);
        await this.expectVisible(PaymentPOSLocator.escapeKeyboard);
        await this.click(PaymentPOSLocator.escapeKeyboard);
    }

    async disableApplyCompliment(): Promise<void> {
        await this.paymentGetOutstandingAmount();
        await this.expectVisible(PaymentPOSLocator.inputComplimentNotes);
        await this.expectVisible(PaymentPOSLocator.disabledApply);
    }

    async paymentVoucher(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async paymentOtherVoucherSubtotalAndGrandTotal(voucherCode: string, amount: string, notes: string): Promise<void> {
        await this.expectVisible(PaymentPOSLocator.inputOtherVoucherCode);
        await this.fill(PaymentPOSLocator.inputOtherVoucherCode, voucherCode);
        await this.click(PaymentPOSLocator.escapeKeyboard);
        await this.expectVisible(PaymentPOSLocator.inputPaymentAmount);
        await this.fill(PaymentPOSLocator.inputPaymentAmount, amount);
        await this.click(PaymentPOSLocator.escapeKeyboard);
        await this.expectVisible(PaymentPOSLocator.inputOtherVoucherNotes);
        await this.click(PaymentPOSLocator.escapeKeyboard);
        await this.fill(PaymentPOSLocator.inputOtherVoucherNotes, notes);
        await this.click(PaymentPOSLocator.escapeKeyboard);
    }

    async inputOtherVoucherNotes(notes: string): Promise<void> {
        await this.expectVisible(PaymentPOSLocator.inputOtherVoucherNotes);
        await this.click(PaymentPOSLocator.escapeKeyboard);
        await this.fill(PaymentPOSLocator.inputOtherVoucherNotes, notes);
        await this.click(PaymentPOSLocator.escapeKeyboard);
    }

    async inputOtherVoucherCode(voucherCode: string): Promise<void> {
        await this.expectVisible(PaymentPOSLocator.inputOtherVoucherCode);
        await this.click(PaymentPOSLocator.escapeKeyboard);
        await this.fill(PaymentPOSLocator.inputOtherVoucherCode, voucherCode);
        await this.wait(500);
        await this.click(PaymentPOSLocator.escapeKeyboard);
    }

    async paymentMemberDeposit(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async paymentOtherCost(notes: string): Promise<void> {
        await this.expectVisible(PaymentPOSLocator.inputOtherCostNotes);
        await this.fill(PaymentPOSLocator.inputOtherCostNotes, notes);
        await this.expectVisible(PaymentPOSLocator.escapeKeyboard);
        await this.click(PaymentPOSLocator.escapeKeyboard);
    }

    async paymentInputWithOutstandingAmount(): Promise<void> {
        const outstandingValue = await this.getInputValue(PaymentPOSLocator.valueOutstanding);
        console.log("Outstanding Amount:", outstandingValue);
        await this.paymentInputAmount(outstandingValue);
    }

    async paymentInputWithOutstandingAdjustment(operation: "add" | "subtract", adjustmentValue: number): Promise<void> {
        const outstandingValueStr = await this.getInputValue(PaymentPOSLocator.valueOutstanding);
        console.log("Outstanding Amount (Original):", outstandingValueStr);
        let outstandingValue = parseFloat(outstandingValueStr.replace(/\./g, "").replace(",", ".")); // Menghandle format angka 139.600
        if (isNaN(outstandingValue)) {
            console.error("Invalid Outstanding Amount:", outstandingValueStr);
            return;
        }

        if (operation === "add") {
            outstandingValue += adjustmentValue;
        } else if (operation === "subtract") {
            outstandingValue -= adjustmentValue;
        } else {
            console.error("Invalid operation. Use \"add\" or \"subtract\"");
            return;
        }

        const adjustedValue = outstandingValue.toLocaleString("id-ID", {minimumFractionDigits: 0});
        console.log("Adjusted Outstanding Amount:", adjustedValue);
        await this.paymentInputAmount(adjustedValue);
    }

    async fillPaymentAmountWithGrandTotal(adjustment?: number): Promise<void> {
        adjustment = adjustment ?? 0;
        const token = await this.getLocalStorage("session");
        try {
            const result = await this.makeApiRequest("/order/sales-order-list/", {
                baseUrl: this.apiBaseUrl,
                method: "POST",
                headers: {"Authorization": `Bearer ${token}`}
            });

            let tables: { salesNum: string }[] = [];
            if (result?.status === 200 && Array.isArray(result?.data)) {
                tables = result.data.map(table => ({
                    salesNum: table?.salesNum
                }));
            }

            if (tables.length > 0) {
                const lastSalesNum: string = tables[tables.length - 1].salesNum;

                const orderDetails = await this.makeApiRequest<{
                    grandTotal: number,
                    roundingTotal: number
                }>("/order/view", {
                    baseUrl: this.apiBaseUrl,
                    method: "POST",
                    headers: {"Authorization": `Bearer ${token}`, "Content-Type": "application/json"},
                    body: {"salesNum": lastSalesNum}
                });

                if (orderDetails?.status === 200 && orderDetails?.data) {
                    const {grandTotal, roundingTotal} = orderDetails.data;
                    const finalAmount = grandTotal - roundingTotal + adjustment;

                    const formattedAmount = new Intl.NumberFormat("id-ID", {
                        style: "decimal",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2
                    }).format(finalAmount);

                    await this.expectVisible(PaymentPOSLocator.inputPaymentAmount);
                    await this.fill(PaymentPOSLocator.inputPaymentAmount, formattedAmount);
                    await this.expectVisible(PaymentPOSLocator.escapeKeyboard);
                    await this.click(PaymentPOSLocator.escapeKeyboard);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    async expectPopUpAuth(): Promise<void> {
        await this.expectVisible(PaymentPOSLocator.popUpUserAuthorization)
    }


}