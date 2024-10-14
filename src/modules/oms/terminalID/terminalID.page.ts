import TerminalIDScenario from "./terminalID.scenario";
import BaseOmsPage from "../base-oms-page";
import Element from "../../../base/objects/Element";
import TerminalIDLocator from "./terminalID.locator";


export default class TerminalIDPage extends BaseOmsPage implements TerminalIDScenario {


    pageUrl = (): string => this.urls.get.terminalId.terminalList;

    // Real URL =
    shouldHave(): Element[] {
        return [
            Element.ofSelector(TerminalIDLocator.terminalID01),
            Element.ofSelector(TerminalIDLocator.terminalID02),
            Element.ofSelector(TerminalIDLocator.terminalID03),
            Element.ofSelector(TerminalIDLocator.terminalID04),
            Element.ofSelector(TerminalIDLocator.btnSyncTerminalID),
            Element.ofSelector(TerminalIDLocator.btnApplyTerminalID),
            Element.ofSelector(TerminalIDLocator.btnCancelTerminalID),
            Element.ofSelector(TerminalIDLocator.btnClaimTerminalID),
            Element.ofSelector(TerminalIDLocator.btnSaveTerminalID),
            Element.ofSelector(TerminalIDLocator.btnInputNotesTerminalID),


        ];
    }


}