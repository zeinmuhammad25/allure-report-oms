import SplitBillScenario from "./splitBill.scenario";
import BaseOmsPage from "../../../base-oms-page";
import Element from "../../../../../base/objects/Element";


export default class SplitBillComponent extends BaseOmsPage implements SplitBillScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        throw new Error("Method not implemented.");
    }

}