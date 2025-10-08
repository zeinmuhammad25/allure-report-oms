import SignPinScenario from "./signPin.scenario";
import BaseOmsPage from "../base-oms-page";
import Element from "../../../base/objects/Element";
import SignPinLocator from "./signPin.locator";
import StartDayLocator from "../startDay/startDay.locator";


export default class SignPinPage extends BaseOmsPage implements SignPinScenario {

    pageUrl = (): string => this.urls.get.generalPos.loginPage;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(SignPinLocator.fieldPin),
            Element.ofSelector(SignPinLocator.buttonPin(1)),
            Element.ofSelector(SignPinLocator.buttonPin(2)),
            Element.ofSelector(SignPinLocator.buttonPin("CLR")),
            Element.ofSelector(SignPinLocator.buttonSignIn)
        ];
    }

    async inputPinByTouch(pin: string): Promise<void> {

        const pinArray = pin.split("");

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
        const isValidationVisible = await this.isVisible(SignPinLocator.validationSignInUserYes);
        if (isValidationVisible) {
            console.log("✅ Validation 'SignInUserYes' muncul — lanjut proses start shift.");
            await this.click(SignPinLocator.validationSignInUserYes);
            await this.expectVisible(SignPinLocator.pageStartShift);
        } else {
            console.log("⚠️ Validation 'SignInUserYes' tidak muncul — skip start shift popup.");
        }
    }


    async submitPinValidateStartDayNo(): Promise<void> {
        await this.expectVisible(SignPinLocator.buttonSignIn);
        await this.click(SignPinLocator.buttonSignIn);
        const isValidationVisible = await this.isVisible(SignPinLocator.validationSignInUserNo);
        if (isValidationVisible) {
            console.log("✅ Validation 'SignInUserNo' muncul — lanjut proses sign in tanpa start shift.");
            await this.click(SignPinLocator.validationSignInUserNo);
            await this.expectVisible(SignPinLocator.buttonSignIn);
        } else {
            console.log("⚠️ Validation 'SignInUserNo' tidak muncul — lanjut tanpa popup validasi.");
        }
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
        await this.wait(1000);
        await this.waitForResponse("/user/login");
    }

    async validateShowStarCash(inputCash: string): Promise<void> {
        await this.click(SignPinLocator.buttonSignIn);
        await this.wait(800);
        const isYesButtonVisible = await this.isVisible(SignPinLocator.validationSignInUserYes);
        if (isYesButtonVisible) {
            await this.click(SignPinLocator.validationSignInUserYes);
        }
        await this.wait(800);
        const isPopUpCheckCustomerPaymentsVisible = await this.isVisible(SignPinLocator.popUpCheckCustomerPayment);
        if (isPopUpCheckCustomerPaymentsVisible) {
            await this.click(SignPinLocator.buttonPopUpNotNow);
        }
        await this.wait(800);
        const isPopUpWaringVisible = await this.isVisible(SignPinLocator.popUpAlert);
        if (isPopUpWaringVisible) {
            await this.click(SignPinLocator.closePopUpAlert);
        }
        await this.wait(800);
        const isStartingCashVisible = await this.isVisible(StartDayLocator.startingCash);
        if (isStartingCashVisible) {
            await this.fill(StartDayLocator.startingCash, inputCash);
            await this.click(StartDayLocator.escapeKeyboard);
            await this.expectVisible(StartDayLocator.getLocatorStartDay("Start Shift"));
            await this.click(StartDayLocator.getLocatorStartDay("Start Shift"));
            await this.expectVisible(StartDayLocator.getLocatorStartDay("Yes"));
            await this.click(StartDayLocator.getLocatorStartDay("Yes"));

            const onVisible = async () => {
                const buttonOk = await this.isVisible(StartDayLocator.getLocatorStartDay("Close"));
                if (buttonOk) {
                    await this.click(StartDayLocator.getLocatorStartDay("Close"));
                }
            };
            await this.waitForVisible(StartDayLocator.notificationSuccess, onVisible, 10000, 10);
            await this.waitForResponse("/table");
        } else {
            await this.expectTextVisible("AC ROOM");
            await this.expectTextVisible("SMOKING ROOM");
        }
    }

    async validateNotNowCheckCustomerPayments(): Promise<void> {
        const isPopUpCheckCustomerPaymentsVisible = await this.isVisible(SignPinLocator.popUpCheckCustomerPayment);
        if (isPopUpCheckCustomerPaymentsVisible) {
            await this.click(SignPinLocator.buttonPopUpNotNow);
        }
    }

    async closePopUpAlert(): Promise<void> {
        const isPopupVisible = await this.isVisible(SignPinLocator.popUpAlert);

        if (isPopupVisible) {
            await this.expectVisible(SignPinLocator.closePopUpAlert);
            await this.click(SignPinLocator.closePopUpAlert);
            console.log("✅ Popup alert ditemukan dan berhasil ditutup");
        } else {
            console.log("ℹ️ Tidak ada popup alert, lanjut step berikutnya");
        }
    }

    async storeAuthState(): Promise<void> {
        await this._page.context().storageState({path: this.configs.get.storageState});
    }

    async validateShowStarCashClassic(inputCash: string): Promise<void> {
        await this.click(SignPinLocator.buttonSignIn);
        await this.wait(800);
        const isYesButtonVisible = await this.isVisible(SignPinLocator.validationSignInUserYes);
        if (isYesButtonVisible) {
            await this.click(SignPinLocator.validationSignInUserYes);
        }
        await this.wait(800);
        const isPopUpCheckCustomerPaymentsVisible = await this.isVisible(SignPinLocator.popUpCheckCustomerPayment);
        if (isPopUpCheckCustomerPaymentsVisible) {
            await this.click(SignPinLocator.buttonPopUpNotNow);
        }
        await this.wait(800);

        const isStartingCashVisible = await this.isVisible(StartDayLocator.startingCash);
        if (isStartingCashVisible) {
            await this.fill(StartDayLocator.startingCash, inputCash);
            await this.click(StartDayLocator.escapeKeyboard);
            await this.expectVisible(StartDayLocator.getLocatorStartDay("Start Shift"));
            await this.click(StartDayLocator.getLocatorStartDay("Start Shift"));
            await this.expectVisible(StartDayLocator.getLocatorStartDay("Yes"));
            await this.click(StartDayLocator.getLocatorStartDay("Yes"));

            const onVisible = async () => {
                const buttonOk = await this.isVisible(StartDayLocator.getLocatorStartDay("Close"));
                if (buttonOk) {
                    await this.click(StartDayLocator.getLocatorStartDay("Close"));
                }
            };
            await this.waitForVisible(StartDayLocator.notificationSuccess, onVisible, 10000, 10);
            await this.waitForResponse("/table");
        } else {
            await this.expectVisible(SignPinLocator.quickServicePopup);
            await this.click(SignPinLocator.quickServicePopup);
        }

    }
}