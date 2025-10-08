import {test} from "../injection";

test.describe.serial("Sign PIN", () => {
    const tags = "@smokeTest @oms @signPin ";

    test.beforeEach(async ({terminalID}) => {
        await terminalID.goHere();
        await terminalID.performTerminalID();
    });

    test("[TC_0202001] Validate Logic when User input valid/registered pin login validate start yes",
        {tag: tags + "@positive"}, async ({signPin}) => {
            await signPin.inputPinByTouch("22");
            await signPin.submitPinValidateStartDayYes();
            await signPin.closePopUpAlert();
        });

    test("[TC_020200?] Validate Logic when User input valid/registered pin login validate start no",
        {tag: tags + "@negative"}, async ({signPin}) => {
            await signPin.inputPinByTouch("22");
            await signPin.submitPinValidateStartDayNo();
        });

    test("[TC_0202002] Validate Logic when User input invalid/unregistered pin login",
        {tag: tags + "@negative"}, async ({signPin}) => {
            await signPin.inputPinByTouch("99999");
            await signPin.submitPinNoUnregisteredUser();
        });

    test("[TC_0202003] Validate Logic when User input Alphabet pin login",
        {tag: tags + "@negative"}, async ({signPin}) => {
            await signPin.inputPinByKeyboard("TEST");
            await signPin.submitPinNoUnregisteredUser();
        });

    test("[TC_0202004] Validate Logic when User input alphanumeric pin login",
        {tag: tags + "@negative"}, async ({signPin}) => {
            await signPin.inputPinByKeyboard("$^%*)");
            await signPin.submitPinNoUnregisteredUser();
        });

    test("[TC_0202005] Validate Logic when User input 1 pin login",
        {tag: tags + "@positive"}, async ({signPin}) => {
            await signPin.inputPinByTouch("1");
            await signPin.submitPinValidateStartDayYes();
        });

    test("[TC_0202006] Validate Logic when User input 50 pin login",
        {tag: tags + "@positive"}, async ({signPin}) => {
            await signPin.inputPinByTouch("12345678901234567890123456789012345678901234567890");
            await signPin.submitPinValidateStartDayYes();
        });

    test("[TC_0202007] Validate Logic when User input > 50 pin login",
        {tag: tags + "@negative"}, async ({signPin}) => {
            await signPin.inputPinByTouch("123456789012345678901234567890123456789012345678901232123123");
            await signPin.submitPinNoUnregisteredUser();
        });

    test("[TC_0202008] Validate Logic when User clear pin field",
        {tag: tags + "@positive"}, async ({signPin}) => {
            await signPin.inputPinByTouch("1234");
            await signPin.clearPin();
        });
});