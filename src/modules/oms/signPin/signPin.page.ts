import signPinScenario from "./signPin.scenario";
import BaseOmsPage from "../base-oms-page";
import Element from "../../../base/objects/Element";
import SignPinLocator from "./signPin.locator";

export default class SignPinPage extends BaseOmsPage implements signPinScenario {

    pageUrl = (): string => this.urls.get.generalPos.loginPage;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(SignPinLocator.fieldPin),
            Element.ofSelector(SignPinLocator.buttonPin(1)),
            Element.ofSelector(SignPinLocator.buttonPin(2)),
            Element.ofSelector(SignPinLocator.buttonPin("CLR")),
            Element.ofSelector(SignPinLocator.buttonSignIn),
            Element.ofSelector(SignPinLocator.validationSignInUserYes),
            Element.ofSelector(SignPinLocator.validationSignInUserNo),
            Element.ofSelector(SignPinLocator.userNotFoundPopup),
            Element.ofSelector(SignPinLocator.quickServiceListBtn),
            Element.ofSelector(SignPinLocator.tableListSingIn1),
            Element.ofSelector(SignPinLocator.tableListSingIn2),
            Element.ofSelector(SignPinLocator.esbOrderReport),
            Element.ofSelector(SignPinLocator.errorReport),
            Element.ofSelector(SignPinLocator.refreshErrorReport),
            Element.ofSelector(SignPinLocator.syncUserSignPinLog),
            Element.ofSelector(SignPinLocator.closeLogSignPin),
        ];
    }

    async inputPinByTouch(pin: string): Promise<void> {

        const pinArray = pin.split("")

        for (let i = 0; i < pinArray.length; i++) {
            await this.expectVisible(SignPinLocator.buttonPin(Number(pinArray[i])));
            await this.click(SignPinLocator.buttonPin(Number(pinArray[i])));
        }
    }

    async inputPinByKeyboard(pin: string): Promise<void> {
        await this.expectVisible(SignPinLocator.fieldPin);
        await this.click(SignPinLocator.fieldPin);
        await this.fill(SignPinLocator.fieldPin, pin);
    }

    async clearPin(): Promise<void> {
        await this.expectVisible(SignPinLocator.buttonPin("CLR"));
        await this.click(SignPinLocator.buttonPin("CLR"));
        await this.wait(2000)
    }

    async submitPinValidateStartDayYes(): Promise<void> {
        await this.expectVisible(SignPinLocator.buttonSignIn);
        await this.click(SignPinLocator.buttonSignIn);
        await this.wait(1000);
        await this.click(SignPinLocator.validationSignInUserYes);
        await this.expectVisible(SignPinLocator.pageStartShift);
        await this.wait(1000);
    }

    async submitPinValidateStartDayNo(): Promise<void> {
        await this.expectVisible(SignPinLocator.buttonSignIn);
        await this.click(SignPinLocator.buttonSignIn);
        await this.wait(1000);
        await this.click(SignPinLocator.validationSignInUserNo);
        await this.expectVisible(SignPinLocator.buttonSignIn);
        await this.wait(1000);
    }

    async submitPinNoUnregisteredUser(): Promise<void> {
        await this.expectVisible(SignPinLocator.buttonSignIn);
        await this.click(SignPinLocator.buttonSignIn);
        await this.wait(1000);
        await this.expectVisible(SignPinLocator.userNotFoundPopup);
        await this.click(SignPinLocator.userNotFoundPopup);
        await this.wait(1000);
    }

}

