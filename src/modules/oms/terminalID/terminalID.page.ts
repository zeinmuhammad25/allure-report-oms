import TerminalIDScenario from "./terminalID.scenario";
import BaseOmsPage from "../base-oms-page";
import Element from "../../../base/objects/Element";


export default class TerminalIDPage extends BaseOmsPage implements TerminalIDScenario {


    pageUrl = (): string => this.urls.get.terminalId.terminalList;

    // Real URL =
    shouldHave(): Element[] {
        return [
            //Element.ofSelector(TerminalIDLocator.),


        ];
    }


}