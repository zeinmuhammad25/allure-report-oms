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
        login: {
            loginUrl: "/esb-core-lite/login",
        },
        dashboard: {
            dashboardIndexUrl: "/esb-core-lite/dashboard/index",
        },
        printerSetting: {
            menuManagementUrl: "/esb-core-lite/printer-setting/branch-menu/index",
            printerUrl: "/esb-core-lite/printer-setting/station/index",
            printerCreateUrl: "/esb-core-lite/printer-setting/station/create",
        }
    };
}