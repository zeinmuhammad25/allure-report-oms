import BaseUrl from "../../base/base-url";

export default class EsoUrls extends BaseUrl {
    private static _instance: EsoUrls;

    private constructor() {
        super();
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    private company = process.env.ESO_COMPANY;

    baseUrl = (): string => process.env.ESO_BASE_URL;

    public get = {
        branchList: `/${this.company}`,
        searchAddress: "/search-address",
        saveAddress: "/save-address",
        deliveryAddress: "/delivery-address",
        reservation: `/${this.company}}/SFF10/reservation`,
        loginWhatsapp: (branchCode: string) => `/login/whatsapp?company=${this.company}&branch=${branchCode}&mode=dinein&ref=%2F${this.company}%2FSFF10%2Forder%3Fmode%3Ddinein`,
        history: "/history",
        modePage: (branchCode: string) => `/${this.company}/${branchCode}/mode`,
        homePage: (branchCode: string, mode: string) => `/${this.company}/${branchCode}/home?mode=${mode}`,
        orderPage: (branchCode: string, mode: string, categoryID: number) => `/${this.company}/${branchCode}/order?mode=${mode}&category=${categoryID}`,
        orderSummary: (branchCode: string) => `/${this.company}/${branchCode}/order-summary`
    };
}