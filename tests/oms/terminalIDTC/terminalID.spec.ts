import { test } from "../injection";

test.describe("Terminal ID Test", () => {
    const tags = "@smokeTest @oms @terminalID ";

    test.beforeEach(async ({ terminalID }) => {
        await terminalID.goHere();
    });

    test("[TC_0201001] Validate that the user successfully applies for a terminal ID with notes input containing only numeric characters",
        { tag: tags + "@positive" }, async ({ terminalID }) => {
            await terminalID.selectTerminalID();
            await terminalID.applyTerminalID();
            await terminalID.claimTerminalID();
            await terminalID.inputNotesTerminalID("12345");
            await terminalID.saveTerminalID();
        });

    test("[TC_0201002] VValidate that the user successfully applies for a terminal ID with notes input containing only alphabetic character",
        { tag: tags + "@positive" }, async ({ terminalID }) => {
            await terminalID.selectTerminalID();
            await terminalID.applyTerminalID();
            await terminalID.claimTerminalID();
            await terminalID.inputNotesTerminalID("Nadin");
            await terminalID.saveTerminalID();

        });

    test("[TC_0201003] Validate that the user successfully applies for a terminal ID with notes input containing only special characters",
        { tag: tags + "@positive" }, async ({ terminalID }) => {
            await terminalID.selectTerminalID();
            await terminalID.applyTerminalID();
            await terminalID.claimTerminalID();
            await terminalID.inputNotesTerminalID("!@#$%^");
            await terminalID.saveTerminalID();
        });

    test("[TC_0201004] Validate that the user successfully applies for a terminal ID with notes input containing a combination of alphanumeric characters",
        { tag: tags + "@positive" }, async ({ terminalID }) => {
            await terminalID.selectTerminalID();
            await terminalID.applyTerminalID();
            await terminalID.claimTerminalID();
            await terminalID.inputNotesTerminalID("Nadin 123");
            await terminalID.saveTerminalID();
        });

    test("[TC_0201005] Validate that the user fails to apply for a terminal ID if notes are not inputted",
        { tag: tags + "@negative" }, async ({ terminalID }) => {
            await terminalID.selectTerminalID();
            await terminalID.applyTerminalID();
            await terminalID.claimTerminalID();
            await terminalID.inputNotesTerminalID("");
            await terminalID.disableButtonSave();
        });
});




