import BaseScenario from "../../../base/base-scenario";
import {ToolsTabs} from "./ToolsTabs";

export default interface ToolsScenario extends BaseScenario {
    selectTab(tabName: ToolsTabs): Promise<void>;

    clickFilterDate(): Promise<void>;

    selectMonthAndYear(side: "left" | "right", nav: "prev" | "next"): Promise<void>;

    datePickerFilterDate(day: string | number, side?: "left" | "right"): Promise<void>;

    applyDateInFilterDate(): Promise<void>;

    printReport(): Promise<void>;

    cekUpdate(): Promise<void>;

    closeUpdate(): Promise<void>;

    activateTrialMode(): Promise<void>;

    deActivateTrialMode(): Promise<void>;

    setActivateTrialMode(): Promise<void>;

    setDeActivateTrialMode(): Promise<void>;

    cancelActiveAndDeActive(): Promise<void>;

}