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
        appVersion: "Version V.1.201.0",
        username: "QA1ADIB",
        usernameWrong: "QA1ADIB_WRONG_USERNAME",
        usernameEmpty: "",
        password: "Vodka.123$",
        passwordWrong: "Vodka.123$_must_be_wrong",
    }
}