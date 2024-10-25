import {test} from "@playwright/test";
import TerminalIDPage from "../../../src/modules/oms/terminalID/terminalID.page";
import TerminalIDLocator from "../../../src/modules/oms/terminalID/terminalID.locator";

test.describe.serial("Terminal ID Test", () => {

    test.beforeEach(async ({page}) => {
        let terminalIdPage = new TerminalIDPage(page);
        await terminalIdPage.navigateHere();
    })

    test("Validate that the user successfully applies for a terminal ID with notes input containing only numeric characters",
        {tag: "@smokeTest @oms @terminalID @positive"}, async ({page}) => {
            let terminalIdPage = new TerminalIDPage(page);

            await terminalIdPage.selectTerminalID();
            await terminalIdPage.applyTerminalID();
            await terminalIdPage.claimTerminalID();
            await terminalIdPage.inputNotesTerminalID("12345");
            await terminalIdPage.saveTerminalID();
        }
    )

    test("VValidate that the user successfully applies for a terminal ID with notes input containing only alphabetic character",
        {tag: "@smokeTest @oms @terminalID @positive"}, async ({page}) => {
            let terminalIdPage = new TerminalIDPage(page);

            await terminalIdPage.selectTerminalID();
            await terminalIdPage.applyTerminalID();
            await terminalIdPage.claimTerminalID();
            await terminalIdPage.inputNotesTerminalID("Nadin");
            await terminalIdPage.saveTerminalID();

        }
    )

    test("Validate that the user successfully applies for a terminal ID with notes input containing only special characters",
        {tag: "@smokeTest @oms @terminalID @positive"}, async ({page}) => {
            let terminalIdPage = new TerminalIDPage(page);

            await terminalIdPage.selectTerminalID();
            await terminalIdPage.applyTerminalID();
            await terminalIdPage.claimTerminalID();
            await terminalIdPage.inputNotesTerminalID("!@#$%^");
            await terminalIdPage.saveTerminalID();

        }
    )

    test("Validate that the user successfully applies for a terminal ID with notes input containing a combination of alphanumeric characters",
        {tag: "@smokeTest @oms @terminalID @positive"}, async ({page}) => {
            let terminalIdPage = new TerminalIDPage(page);

            await terminalIdPage.selectTerminalID();
            await terminalIdPage.applyTerminalID();
            await terminalIdPage.claimTerminalID();
            await terminalIdPage.inputNotesTerminalID("Nadin 123");
            await terminalIdPage.saveTerminalID();

        }
    )

    test("Validate that the user fails to apply for a terminal ID if notes are not inputted",
        {tag: "@smokeTest @oms @terminalID @negative"}, async ({page}) => {
            let terminalIdPage = new TerminalIDPage(page);

            await terminalIdPage.selectTerminalID();
            await terminalIdPage.applyTerminalID();
            await terminalIdPage.claimTerminalID();
            await terminalIdPage.inputNotesTerminalID("");
            await terminalIdPage.expectDisabled(TerminalIDLocator.btnSaveTerminalID);


        }
    )
})


