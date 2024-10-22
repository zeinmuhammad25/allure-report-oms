import TerminalIDScenario from "./terminalID.scenario";
import BaseOmsPage from "../base-oms-page";
import Element from "../../../base/objects/Element";
import TerminalIDLocator from "./terminalID.locator";

export default class TerminalIDPage extends BaseOmsPage implements TerminalIDScenario {


    pageUrl = (): string => this.urls.get.terminalId.terminalList;

    // Real URL =
    shouldHave(): Element[] {
        return [
            Element.ofSelector(TerminalIDLocator.getTerminalID(1)),
            Element.ofSelector(TerminalIDLocator.getTerminalID(2)),
            Element.ofSelector(TerminalIDLocator.getTerminalID(3)),
            Element.ofSelector(TerminalIDLocator.getTerminalID(4)),
            Element.ofSelector(TerminalIDLocator.btnSyncTerminalID),

        ];
    }

    async selectTerminalID(): Promise<void> {
        await this.expectVisible(TerminalIDLocator.getTerminalID(1));
        await this.click(TerminalIDLocator.getTerminalID(1));

    }

    async applyTerminalID(): Promise<void> {
        await this.expectVisible(TerminalIDLocator.btnApplyTerminalID);
        await this.click(TerminalIDLocator.btnApplyTerminalID);
    }

    async claimTerminalID(): Promise<void> {
        await this.expectVisible(TerminalIDLocator.btnClaimTerminalID);
        await this.click(TerminalIDLocator.btnClaimTerminalID);

    }

    async inputNotesTerminalID(): Promise<void> {
        await this.expectVisible(TerminalIDLocator.btnInputNotesTerminalID);
        await this.click(TerminalIDLocator.btnInputNotesTerminalID);
        await this.fill(TerminalIDLocator.btnInputNotesTerminalID, "Oms1");

    }

    async saveTerminalID(): Promise<void> {
        await this.expectVisible(TerminalIDLocator.btnSaveTerminalID);
        await this.click(TerminalIDLocator.btnSaveTerminalID);
    }

    async performTerminalID(): Promise<void> {
        await this.expectVisible(TerminalIDLocator.getTerminalID(1));
        await this.click(TerminalIDLocator.getTerminalID(1));
        await this.expectVisible(TerminalIDLocator.btnApplyTerminalID);
        await this.click(TerminalIDLocator.btnApplyTerminalID);
        await this.expectVisible(TerminalIDLocator.btnClaimTerminalID);
        await this.click(TerminalIDLocator.btnClaimTerminalID);
        await this.expectVisible(TerminalIDLocator.btnInputNotesTerminalID);
        await this.click(TerminalIDLocator.btnInputNotesTerminalID);
        await this.fill(TerminalIDLocator.btnInputNotesTerminalID, "Oms1");
        await this.expectVisible(TerminalIDLocator.btnSaveTerminalID);
        await this.click(TerminalIDLocator.btnSaveTerminalID);
    }
}