import { test } from "../injection";

test.setTimeout(100000);
test.describe("Start Day Test", () => {

    test.beforeEach(async ({ terminalID, signPin }) => {
        await terminalID.goHere();
        await terminalID.performTerminalID();
        await signPin.inputPinByTouch("22");
        await signPin.submitPinValidateStartDayYes();
    });

    test.afterEach(async ({ startDay }) => {
        await Promise.all([
            await startDay.deleteDataStartDay()
        ]);
    });

    test("Validate Logic when User Not input Starting Cash",
        { tag: "@smokeTest @oms @StartDay @negative" }, async ({ startDay }) => {
            await startDay.inputStartingCash("");
            await startDay.popUpShiftInZero();
        }
    );

    test("Validate Logic when User input Value 0 in Starting Cash",
        { tag: "@smokeTest @oms @StartDay @negative" }, async ({ startDay }) => {
            await startDay.inputStartingCash("0");
            await startDay.popUpShiftInZero();

        }
    );

    test("Validate Logic when User input number in Starting Cash",
        { tag: "@smokeTest @oms @StartDay @positive" }, async ({ startDay }) => {
            await startDay.inputStartingCash("20.000");
            await startDay.confirmStartingCash();
            await startDay.notificationSuccessStartDay();
        }
    );
});



