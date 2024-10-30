import BookOrderScenario from "./bookOrder.scenario";
import BaseOmsPage from "../../../base-oms-page";
import Element from "../../../../../base/objects/Element";


export default class BookOrderComponent extends BaseOmsPage implements BookOrderScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        throw new Error("Method not implemented.");
    }

}