import BaseOmsPage from "../base-oms-page";
import RegularMemberWithdrawalScenario from "./regularMemberWithdrawal.scenario";
import Element from "../../../base/objects/Element";

export default class RegularMemberWithdrawalPage extends BaseOmsPage implements RegularMemberWithdrawalScenario{
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [];
    }
}