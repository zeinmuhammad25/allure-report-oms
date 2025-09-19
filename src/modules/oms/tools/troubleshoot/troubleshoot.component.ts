import Element from "../../../../base/objects/Element";
import BaseOmsPage from "../../base-oms-page";
import TroubleshootScenario from "./troubleshoot.scenario";
import TroubleshootLocator from "./troubleshoot.locator";

export default class TroubleshootComponent extends BaseOmsPage implements TroubleshootScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(TroubleshootLocator.testPrintButton)
        ];
    }

    async testPrint(): Promise<void> {
        await this.expectVisible(TroubleshootLocator.testPrintButton);
        await this.click(TroubleshootLocator.testPrintButton);
    }

    async testPrintDisabled(): Promise<void> {
        await this.expectVisible(TroubleshootLocator.testPrintDisabled);
        await this.click(TroubleshootLocator.testPrintDisabled);
    }

    async closePopUpTroubleShoot(): Promise<void> {
        await this.expectVisible(TroubleshootLocator.closePopUp);
        await this.click(TroubleshootLocator.closePopUp);
    }

    async openDrawerTest(): Promise<void> {
        await this.expectVisible(TroubleshootLocator.openDrawer);
        await this.click(TroubleshootLocator.openDrawer);
    }

    async testPrintMenuAndBill(): Promise<void> {
        await this.expectVisible(TroubleshootLocator.testPrintMenuAndBill);
        await this.click(TroubleshootLocator.testPrintMenuAndBill);
    }

    async showDropDownFormTestPrint(index: number): Promise<void> {
        await this.expectVisible(TroubleshootLocator.dropDownFormTestPrint(index));
        await this.click(TroubleshootLocator.dropDownFormTestPrint(index));
    }

    async valueDropDownFormTestPrint(value: string): Promise<void> {
        await this.expectVisible(TroubleshootLocator.selectValueDropDown(value));
        await this.click(TroubleshootLocator.selectValueDropDown(value));
    }

    async stationInForm(value: string): Promise<void> {
        await this.expectVisible(TroubleshootLocator.selectStationInForm(value));
        await this.click(TroubleshootLocator.selectStationInForm(value));
    }

    async actionButtonForm(stationName: "Test Print Bill" | "Test Print Menu" | "Cancel"): Promise<void> {
        await this.expectVisible(TroubleshootLocator.btnFormTestPrintBill(stationName));
        await this.click(TroubleshootLocator.btnFormTestPrintBill(stationName));
    }

    async setStation(values: "all" | string | string[], unselect?: boolean): Promise<number> {
        let acted = 0;

        const handleClick = async (locator: string) => {
            await this.expectVisible(locator);
            await this.click(locator);
            acted++;
        };

        if (values === "all") {
            await handleClick(TroubleshootLocator.selectAllStation);
        } else if (Array.isArray(values)) {
            for (const v of values) {
                await handleClick(TroubleshootLocator.selectStation(v));
            }
        } else {
            await handleClick(TroubleshootLocator.selectStation(values));
        }

        return acted;
    }


}