import BaseConfigs from "../../base/base-configs";

export default class CoreConfigs extends BaseConfigs {
    private static _instance: CoreConfigs;

    private constructor() {
        super();
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    public get = {
        username: "QA1ADIB",
        password: "Vodka.123$"
    }
}