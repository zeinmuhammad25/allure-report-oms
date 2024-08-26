import BaseUrl from "../../base/base-url";

export default class PosLiteUrls extends BaseUrl {
    private static _instance: PosLiteUrls;

    private constructor() {
        super();
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    baseUrl = (): string => process.env.BASE_URL;

    public get = {
        account: {
            forgotPassword: "forgotPassword urlnya apa",
            logout: "logout urlnya apa",
            profile: "/esb-core-lite/profile",
        },
        accountSetting: {
            branchUrl: "/esb-core-lite/account-setting/branch/index",
            brandUrl: "/esb-core-lite/account-setting/brand/index",
            companyUrl: "/esb-core-lite/account-setting/company/index",
            generateOTPUrl: "/esb-core-lite/account-setting/otp/create",
            notificationEmailUrl: "/esb-core-lite/account-setting/email-recipient/index",
            paymentMethodUrl: "/esb-core-lite/account-setting/payment-method/index",
            tableSettingUrl: "/esb-core-lite/account-setting/table/index",
        },
        attendance: {
            attendanceListUrl: "/esb-core-lite/attendance/report/index",
            employeeDataUrl: "/esb-core-lite/attendance/employee/index",
        },
        bookkeeping: {
            bookkeepingCategoryUrl: "/esb-core-lite/finance/charts-of-account/index",
            bookkeepingInputUrl: "/esb-core-lite/finance/input-finance/index",
            bookkeepingReportUrl: "/esb-core-lite/finance/profit-loss-report/index",
        },
        catalogue: {
            categoryUrl: "/esb-core-lite/catalog/menu-category/index",
            menuUrl: "/esb-core-lite/catalog/menu/index",
            menuBookUrl: "/esb-core-lite/catalog/menu-template/index",
            menuNotesUrl: "/esb-core-lite/catalog/notes-category/index",
            reasonCancelUrl: "/esb-core-lite/catalog/menu-template/index",
            salesModeUrl: "/esb-core-lite/catalog/sales-mode/index",
            specialPriceUrl: "/esb-core-lite/catalog/special-price/index",
        },
        login: {
            loginUrl: "/esb-core-lite/login",
        },
        dashboard: {
            dashboardIndexUrl: "/esb-core-lite/dashboard/index",
            bookKeepingUrl: "/esb-core-lite/dashboard/accounting",
            businessTipsUrl: "/esb-core-lite/dashboard/stock-recommendation",
            onlinePaymentUrl: "/esb-core-lite/dashboard/online-fund/index",
            stockMenuUrl: "/esb-core-lite/dashboard/stock-menu/index",

        },
        esbOrder: {
            bannerMarketingUrl: "/esb-core-lite/esb-order/banner/index",
            settingUrl: "/esb-core-lite/esb-order/setting/index",
        },
        groupList: {
            groupListUrl: "/esb-core-lite/role/user/index",
        },
        inventory: {
            rawMaterialUrl: "/esb-core-lite/inventory/product/index",
            rawMaterialReportUrl: "/esb-core-lite/inventory/report/index",
            rawMaterialStockUrl: "/esb-core-lite/inventory/product-inquiry/index",
            rawMaterialTransactionUrl: "/esb-core-lite/inventory/transaction/index",
        },
        onlinePlatform: {
            platformIntegrationUrl: "/esb-core-lite/online-platform/integration/index",
            manageOnlineMenuUrl: "/esb-core-lite/online-platform/menu-setting/index",
        },
        printerSetting: {
            menuManagementUrl: "/esb-core-lite/printer-setting/branch-menu/index",
            printerUrl: "/esb-core-lite/printer-setting/station/index",
            printerCreateUrl: "/esb-core-lite/printer-setting/station/create",
        },
        promotion: {
            promotionUrl: "/esb-core-lite/promotion/index",
        },
        report: {
            cancelAndVoidUrl: "/esb-core-lite/report/cancel-menu/index",
            paymentReportUrl: "/esb-core-lite/report/sales-payment/index",
            profitAndLossUrl: "/esb-core-lite/report/profit-loss/index",
            promotionReportUrl: "/esb-core-lite/report/promotion/index",
            salesDetailUrl: "/esb-core-lite/report/sales-detail/index",
            salesMenuUrl: "/esb-core-lite/report/sales-menu/index",
            salesSummaryUrl: "/esb-core-lite/report/sales-summary/index",
        },
        userAccessControl: {
            userUrl: "/esb-core-lite/role/user/index",
            userAccessBackendUrl: "/esb-core-lite/role/user-role/index",
            userAccessPOSUrl: "/esb-core-lite/role/pos-user-role/index",
        },
        withdrawFunds: {
            historyUrl: "/esb-core-lite/disbursement/disbursement-report-history/index",
            remainingFunds: "/esb-core-lite/disbursement/disbursement-report/index",
        },
    };
}