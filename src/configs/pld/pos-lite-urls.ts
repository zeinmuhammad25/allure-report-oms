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
        },
        accountSetting: {
            branch: "branch url nya apa",
        },
        login: {
            loginUrl: "/esb-core-lite/login",
        },
        printerSetting: {
            menuManagement: "/esb-core-lite/printer-setting/branch-menu/index",
            printer: "/esb-core-lite/printer-setting/station/index",
        }
    };
}