import BaseLocator from "../../../base/base-locator";

export default class TerminalIDLocator extends BaseLocator {

    static getTerminalID = (terminalNumber: number): string => `//b[normalize-space()='Terminal ID 0${terminalNumber}']`;
    static btnSyncTerminalID: string = "//label[normalize-space()='Sync']";
    static btnApplyTerminalID: string = "//span[@class='mat-button-wrapper' and text()='Apply']";
    static btnCancelTerminalID: string = "//span[normalize-space()='Cancel']";
    static btnClaimTerminalID: string = "//span[normalize-space()='Claim']";
    static btnSaveTerminalID: string = "//span[normalize-space()='Save']";
    static btnInputNotesTerminalID: string = "//input[@placeholder='Input notes']";
    static verifySuccessApplyTerminalID: string = "//a[normalize-space()='OPEN']";


}