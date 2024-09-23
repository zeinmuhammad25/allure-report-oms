import BaseLocator from "../../../../base/base-locator";

export default class PaymentLocator extends BaseLocator {
    static salesDateField: string = "(//input[@class='filter-calendar ng-untouched ng-valid ng-star-inserted ng-dirty'])[1]";
    static salesCompanyField: string = "(//nz-select-top-control)[1]";
    static salesBrandField: string = "(//nz-select-top-control)[2]";
    static salesBranchField: string = "(//nz-select-top-control)[3]";
    static reportMode: string = "(//nz-select-top-control)[4]";
    static salesMode: string = "(//nz-select-top-control)[5]";
    static paymentType: string = "(//nz-select-top-control)[6]";
    static paymentMethod: string = "(//nz-select-top-control)[7]";
    static salesViewButton: string = "(//button[normalize-space()='Tampilkan'])[1]";
    static salesDownloadButton: string = "(//button[normalize-space()='Unduh'])[1]";
    static scrollUpButton: string = "(//div[@class='ant-back-top-inner ng-star-inserted'])[1]";
    static filterOptionItem = (filterText:string): string => `//nz-option-item[@title='${filterText}']`

//Date picker locator
    static todayFilter: string = "(//button[normalize-space()='Hari ini'])[1]";
    static yesterdayFilter: string = "(//button[normalize-space()='Kemarin'])[1]";
    static lastWeekFilter: string = "(//button[normalize-space()='7 Hari terakhir'])[1]";
    static thisWeekFilter: string = "(//button[normalize-space()='Minggu ini'])[1]";
    static thirtyDayFilter: string = "(//button[normalize-space()='30 Hari terakhir'])[1]";
    static thisMonthFilter: string = "(//button[normalize-space()='Bulan ini'])[1]";
    static lastMonthFilter: string = "(//button[normalize-space()='Bulan ini'])[1]";
    static chooseDateButton: string = "(//button[normalize-space()='Pilih'])[1]";
    static cancelDateButton: string = "(//button[normalize-space()='Batal'])[1]";

//Report mode locator
    static summaryMode: string = "(//div[contains(text(),'Mode Ringkasan')])[1]";
    static detailMode: string = "(//div[normalize-space()='Mode Detail'])[1]";

//Sales mode locator
    static dineIn: string = "(//div[normalize-space()='Dine in'])[1]";
    static takeAway: string = "(//div[normalize-space()='Take Away'])[1]";
    static goFood: string = "(//div[normalize-space()='GoFood'])[1]";
    static grabFood: string = "(//div[normalize-space()='GrabFood'])[1]";

//Payment type
    static cash: string = "(//div[normalize-space()='Tunai'])[1]";
    static cashless: string = "(//div[normalize-space()='Non Tunai'])[1]";
    static complimentary: string = "(//div[normalize-space()='Komplimen'])[1]";
    static voucher: string = "(//div[normalize-space()='Voucher'])[1]";
    static otherVoucher: string = "(//div[normalize-space()='Voucher Lainnya'])[1]";
    static otherCosts: string = "(//div[normalize-space()='Biaya Lainnya'])[1]";

//Payment method locator
    static posDana: string = "(//div[normalize-space()='DANA (POS)'])[1]";
    static posGofood: string = "(//div[normalize-space()='GOFOOD (POS)'])[1]";
    static posGopay: string = "(//div[normalize-space()='GOPAY (POS)'])[1]";
    static posOvo: string = "(//div[normalize-space()='OVO (POS)'])[1]";
    static posQris: string = "(//div[normalize-space()='QRIS (ESB) (POS)'])[1]";
    static posCash: string = "(//div[normalize-space()='TUNAI (POS)'])[1]";

    static esoDana: string = "(//div[normalize-space()='DANA (ESO)'])[1]";
    static esoEsbVoucher: string = "(//div[normalize-space()='ESB VOUCHER (ESO)'])[1]";
    static esoGopay: string = "(//div[normalize-space()='GOPAY (ESO)'])[1]";
    static esoLinkAja: string = "(//div[normalize-space()='LINKAJA (ESO)'])[1]";
    static esoOvo: string = "(//div[normalize-space()='OVO (ESO)'])[1]";
    static esoQris: string = "(//div[normalize-space()='QRIS (ESO)'])[1]";
    static esoShopeePay: string = "(//div[normalize-space()='SHOPEEPAY (ESO)'])[1]";

    //Download
    static downloadDialogDownloadButton: string = "//button[@class='btn btn-block btn-primary'][normalize-space()='Unduh']";
    static downloadDialogCancelButton: string = "//button[@class='btn btn-block'][normalize-space()='Batal']";

}