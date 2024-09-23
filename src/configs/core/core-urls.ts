import BaseUrl from "../../base/base-url";

export default class CoreUrls extends BaseUrl {

    private static _instance: CoreUrls;

    private constructor() {
        super();
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    baseUrl = (): string => "https://qa5.esb.co.id/esb-core-refactor/";

    public get = {
        login: "site/login",
        home: "article/index",
        purchaseOrder: {
            view: "purchase",
            create: "purchase/create",
        },
        report: {
            profitLoss: "report/report-profit-loss"
        },
        master: {
            branch: {
                view: "branch",
                create: "branch/create",
            },
            currency: {
                view: "currency",
            },
            supplier: {
                view: "supplier",
            }
        }
    }
}
