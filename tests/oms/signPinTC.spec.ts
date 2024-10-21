import {test} from "@playwright/test";
import SignPinPage from "../../src/modules/oms/signPin/signPin.page";

test.describe.serial("Landing Page", () => {

    test.beforeEach(async ({page}) => {
        let signPinPage = new SignPinPage(page);
        await signPinPage.navigateHere()
    })

    test("Validate Logic when User input valid/registered pin login",
        {tag: "@smokeTest @oms @signPin @positive"}, async ({page}) => {
            let signPinPage = new SignPinPage(page);

            await signPinPage.inputPinByTouch("22")
            await signPinPage.submitPin()
        }
    )
})