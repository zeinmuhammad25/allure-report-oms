import BaseScenario from "../../../../base/base-scenario";

export default interface TroubleshootScenario extends BaseScenario {
    testPrint(): Promise<void>;

    setStation(values: "all" | string | string[], unselect?: boolean): Promise<number>;

    openDrawerTest(): Promise<void>;

    testPrintMenuAndBill(): Promise<void>;

    showDropDownFormTestPrint(index: number): Promise<void>;

    valueDropDownFormTestPrint(value: string): Promise<void>;

    stationInForm(value: string): Promise<void>;

    actionButtonForm(stationName: "Test Print Bill" | "Test Print Menu" | "Cancel");

    closePopUpTroubleShoot(): Promise<void>;
}