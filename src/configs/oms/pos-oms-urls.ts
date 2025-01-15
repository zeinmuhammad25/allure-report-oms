import BaseUrl from "../../base/base-url";

export default class PosOmsUrls extends BaseUrl {
    private static _instance: PosOmsUrls;

    private constructor() {
        super();
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    baseUrl = (): string => process.env.OMS_URL;

    public get = {

        terminalId:{
            terminalList: "/en/terminal-list",
        },
        // general pos fungsi untuk form general pada pos seperti login,startday dan endday
        generalPos:{
            loginPage:"/en/login",
            startShift:"/en/shift",
            endOfDay:"/en/shift",
        },

        tableList:{
            orderDineIn:"/en/table",
            dineInPayment:"/en/table/payment",
            quickService:"/en/table/take-away",
            qsPayment:"/en/table/take-away/payment",
        },

        salesRecapitulation:{
            recapitulationPage:"/en/sales",
        },

        regularMember:{
            indexMember:"/en/member",
            addMember:"/en/member/add",
            editMember:"/en/member/edit",
        },

        regularMemberDeposit:{
            indexDeposit:"/en/member-deposit",
            addDeposit:"/en/member-deposit/add",
        },

        regularMemberWithdrawal:{
            indexWithdrawal:"/en/member-withdrawal",
            addWithdrawal:"/en/member-withdrawal/add",
        },

        toolsSettingPos:{
            toolIndex:"/en/tools",
        },

        othersMenuPos:{
            shiftLogList:"/en/shift-log",
            branchMenuList:"/en/branch-menu",
            soldOutLimitInfo:"/en/branch-menu/sold-out-limit-info",
            station:"/en/station",
        },

        // account: {
        //     forgotPassword: "forgotPassword urlnya apa",
        //     logout: "logout urlnya apa",
        //     profile: "/esb-core-lite/profile",
        // },

    };
}