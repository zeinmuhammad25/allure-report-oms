import BaseLocator from "../../../../base/base-locator";

export default class LoginLocator extends BaseLocator {
    static loginGoogleButton: string = "(//div[contains(@class,'mat-ripple')])[1]";
    static loginFacebookButton: string = "(//div[contains(@class,'mat-ripple')])[2]";
    static loginGuestButton: string = "(//div[contains(@class,'mat-ripple')])[3]";

}