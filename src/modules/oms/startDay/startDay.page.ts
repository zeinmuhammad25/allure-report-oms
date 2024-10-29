import BaseOmsPage from "../base-oms-page";
import StartDayScenario from "./startDay.scenario";
import Element from "../../../base/objects/Element";
import StartDayLocator from "./startDay.locator";


export default class StartDayPage extends BaseOmsPage implements StartDayScenario {

    pageUrl = (): string => this.urls.get.generalPos.startShift;


    // Real URL =
    shouldHave(): Element[] {
        return [
            Element.ofSelector(StartDayLocator.startingCash),
            Element.ofSelector(StartDayLocator.getLocatorStartDay("Start Shift")),

        ];
    }

    async inputStartingCash(inputCash: string): Promise<void> {
        await this.expectVisible(StartDayLocator.startingCash);
        await this.fill(StartDayLocator.startingCash, inputCash);
        await this.click(StartDayLocator.escapeKeyboard);


    }

    async confirmStartingCash(): Promise<void> {
        await this.expectVisible(StartDayLocator.getLocatorStartDay("Start Shift"));
        await this.click(StartDayLocator.getLocatorStartDay("Start Shift"));
        await this.expectVisible(StartDayLocator.getLocatorStartDay("Yes"));
        await this.click(StartDayLocator.getLocatorStartDay("Yes"));

    }

    async popUpShiftInZero(): Promise<void> {
        await this.expectVisible(StartDayLocator.getLocatorStartDay("Start Shift"));
        await this.click(StartDayLocator.getLocatorStartDay("Start Shift"));
        await this.expectTextVisible("Shift In Total less than 0", true);

    }

    async notificationSuccessStartDay(): Promise<void> {
        const onVisible = async () => {
            console.log('Success StartDay');

            const buttonOk = await this.isVisible(StartDayLocator.getLocatorStartDay("Ok"));

            if (buttonOk) {
                // If the locator exists, Click Ok
                console.log('OK button is visible, click OK button');
                await this.click(StartDayLocator.getLocatorStartDay("Ok"));
            } else {
                // If OK locator is not found, log error
                console.log('Error: OK button not found!');
            }
        };

        await this.waitForVisible(StartDayLocator.notificationSuccess, onVisible, 10000, 5);
        await this.waitForResponse("/table");


    }

}