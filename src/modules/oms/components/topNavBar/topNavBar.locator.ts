import BaseLocator from "../../../../base/base-locator";

export default class TopNavBarLocator extends BaseLocator {

    static profileButton: string = "//button[@aria-haspopup='true']//span[@class='mat-button-wrapper']";
    static signOutButton: string = "//span[contains(text(),'Sign Out')]";
    static errorLog: string = "//div[@class='d-flex flex-grow-1 h-100 justify-content-end align-items-center']//*[name()='svg']";
    static buttonSelectLog = (SelectLog: string): string => `//span[normalize-space()='${SelectLog}']`;
    static buttonSelectEsbOrderReport = (SelectReport: string): string => `//div[contains(text(),'${SelectReport}')]`;
    static buttonNextSectionLog: string = "//*[name()='path' and contains(@d,'M10 6L8.59')]";
    static buttonBackSectionLog: string = "//*[name()='path' and contains(@d,'M15.41 7.4')]";
    static buttonSyncOrCloseLog = (SyncOrCloseLog: string): string => `//span[normalize-space()='${SyncOrCloseLog}']`;
    static buttonMenuSideBar: string = "//mat-icon[normalize-space()='menu']";
    static popupVerifySyncUser = (SelectButtonVerifySync: string): string => `//span[normalize-space()='${SelectButtonVerifySync}']`;
    static popSyncComplete: string = "//span[normalize-space()='Ok']";
}

