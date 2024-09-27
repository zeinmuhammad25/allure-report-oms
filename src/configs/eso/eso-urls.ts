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

    public get = {};
}