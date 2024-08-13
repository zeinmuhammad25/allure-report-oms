import BaseUrl from "../../base/base-url";

export default class PosLiteUrls extends BaseUrl {
    private static _instance: PosLiteUrls;

    private constructor() {
        super();
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    baseUrl = (): string => "";
}