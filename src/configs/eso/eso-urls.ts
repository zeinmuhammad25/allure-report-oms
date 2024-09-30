import BaseUrl from "../../base/base-url";

export default class EsoUrls extends BaseUrl {
    private static _instance: EsoUrls;

    private constructor() {
        super();
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    baseUrl = (): string => process.env.BASE_URL;

    public get = {
        branchList: "/eso-qs/qa1",
        loginWhatsapp: "/eso-qs/login/whatsapp",
        modePage: (branchCode: string) => `/eso-qs/qa1/${branchCode}/mode`,
        homePage: (branchCode: string, mode: string) => `/eso-qs/QA1/${branchCode}/home?mode=${mode}`,
        orderPage: (branchCode: string, mode: string, categoryID: number) => `/eso-qs/QA1/${branchCode}/order?mode=${mode}&category=${categoryID}`
    };
}