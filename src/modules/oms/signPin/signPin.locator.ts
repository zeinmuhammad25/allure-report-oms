import BaseLocator from "../../../base/base-locator";

export default class SignPinLocator extends BaseLocator {
    //pin Section
    static fieldPin: string = "//input[@id='mat-input-0']";
    static buttonPin= (key:number|'CLR'):string => `//span[normalize-space()='${key}']`;
    static buttonSignIn: string = "//span[normalize-space()='SIGN IN']";

    //Quick service Section
    static quickServiceListBtn: string = "//span[contains(text(),'QUICK SERVICE')]";
    static tableListSingIn1: string = "//span[contains(text(),'AC ROOM')]";
    static tableListSingIn2: string = "//span[contains(text(),'SMOKING ROOM')]";
    static esbOrderReport: string = "//*[name()='path' and contains(@class,'ng-tns-c7-')]";

    //log Section
    static errorReport: string = "//span[normalize-space()='ERROR REPORT']";
    static refreshErrorReport: string = "//span[normalize-space()='REFRESH']";
    static syncUserSignPinLog: string = "//span[normalize-space()='SYNC USER']";
    static closeLogSignPin: string = "//span[normalize-space()='Close Log']";
}