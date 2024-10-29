import signPinScenario from "./signPin.scenario";
import BaseOmsPage from "../base-oms-page";
import Element from "../../../base/objects/Element";
import SignPinLocator from "./signPin.locator";
import StartDayLocator from "../startDay/startDay.locator";
import DineInLocator from "../tableList/orderingDineIn/dineIn.locator";

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
    }

    async submitPinValidateStartDayYes(): Promise<void> {
        await this.expectVisible(SignPinLocator.buttonSignIn);
        await this.click(SignPinLocator.buttonSignIn);
        await this.click(SignPinLocator.validationSignInUserYes);
        await this.expectVisible(SignPinLocator.pageStartShift);
    }

    async submitPinValidateStartDayNo(): Promise<void> {
        await this.expectVisible(SignPinLocator.buttonSignIn);
        await this.click(SignPinLocator.buttonSignIn);
        await this.click(SignPinLocator.validationSignInUserNo);
        await this.expectVisible(SignPinLocator.buttonSignIn);
    }

    async submitPinNoUnregisteredUser(): Promise<void> {
        await this.expectVisible(SignPinLocator.buttonSignIn);
        await this.click(SignPinLocator.buttonSignIn);
        await this.expectVisible(SignPinLocator.userNotFoundPopup);
        await this.click(SignPinLocator.userNotFoundPopup);
    }

    async submitPin(): Promise<void> {
        await this.click(SignPinLocator.buttonSignIn);
        await this.click(SignPinLocator.validationSignInUserYes);
    }

    // async validatePinWithStartOrder(): Promise<void> {
    //     await this.click(SignPinLocator.buttonSignIn);
    //     await this.click(SignPinLocator.validationSignInUserYes);
    //     await this.waitForResponse("/shift");
    //     const isTableAcRoomVisible = await this.isVisible(DineInLocator.sectionTableAcRoom);
    //     console.log(
    //         "cek error" + isTableAcRoomVisible
    //     )
    //     if (!isTableAcRoomVisible) {
    //         await this.wait(300)
    //         await this.expectVisible(StartDayLocator.startingCash);
    //         await this.fill(StartDayLocator.startingCash, "20.000");
    //         await this.click(StartDayLocator.escapeKeyboard);
    //         await this.click(StartDayLocator.getLocatorStartDay("Start Shift"));
    //         await this.wait(1000);
    //         await this.click(StartDayLocator.getLocatorStartDay("Yes"));
    //         await this.waitForResponse("/table");
    //         await this.expectVisible(StartDayLocator.getLocatorStartDay("Ok"));
    //         await this.click(StartDayLocator.getLocatorStartDay("Ok"));
    //
    //     }
    //     // else {
    //     //     await this.click(DineInLocator.sectionTableAcRoom);
    //     // }
    //
    // }


}

