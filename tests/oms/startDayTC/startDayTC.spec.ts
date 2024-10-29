import {test} from "@playwright/test";
import SignPinPage from "../../../src/modules/oms/signPin/signPin.page";
import TerminalIDPage from "../../../src/modules/oms/terminalID/terminalID.page";
import StartDayPage from "../../../src/modules/oms/startDay/startDay.page";

test.setTimeout(100000);
test.describe.serial("Start Day Test", () => {

    test.beforeEach(async ({page}) => {
        let terminalIdPage = new TerminalIDPage(page);
        let signPinPage = new SignPinPage(page);

        await terminalIdPage.navigateHere();
        await terminalIdPage.performTerminalID();
        await signPinPage.wait(2000)
        await signPinPage.inputPinByTouch("22");
        await signPinPage.submitPinValidateStartDayYes();
    })

    test("Validate Logic when User input number in Starting Cash",
        {tag: "@smokeTest @oms @StartDay @positive"}, async ({page}) => {
            let startDay = new StartDayPage(page);

            await startDay.inputStartingCash();
            await startDay.confirmStartingCash();
            await startDay.notificationSuccessStartDay();

        }
    )


})
