import BaseConfigs from "../../base/base-configs";

export default class PosOmsConfigs extends BaseConfigs {
    private static _instance: PosOmsConfigs;

    private constructor() {
        super();
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    public get = {
        storageState : process.env.STORAGE_STATE,
        dbConfig: {
            host: process.env.OMS_DB_HOST,
            user: process.env.OMS_DB_USER,
            password: process.env.OMS_DB_PASS,
            database: process.env.OMS_DB_NAME
        }
    };
}