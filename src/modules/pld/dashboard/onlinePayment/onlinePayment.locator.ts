import BaseLocator from "../../../../base/base-locator";

export default class OnlinePaymentLocator extends BaseLocator {
    static dataReadGuideButton: string = "(//button[@class='button button-yellow button-small'])[1]";
    static branchDropdown = (branchName:string): string => `(//nz-select-item[@title='${branchName}'])[1]`;
    static onlinePaymentFilter: string = "(//button[@class='button-mobile button-outline-blue full-width'])[1]";
    static onlinePaymentTransNo: string = "(//input[@placeholder='Cari Berdasarkan No. Transaksi'])[1]";
    static onlinePaymentDayTab: string = "(//span[@class='ant-radio-button ant-radio-button-checked'])[1]";
    static onlinePaymentWeekTab: string = "(//label[@class='radio-item mx-1 ant-radio-button-wrapper ng-star-inserted'])[1]";
    static onlinePaymentDateField: string = "(//input[@type='text'])[1]";
    static filterOptionItem = (filterText: string): string => `//nz-option-item[@title='${filterText}']`

    // Guide Dialog
    static guideDialog = "//div[contains(@class,'custom-guide-container')]"
    static guideDialogButton = "//button[@class='button button-yellow button-small']"
    static guideDialogCloseButton = "//img[@alt='close-svg']"

    // Filter Dialog
    static filterPaymentMethod = "//nz-select-top-control[contains(@ng-reflect-place-holder, 'Cari Berdasarkan Metode')]"
    static filterPaymentSource = "//nz-select-top-control[contains(@ng-reflect-place-holder, 'Cari Berdasarkan Mode')]"
    static filterReset = "//div[@class='modal-filter-container']//button[normalize-space()='Reset']"
    static filterApplyButton = "//div[@class='modal-filter-container']//button[normalize-space()='Terapkan']"
    static filterStatusFinish = "//label[@ng-reflect-nz-value='settlement']"
    static filterStatusPending = "//label[@ng-reflect-nz-value='pending']"
    static filterStatusExpired = "//label[@ng-reflect-nz-value='expired']"

    // Summary
    static summaryCard = "(//div[@class='card-body'])[2]"

    // Detail
    static detailCard = "(//div[@class='card-body'])[3]"

    // Daily
    static dailyCard = "(//div[@class='card-body'])[4]"

    //Download
    static onlinePaymentDownload: string = "(//button[@class='esb-btn-lg-secondary w-100'])[1]";
    static onlinePaymentCancelDownload: string = "(//button[@class='btn btn-block btn-warning'])[1]";
    static onlinePaymentConfirmDownload: string = "(//button[@class='btn btn-block btn-primary'])[1]";

}
