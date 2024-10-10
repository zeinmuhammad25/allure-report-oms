import BaseConfigs from "../../base/base-configs";

export default class PosOmsConfigs extends BaseConfigs {
    private static _instance: PosOmsConfigs;

    private constructor() {
        super();
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    public get = {}
}