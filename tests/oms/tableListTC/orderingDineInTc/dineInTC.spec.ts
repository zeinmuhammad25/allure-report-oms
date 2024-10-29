import {test} from '@playwright/test';
import SignPinPage from "../../../../src/modules/oms/signPin/signPin.page";
import TerminalIDPage from "../../../../src/modules/oms/terminalID/terminalID.page";
import DineInPage from "../../../../src/modules/oms/tableList/orderingDineIn/dineIn.page";
test.setTimeout(80000);

test.describe.serial("Landing Page", () => {
    test.beforeEach(async ({page}) => {
        let terminalIdPage = new TerminalIDPage(page);
        let signPinPage = new SignPinPage(page);

        await terminalIdPage.navigateHere();
        await terminalIdPage.performTerminalID();
        await signPinPage.wait(2000)
        await signPinPage.inputPinByTouch("22");
        await signPinPage.submitPin();
        // await signPinPage.validatePinWithStartOrder();
    })

    test("Validate Logic book table",
        {tag: "@smokeTest @oms @StartDay @positive"}, async ({page}) => {
            let dineIn = new DineInPage(page);

            await dineIn.bookTable()


        }
    )

})