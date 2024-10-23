import {test} from "@playwright/test";
import SignPinPage from "../../../src/modules/oms/signPin/signPin.page";
import TerminalIDPage from "../../../src/modules/oms/terminalID/terminalID.page";
import SignPinLocator from "../../../src/modules/oms/signPin/signPin.locator";


test.describe.serial("Landing Page", () => {

    test.beforeEach(async ({page}) => {
        let terminalIdPage = new TerminalIDPage(page);
        await terminalIdPage.navigateHere();
        await terminalIdPage.performTerminalID();
    })

    test("Validate Logic when User input valid/registered pin login validate start yes",
        {tag: "@smokeTest @oms @signPin @positive"}, async ({page}) => {
            let signPinPage = new SignPinPage(page);

            await signPinPage.inputPinByTouch("22");
            await signPinPage.submitPinValidateStartDayYes();
        }
    )

    test("Validate Logic when User input valid/registered pin login validate start no",
        {tag: "@smokeTest @oms @signPin @negative"}, async ({page}) => {
            let signPinPage = new SignPinPage(page);

            await signPinPage.inputPinByTouch("22");
            await signPinPage.submitPinValidateStartDayNo();
        }
    )

    test("Validate Logic when User input invalid/unregistered pin login",
        {tag: "@smokeTest @oms @signPin @negative"}, async ({page}) => {
            let signPinPage = new SignPinPage(page);

            await signPinPage.inputPinByTouch("0000");
            await signPinPage.submitPinNoUnregisteredUser();
        }
    )

    test("Validate Logic when User input Alphabet pin login",
        {tag: "@smokeTest @oms @signPin @negative"}, async ({page}) => {
            let signPinPage = new SignPinPage(page);

            await signPinPage.inputPinByKeyboard("TEST");
            await signPinPage.submitPinNoUnregisteredUser();
        }
    )

    test("Validate Logic when User input alphanumeric pin login",
        {tag: "@smokeTest @oms @signPin @negative"}, async ({page}) => {
            let signPinPage = new SignPinPage(page);

            await signPinPage.inputPinByKeyboard("$^%*)");
            await signPinPage.submitPinNoUnregisteredUser();
        }
    )

    test("Validate Logic when User input 1 pin login",
        {tag: "@smokeTest @oms @signPin @positive"}, async ({page}) => {
            let signPinPage = new SignPinPage(page);

            await signPinPage.inputPinByTouch("1");
            await signPinPage.submitPinValidateStartDayYes();

        }
    )

    test("Validate Logic when User input 50 pin login",
        {tag: "@smokeTest @oms @signPin @positive"}, async ({page}) => {
            let signPinPage = new SignPinPage(page);

            await signPinPage.inputPinByTouch("12345678901234567890123456789012345678901234567890")
            await signPinPage.submitPinValidateStartDayYes();
        }
    )

    test("Validate Logic when User input > 50 pin login",
        {tag: "@smokeTest @oms @signPin @negative"}, async ({page}) => {
            let signPinPage = new SignPinPage(page);

            await signPinPage.inputPinByTouch("123456789012345678901234567890123456789012345678901232123123")
            await signPinPage.submitPinNoUnregisteredUser();
        }
    )

    test("Validate Logic when User clear pin field",
        {tag: "@smokeTest @oms @signPin @positive"}, async ({page}) => {
            let signPinPage = new SignPinPage(page);

            await signPinPage.inputPinByTouch("1234")
            await signPinPage.clearPin();
        }
    )


})