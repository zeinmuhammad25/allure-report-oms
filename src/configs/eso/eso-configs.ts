import BaseConfigs from "../../base/base-configs";

export default class EsoConfigs extends BaseConfigs {
    private static _instance: EsoConfigs;

    private constructor() {
        super();
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    public get = {}
}