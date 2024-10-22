import {test} from "@playwright/test";
import SignPinPage from "../../../src/modules/oms/signPin/signPin.page";
import TerminalIDPage from "../../../src/modules/oms/terminalID/terminalID.page";


test.describe.serial("Landing Page", () => {

    test.beforeEach(async ({page}) => {
        let terminalIdPage = new TerminalIDPage(page);
        await terminalIdPage.navigateHere()
        await terminalIdPage.performTerminalID()
    })

    test("Validate Logic when User input valid/registered pin login",
        {tag: "@smokeTest @oms @signPin @positive"}, async ({page}) => {
            let signPinPage = new SignPinPage(page);

            await signPinPage.inputPinByTouch("22")
            await signPinPage.submitPin()
        }
    )
})