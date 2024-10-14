import BaseLocator from "../../../base/base-locator";

export default class TerminalIDLocator extends BaseLocator {
    static terminalID01: string = "//b[normalize-space()='Terminal ID 01']";
    static terminalID02: string = "//b[normalize-space()='Terminal ID 02']";
    static terminalID03: string = "//b[normalize-space()='Terminal ID 03']";
    static terminalID04: string = "//b[normalize-space()='Terminal ID 04']";
    static btnSyncTerminalID: string = "//label[normalize-space()='Sync']";
    static btnApplyTerminalID: string = "//span[@class='mat-button-wrapper' and text()='Apply']";
    static btnCancelTerminalID: string = "//span[normalize-space()='Cancel']";
    static btnClaimTerminalID: string = "//span[normalize-space()='Claim']";
    static btnSaveTerminalID: string = "//span[normalize-space()='Save']";
    static btnInputNotesTerminalID: string = "//input[@placeholder='Input notes']";
}