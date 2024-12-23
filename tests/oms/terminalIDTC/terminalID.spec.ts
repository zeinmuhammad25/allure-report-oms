import {test} from "../injection";

test.describe.serial("Terminal ID Test", () => {

    test.beforeEach(async ({terminalID}) => {
        await terminalID.goHere();
    });

    test("Validate that the user successfully applies for a terminal ID with notes input containing only numeric characters",
        {tag: "@smokeTest @oms @terminalID @positive"}, async ({terminalID}) => {
            await terminalID.selectTerminalID();
            await terminalID.applyTerminalID();
            await terminalID.claimTerminalID();
            await terminalID.inputNotesTerminalID("12345");
            await terminalID.saveTerminalID();
        }
    );

    test("VValidate that the user successfully applies for a terminal ID with notes input containing only alphabetic character",
        {tag: "@smokeTest @oms @terminalID @positive"}, async ({terminalID}) => {
            await terminalID.selectTerminalID();
            await terminalID.applyTerminalID();
            await terminalID.claimTerminalID();
            await terminalID.inputNotesTerminalID("Nadin");
            await terminalID.saveTerminalID();

        }
    );

    test("Validate that the user successfully applies for a terminal ID with notes input containing only special characters",
        {tag: "@smokeTest @oms @terminalID @positive"}, async ({terminalID}) => {
            await terminalID.selectTerminalID();
            await terminalID.applyTerminalID();
            await terminalID.claimTerminalID();
            await terminalID.inputNotesTerminalID("!@#$%^");
            await terminalID.saveTerminalID();
        }
    );

    test("Validate that the user successfully applies for a terminal ID with notes input containing a combination of alphanumeric characters",
        {tag: "@smokeTest @oms @terminalID @positive"}, async ({terminalID}) => {
            await terminalID.selectTerminalID();
            await terminalID.applyTerminalID();
            await terminalID.claimTerminalID();
            await terminalID.inputNotesTerminalID("Nadin 123");
            await terminalID.saveTerminalID();
        }
    );

    test("Validate that the user fails to apply for a terminal ID if notes are not inputted",
        {tag: "@smokeTest @oms @terminalID @negative"}, async ({terminalID}) => {
            await terminalID.selectTerminalID();
            await terminalID.applyTerminalID();
            await terminalID.claimTerminalID();
            await terminalID.inputNotesTerminalID("");
            await terminalID.disableButtonSave();
        }
    );
});




