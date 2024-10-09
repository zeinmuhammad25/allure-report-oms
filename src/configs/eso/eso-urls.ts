import BaseUrl from "../../base/base-url";

export default class EsoUrls extends BaseUrl {
    private static _instance: EsoUrls;

    private constructor() {
        super();
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    baseUrl = (): string => process.env.ESO_BASE_URL;

    public get = {
        branchList: "/qa1",
        searchAddress: "/search-address",
        saveAddress: "/save-address",
        deliveryAddress: "/delivery-address",
        reservation: "/QA1/SFF10/reservation",
        loginWhatsapp: (branchCode: string) => `/login/whatsapp?company=QA1&branch=${branchCode}&mode=dinein&ref=%2FQA1%2FSFF10%2Forder%3Fmode%3Ddinein`,
        history: "/history",
        modePage: (branchCode: string) => `/qa1/${branchCode}/mode`,
        homePage: (branchCode: string, mode: string) => `/QA1/${branchCode}/home?mode=${mode}`,
        orderPage: (branchCode: string, mode: string, categoryID: number) => `/QA1/${branchCode}/order?mode=${mode}&category=${categoryID}`,
        orderSummary: (branchCode: string) => `/QA1/${branchCode}/order-summary`
    };
}