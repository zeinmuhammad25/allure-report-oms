import BaseConfigs from "../../base/base-configs";

export default class PosLiteConfigs extends BaseConfigs {
    private static _instance: PosLiteConfigs;

    private constructor() {
        super();
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    public get = {
        storageState: process.env.STORAGE_STATE,
        data: {
            company: process.env.PLD_COMPANY,
            brand: process.env.PLD_BRAND,
            branch: process.env.PLD_BRANCH,
            salesMode: "GrabFood",
            salesType: "Penjualan",
            paymentMethod: "GOPAY (ESO)",
            transactionNumber: "101010101010",
            cashierName: "Jean Doe"
        }
    }
}