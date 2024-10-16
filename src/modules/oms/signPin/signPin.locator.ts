import BaseLocator from "../../../base/base-locator";

export default class SignPinLocator extends BaseLocator {
    static fieldPin: string = "//input[@id='mat-input-0']";
    static buttonPin1: string = "//span[normalize-space()='1']";
    static buttonPin2: string = "//span[normalize-space()='2']";
    static buttonPin3: string = "//span[normalize-space()='3']";
    static buttonPin4: string = "//span[normalize-space()='4']";
    static buttonPin5: string = "//span[normalize-space()='5']";
    static buttonPin6: string = "//span[normalize-space()='6']";
    static buttonPin7: string = "//span[normalize-space()='7']";
    static buttonPin8: string = "//span[normalize-space()='8']";
    static buttonPin9: string = "//span[normalize-space()='9']";
    static buttonPin0: string = "//span[normalize-space()='0']";
    static buttonClr: string = "//span[normalize-space()='CLR']";
    static buttonSignIn: string = "//span[normalize-space()='SIGN IN']']";
    static quickServiceListBtn: string = "//span[contains(text(),'QUICK SERVICE')]";
    static tableListSingIn1: string = "//span[contains(text(),'AC ROOM')]";
    static tableListSingIn2: string = "//span[contains(text(),'SMOKING ROOM')]";
    static esbOrderReport: string = "//*[name()='path' and contains(@class,'ng-tns-c7-')]";
    static errorReport: string = "//span[normalize-space()='ERROR REPORT']";
    static refreshErrorReport: string = "//span[normalize-space()='REFRESH']";
    static syncUserSignPinLog: string = "//span[normalize-space()='SYNC USER']";
    static closeLogSignPin: string = "//span[normalize-space()='Close Log']";
}