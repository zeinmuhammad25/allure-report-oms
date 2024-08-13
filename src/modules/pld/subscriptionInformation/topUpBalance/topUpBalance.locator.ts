import BaseLocator from "../../../../base/base-locator";

export default class TopUpBalanceLocator extends BaseLocator {
    static inputBalanceAmount: string = "//input[@placeholder='Minimal 100.000 dan Maksimal 30.000.000']";
    static option100KAmount: string = "//label[@ng-reflect-nz-value='100000']";
    static topUpBalanceButton: string = "#btn-top-up-saldo";
    static paymentHistoryDateFilter: string = "//app-date-range-picker-custom";
    static allTransactionButton: string = "//span[text()=' Semua ']/parent::label";
    static paymentTransactionButton: string = "//span[text()=' Pembayaran ']/parent::label";
    static topUpBalanceTransactionButton: string = "//span[text()=' Top Up Saldo ']/parent::label";


}