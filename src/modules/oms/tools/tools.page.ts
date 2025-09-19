import Element from "../../../base/objects/Element";
import BaseOmsPage from "../base-oms-page";
import {ToolsTabs} from "./ToolsTabs";
import ToolsScenario from "./tools.scenario";
import ToolsLocator from "./tools.locator";

export default class ToolsPage extends BaseOmsPage implements ToolsScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(ToolsLocator.nextButton),
            Element.ofSelector(ToolsLocator.previousButton)
        ];
    }

    async selectTab(tabName: ToolsTabs): Promise<void> {
        await this.expectVisible(ToolsLocator.tabButton(tabName));
        await this.click(ToolsLocator.tabButton(tabName));
    }

    async nextTab(): Promise<void> {
        await this.expectVisible(ToolsLocator.nextButton);
        await this.click(ToolsLocator.nextButton);
    }

    async previousTab(): Promise<void> {
        await this.expectVisible(ToolsLocator.previousButton);
        await this.click(ToolsLocator.previousButton);
    }

    //report
    async clickFilterDate(): Promise<void> {
        await this.expectVisible(ToolsLocator.btnDateReport);
        await this.click(ToolsLocator.btnDateReport);
    }

    async selectMonthAndYear(side: "left" | "right", nav: "prev" | "next"): Promise<void> {
        await this.expectVisible(ToolsLocator.selectDateMonthAndYearCalendarNav(side, nav));
        await this.click(ToolsLocator.selectDateMonthAndYearCalendarNav(side, nav));
    }

    async datePickerFilterDate(day: string | number, side?: "left" | "right"): Promise<void> {
        const cell = side === "left"
            ? ToolsLocator.leftCalendarCell(day)
            : ToolsLocator.rightCalendarCell(day);

        await this.expectVisible(cell);
        await this.click(cell);
    }

    async applyDateInFilterDate(): Promise<void> {
        await this.expectVisible(ToolsLocator.btnApplyDate);
        await this.click(ToolsLocator.btnApplyDate);
    }

    async printReport(): Promise<void> {
        await this.expectVisible(ToolsLocator.printReport);
        await this.click(ToolsLocator.printReport);
        await this.click(ToolsLocator.closerPopUp);
    }

    //softwareUpdate
    async cekUpdate(): Promise<void> {
        await this.expectVisible(ToolsLocator.checkForUpdate);
        await this.click(ToolsLocator.checkForUpdate);
    }

    async closeUpdate(): Promise<void> {
        await this.expectVisible(ToolsLocator.closePopUpSoftwareUpdate);
        await this.click(ToolsLocator.closePopUpSoftwareUpdate);
    }

    //trialMode
    async activateTrialMode(): Promise<void> {
        await this.expectVisible(ToolsLocator.activateTrialMode);
        await this.click(ToolsLocator.activateTrialMode);
    }

    async deActivateTrialMode(): Promise<void> {
        await this.expectVisible(ToolsLocator.deActivateTrialMode);
        await this.click(ToolsLocator.deActivateTrialMode);
    }

    async setActivateTrialMode(): Promise<void> {
        await this.expectVisible(ToolsLocator.activateBtn);
        await this.click(ToolsLocator.activateBtn);
    }

    async setDeActivateTrialMode(): Promise<void> {
        await this.expectVisible(ToolsLocator.deActivateBtn);
        await this.click(ToolsLocator.deActivateBtn);
    }

    async cancelActiveAndDeActive(): Promise<void> {
        await this.expectVisible(ToolsLocator.cancelBtn);
        await this.click(ToolsLocator.cancelBtn);
    }


}