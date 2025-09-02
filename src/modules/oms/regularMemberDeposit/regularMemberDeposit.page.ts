import BaseOmsPage from "../base-oms-page";
import RegularMemberDepositScenario from "./regularMemberDeposit.scenario";
import Element from "../../../base/objects/Element";

export default class RegularMemberDepositPage extends BaseOmsPage implements RegularMemberDepositScenario{
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [];
    }
}