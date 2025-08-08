import BaseOmsPage from "../../base-oms-page";
import Element from "../../../../base/objects/Element";
import PaymentV2Scenario from "./paymentV2.scenario";
import PaymentV2Locator from "./paymentV2.locator";
import PaymentList from "../../objects/paymentList";


export default class PaymentV2Page extends BaseOmsPage implements PaymentV2Scenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(PaymentV2Locator.buttonApplyMember),
            Element.ofSelector(PaymentV2Locator.buttonCheckOnlinePayment),
            Element.ofSelector(PaymentV2Locator.buttonEmployeeMode)
        ];
    }

    private apiBaseUrl = "http://localhost/fnb-pos-v2/api/web/v1";

    async paymentPinUserAuthorization(Pin: string): Promise<void> {
        await this.expectVisible(PaymentV2Locator.popUpUserAuthorization);
        await this.expectVisible(PaymentV2Locator.inputPinOrOtpField);
        await this.click(PaymentV2Locator.inputPinOrOtpField);
        await this.fill(PaymentV2Locator.inputPinOrOtpField, Pin);
        await this.click(PaymentV2Locator.popUpUserAuthorization);
        await this.expectVisible(PaymentV2Locator.authorizeButton);
        await this.click(PaymentV2Locator.authorizeButton);
    }

    async paymentType(paymentType: PaymentList): Promise<void> {
        await this.wait(300);
        await this.expectVisible(PaymentV2Locator.getLocatorPaymentType(paymentType));
        await this.click(PaymentV2Locator.getLocatorPaymentType(paymentType));
    }

    async paymentMethod(paymentMethod: PaymentList): Promise<void> {
        await this.expectVisible(PaymentV2Locator.getLocatorPaymentType(paymentMethod));
        await this.click(PaymentV2Locator.getLocatorPaymentType(paymentMethod));
    }

    async actionPayment(actionPayment: PaymentList): Promise<void> {
        await this.wait(500);
        await this.expectVisible(PaymentV2Locator.getLocatorPaymentMethod(actionPayment));
        await this.click(PaymentV2Locator.getLocatorPaymentMethod(actionPayment));
    }

    async payPayment(): Promise<void> {
        await this.expectVisible(PaymentV2Locator.buttonPayPayment);
        await this.click(PaymentV2Locator.buttonPayPayment);
    }

    async closePopUpPaymentSuccessFul(): Promise<void> {
        await this.expectVisible(PaymentV2Locator.popUpPaymentSuccessFul);
        await this.expectVisible(PaymentV2Locator.buttonOkPaymentSuccessFul);
        await this.click(PaymentV2Locator.buttonOkPaymentSuccessFul);
    }

    async paymentInputAmount(inputAmount: string): Promise<void> {
        await this.expectVisible(PaymentV2Locator.inputPaymentAmount);
        await this.click(PaymentV2Locator.inputPaymentAmount);
        await this.fill(PaymentV2Locator.inputPaymentAmount, inputAmount);
    }

    /**
     * Memasukkan nominal pembayaran ke grid angka (AmountByBoard) satu per satu
     * berdasarkan karakter dari string input, misalnya "5000"
     */
    async paymentInputAmountByBoard(paymentValue: string): Promise<void> {
        const paymentValueArray = paymentValue.split("");
        for (let i = 0; i < paymentValueArray.length; i++) {
            await this.expectVisible(PaymentV2Locator.gridPaymentBoard(paymentValueArray[i]));
            await this.click(PaymentV2Locator.gridPaymentBoard(paymentValueArray[i]));
        }
    }

    async disableSavePayment(): Promise<void> {
        await this.expectVisible(PaymentV2Locator.disabledSave);
    }

    /**
     * Default: clik sekali di klik jika  `clickValue` dimasukan
     */
    async clearManualAmount(clickValue: number = 1): Promise<void> {
        for (let i = 0; i < clickValue; i++) {
            await this.expectVisible(PaymentV2Locator.buttonClearAmount);
            await this.click(PaymentV2Locator.buttonClearAmount);
        }
    }

    async paymentFullAmount(): Promise<void> {
        await this.expectVisible(PaymentV2Locator.buttonPayFullAmount);
        await this.click(PaymentV2Locator.buttonPayFullAmount);
    }

    async addCardDetail(inputField: PaymentList, value: string): Promise<void> {
        await this.expectVisible(PaymentV2Locator.buttonAddCardDetails);
        await this.click(PaymentV2Locator.buttonAddCardDetails);
        await this.expectVisible(PaymentV2Locator.getLocatorInputPaymentDebit(inputField));
        await this.click(PaymentV2Locator.getLocatorInputPaymentDebit(inputField));
        await this.fill(PaymentV2Locator.getLocatorInputPaymentDebit(inputField), value);
    }

    async settlementQrEsb(branchId: number): Promise<void> {
        // Query ini untuk update transaksi qr berdasarkan transaki yang paling baru dari branch tersebut
        const query: string = `UPDATE tr_salespaymentgateway
                               SET paymentTransactionStatus = 'settlement'
                               WHERE salesPaymentGatewayNum = (SELECT salesPaymentGatewayNum
                                                               FROM (SELECT salesPaymentGatewayNum
                                                                     FROM tr_salespaymentgateway
                                                                     WHERE branchID = ${branchId}
                                                                       AND paymentTransactionStatus = 'pending'
                                                                     ORDER BY transactionDate
                                                                         DESC LIMIT 1) AS latestTxn);`;
        await this.sqlExecute(this.configs.get.dbStgConfig, query);
    }

    async paymentQrisEsb(branchId: number): Promise<void> {
        await this.waitForResponse("payment/check-sales-payment-qr");
        await this.waitForResponse("/payment/create-payment-gateway");
        await this.settlementQrEsb(branchId);
        await this.waitForResponse("payment/check-sales-payment-qr");
        await this.expectVisible(PaymentV2Locator.escapeKeyboard);
        await this.actionPayment(PaymentList.ActionPayment.ClosePayment);
    }

    async printQrisEsb(): Promise<void> {
        await this.waitForResponse("payment/check-sales-payment-qr");
        await this.waitForResponse("/payment/create-payment-gateway");
        await this.actionPayment(PaymentList.ActionPayment.PrintQr);
    }

    async paymentComplimentGetOutstanding(notes: string): Promise<void> {
        const MAXLENGTH = 100;
        await this.paymentFullAmount();
        await this.actionPayment(PaymentList.ActionPayment.NextPayment);
        await this.expectVisible(PaymentV2Locator.inputComplimentNotes);
        await this.click(PaymentV2Locator.inputComplimentNotes);
        if (notes.length > MAXLENGTH) {
            console.warn(`Input notes terlalu panjang (${notes.length} karakter). Maksimum adalah ${MAXLENGTH} karakter. Notes akan dipotong.`);
            notes = notes.substring(0, MAXLENGTH);
        }
        await this.fill(PaymentV2Locator.inputComplimentNotes, notes);
    }

    async paymentComplimentPercentage(percentage: number, notes: string): Promise<void> {
        const MAXLENGTH = 100;
        await this.expectVisible(PaymentV2Locator.inputComplimentPercentage);
        await this.click(PaymentV2Locator.inputComplimentPercentage);
        await this.fill(PaymentV2Locator.inputComplimentPercentage, percentage.toString());
        await this.actionPayment(PaymentList.ActionPayment.NextPayment);
        await this.expectVisible(PaymentV2Locator.inputComplimentNotes);
        await this.click(PaymentV2Locator.inputComplimentNotes);
        if (notes.length > MAXLENGTH) {
            console.warn(`Input notes terlalu panjang (${notes.length} karakter). Maksimum adalah ${MAXLENGTH} karakter. Notes akan dipotong.`);
            notes = notes.substring(0, MAXLENGTH);
        }
        await this.fill(PaymentV2Locator.inputComplimentNotes, notes);
    }

    async paymentComplimentAmount(amount: string, notes: string): Promise<void> {
        const MAXLENGTH = 100;
        await this.expectVisible(PaymentV2Locator.inputComplimentAmount);
        await this.click(PaymentV2Locator.inputComplimentAmount);
        await this.fill(PaymentV2Locator.inputComplimentAmount, amount);
        await this.actionPayment(PaymentList.ActionPayment.NextPayment);
        await this.expectVisible(PaymentV2Locator.inputComplimentNotes);
        await this.click(PaymentV2Locator.inputComplimentNotes);
        if (notes.length > MAXLENGTH) {
            console.warn(`Input notes terlalu panjang (${notes.length} karakter). Maksimum adalah ${MAXLENGTH} karakter. Notes akan dipotong.`);
            notes = notes.substring(0, MAXLENGTH);
        }
        await this.fill(PaymentV2Locator.inputComplimentNotes, notes);
    }

    async disableSaveCompliment(): Promise<void> {
        await this.paymentFullAmount();
        await this.actionPayment(PaymentList.ActionPayment.NextPayment);
        await this.expectVisible(PaymentV2Locator.inputComplimentNotes);
        await this.expectVisible(PaymentV2Locator.getLocatorButtonAction(PaymentList.ActionPayment.SavePayment, true));
    }

    async paymentVoucher(voucherCode: string): Promise<void> {
        await this.expectVisible(PaymentV2Locator.inputVoucherCode);
        await this.click(PaymentV2Locator.inputVoucherCode);
        await this.fill(PaymentV2Locator.inputVoucherCode, voucherCode);
        await this.actionPayment(PaymentList.ActionPayment.ApplyPayment);
        await this.expectVisible(PaymentV2Locator.saveVoucher);
        await this.click(PaymentV2Locator.saveVoucher);
    }

    async cancelPaymentVoucher(voucherCode: string): Promise<void> {
        await this.expectVisible(PaymentV2Locator.inputVoucherCode);
        await this.click(PaymentV2Locator.inputVoucherCode);
        await this.fill(PaymentV2Locator.inputVoucherCode, voucherCode);
        await this.actionPayment(PaymentList.ActionPayment.ApplyPayment);
        await this.expectVisible(PaymentV2Locator.cancelVoucher);
        await this.click(PaymentV2Locator.cancelVoucher);
    }

    async paymentVoucherScan(): Promise<void> {
        await this.expectVisible(PaymentV2Locator.scanVoucher);
        await this.click(PaymentV2Locator.scanVoucher);
    }

    async paymentOtherVoucherSubtotalAndGrandTotal(voucherCode: string, amount: string): Promise<void> {
        await this.expectVisible(PaymentV2Locator.inputVoucherCode);
        await this.fill(PaymentV2Locator.inputVoucherCode, voucherCode);
        await this.expectVisible(PaymentV2Locator.inputOtherVoucherValue);
        await this.fill(PaymentV2Locator.inputOtherVoucherValue, amount);
        await this.actionPayment(PaymentList.ActionPayment.ApplyPayment);
        await this.expectVisible(PaymentV2Locator.saveVoucher);
        await this.click(PaymentV2Locator.saveVoucher);
    }

    async cancelPaymentOtherVoucherSubtotalAndGrandTotal(voucherCode: string, amount: string): Promise<void> {
        await this.expectVisible(PaymentV2Locator.inputVoucherCode);
        await this.fill(PaymentV2Locator.inputVoucherCode, voucherCode);
        await this.expectVisible(PaymentV2Locator.inputOtherVoucherValue);
        await this.fill(PaymentV2Locator.inputOtherVoucherValue, amount);
        await this.actionPayment(PaymentList.ActionPayment.ApplyPayment);
        await this.expectVisible(PaymentV2Locator.cancelVoucher);
        await this.click(PaymentV2Locator.cancelVoucher);
    }

    async inputOtherOrVoucherCode(voucherCode: string): Promise<void> {
        await this.expectVisible(PaymentV2Locator.inputVoucherCode);
        await this.fill(PaymentV2Locator.inputVoucherCode, voucherCode);
    }

    async inputOtherVoucherValue(amount: string): Promise<void> {
        await this.expectVisible(PaymentV2Locator.inputOtherVoucherValue);
        await this.fill(PaymentV2Locator.inputOtherVoucherValue, amount);
    }

    async paymentMemberDeposit(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async paymentOtherCost(notes: string): Promise<void> {
        await this.expectVisible(PaymentV2Locator.inputOtherCostNotes);
        await this.fill(PaymentV2Locator.inputOtherCostNotes, notes);
        await this.actionPayment(PaymentList.ActionPayment.ApplyPayment);
    }


    async paymentInputWithOutstandingAmount(): Promise<void> {
        const outstandingValue = await this.getTextValue(PaymentV2Locator.valueOutstanding);
        console.log("Outstanding Amount:", outstandingValue);
        await this.paymentInputAmount(outstandingValue);
    }

    async paymentInputWithOutstandingAdjustment(operation: "add" | "subtract", adjustmentValue: number): Promise<void> {
        const outstandingValueStr = await this.getTextValue(PaymentV2Locator.valueOutstanding);
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

                    await this.expectVisible(PaymentV2Locator.inputPaymentAmount);
                    await this.fill(PaymentV2Locator.inputPaymentAmount, formattedAmount);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

}
