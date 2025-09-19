import Element from "../../../../base/objects/Element";
import BaseOmsPage from "../../base-oms-page";
import ApplicationSettingScenario from "./applicationSetting.scenario";
import ApplicationSettingLocator from "./applicationSetting.locator";

export default class ApplicationSettingPage extends BaseOmsPage implements ApplicationSettingScenario {
    pageUrl = (): string => this.urls.get.toolsSettingPos.toolIndex;

    shouldHave(): Element[] {
        return [];
    }

    async userSetStation(station: string): Promise<void> {
        await this.expectVisible(ApplicationSettingLocator.defaultStationDropdown);
        await this.click(ApplicationSettingLocator.defaultStationDropdown);
        await this.expectVisible(ApplicationSettingLocator.selectDefaultStation(station));
        await this.click(ApplicationSettingLocator.selectDefaultStation(station));
    }

    async userSetWaringTime(first: string, second: string): Promise<void> {
        await this.expectVisible(ApplicationSettingLocator.inputTimeFirstWarning);
        await this.click(ApplicationSettingLocator.inputTimeFirstWarning);
        await this.fill(ApplicationSettingLocator.inputTimeFirstWarning, first);
        await this.click(ApplicationSettingLocator.escapeKeyBoard);
        await this.expectVisible(ApplicationSettingLocator.inputTimeSecondWaring);
        await this.click(ApplicationSettingLocator.inputTimeSecondWaring);
        await this.fill(ApplicationSettingLocator.inputTimeSecondWaring, second);
        await this.click(ApplicationSettingLocator.escapeKeyBoard);
    }

    async userFirstWaringTime(first: string): Promise<void> {
        await this.expectVisible(ApplicationSettingLocator.inputTimeFirstWarning);
        await this.click(ApplicationSettingLocator.inputTimeFirstWarning);
        await this.fill(ApplicationSettingLocator.inputTimeFirstWarning, first);
        await this.click(ApplicationSettingLocator.escapeKeyBoard);
    }

    async userSecondWaringTime(second: string): Promise<void> {
        await this.expectVisible(ApplicationSettingLocator.inputTimeSecondWaring);
        await this.click(ApplicationSettingLocator.inputTimeSecondWaring);
        await this.fill(ApplicationSettingLocator.inputTimeSecondWaring, second);
        await this.click(ApplicationSettingLocator.escapeKeyBoard);
    }

    async userSetSalesMode(dineIn: string, quickService: string): Promise<void> {
        await this.expectVisible(ApplicationSettingLocator.showDineInMode);
        await this.click(ApplicationSettingLocator.showDineInMode);
        await this.expectVisible(ApplicationSettingLocator.selectSalesModeForDineIn(dineIn));
        await this.click(ApplicationSettingLocator.selectSalesModeForDineIn(dineIn));
        await this.click(ApplicationSettingLocator.closeAfterSet);
        await this.expectVisible(ApplicationSettingLocator.showQuickServiceMode);
        await this.click(ApplicationSettingLocator.showQuickServiceMode);
        await this.expectVisible(ApplicationSettingLocator.selectSalesModeForQuickService(quickService));
        await this.click(ApplicationSettingLocator.selectSalesModeForQuickService(quickService));
        await this.click(ApplicationSettingLocator.closeAfterSet);
    }

    async userDineInSalesMode(dineIn: string): Promise<void> {
        await this.expectVisible(ApplicationSettingLocator.showDineInMode);
        await this.click(ApplicationSettingLocator.showDineInMode);
        await this.expectVisible(ApplicationSettingLocator.selectSalesModeForDineIn(dineIn));
        await this.click(ApplicationSettingLocator.selectSalesModeForDineIn(dineIn));
        await this.click(ApplicationSettingLocator.closeAfterSet);
    }

    async userQuickServiceSalesMode(quickService: string): Promise<void> {
        await this.expectVisible(ApplicationSettingLocator.showQuickServiceMode);
        await this.click(ApplicationSettingLocator.showQuickServiceMode);
        await this.expectVisible(ApplicationSettingLocator.selectSalesModeForQuickService(quickService));
        await this.click(ApplicationSettingLocator.selectSalesModeForQuickService(quickService));
        await this.click(ApplicationSettingLocator.closeAfterSet);
    }

    async userSalesModeforQuickService(quickService: string): Promise<void> {
        await this.expectVisible(ApplicationSettingLocator.showDefaultQsMode);
        await this.click(ApplicationSettingLocator.showDefaultQsMode);
        await this.expectVisible(ApplicationSettingLocator.selectSalesModeForDefaultQS(quickService));
        await this.click(ApplicationSettingLocator.selectSalesModeForDefaultQS(quickService));
        await this.click(ApplicationSettingLocator.closeAfterSet);
    }

    async userSetDirectServing(): Promise<void> {
        await this.expectVisible(ApplicationSettingLocator.checkboxDirectServing);
        await this.click(ApplicationSettingLocator.checkboxDirectServing);
    }

    async userHideNotesSetDirectServing(): Promise<void> {
        await this.expectVisible(ApplicationSettingLocator.toggleHidePendingNotes);
        await this.click(ApplicationSettingLocator.toggleHidePendingNotes);
    }

    async setCustomerDisplay(option: string): Promise<void> {
        // buka dropdown
        await this.expectVisible(ApplicationSettingLocator.checkboxShowCustomerDisplay);
        await this.click(ApplicationSettingLocator.checkboxShowCustomerDisplay);

        if (option.toUpperCase() === "OFF") {
            // pilih OFF
            await this.expectVisible(ApplicationSettingLocator.selectedOffShowCustomerDisplay);
            await this.click(ApplicationSettingLocator.selectedOffShowCustomerDisplay);
            return;
        }

        // pilih sesuai label yang lu kirim (exact match)
        const opt = ApplicationSettingLocator.selectedShowCustomerDisplay(option);
        await this.expectVisible(opt);
        await this.click(opt);
    }

    async proceedMonitorDisplay(): Promise<void> {
        await this.expectVisible(ApplicationSettingLocator.displayMonitorProceed);
        await this.click(ApplicationSettingLocator.displayMonitorProceed);
    }

    async cancelMonitorDisplay(): Promise<void> {
        await this.expectVisible(ApplicationSettingLocator.displayMonitorCancel);
        await this.click(ApplicationSettingLocator.displayMonitorCancel);
    }

    async inputLengthPoleDisplay(length: string): Promise<void> {
        await this.expectVisible(ApplicationSettingLocator.CustomerDisplayLength);
        await this.click(ApplicationSettingLocator.CustomerDisplayLength);
        await this.fill(ApplicationSettingLocator.CustomerDisplayLength, length);
        await this.click(ApplicationSettingLocator.escapeKeyBoard);
    }

    async inputPortPoleDisplay(length: string): Promise<void> {
        await this.expectVisible(ApplicationSettingLocator.CustomerDisplayport);
        await this.click(ApplicationSettingLocator.CustomerDisplayport);
        await this.fill(ApplicationSettingLocator.CustomerDisplayport, length);
        await this.click(ApplicationSettingLocator.escapeKeyBoard);
    }

    async userSetSelfOrderServer(): Promise<void> {
        await this.expectVisible(ApplicationSettingLocator.checkboxSelfOrderServer);
        await this.click(ApplicationSettingLocator.checkboxSelfOrderServer);
    }

    async userSetSelfOrderServerStation(station: string): Promise<void> {
        await this.expectVisible(ApplicationSettingLocator.selectESBOrderPrinterStation(station));
        await this.click(ApplicationSettingLocator.selectESBOrderPrinterStation(station));
    }

    async UserShowOnScreenKeyboard(): Promise<void> {
        await this.expectVisible(ApplicationSettingLocator.checkboxShowOnScreenKeyboard);
        await this.click(ApplicationSettingLocator.checkboxShowOnScreenKeyboard);
    }

    async userSetIntegratedScale(status: string): Promise<void> {
        await this.expectVisible(ApplicationSettingLocator.ShowOnIntegratedScale);
        await this.click(ApplicationSettingLocator.ShowOnIntegratedScale);
        await this.expectVisible(ApplicationSettingLocator.selectIntegratedScale(status));
        await this.click(ApplicationSettingLocator.selectIntegratedScale(status));
    }

    async UserShowInfoOnTable(): Promise<void> {
        await this.expectVisible(ApplicationSettingLocator.showInfoOnTable);
        await this.click(ApplicationSettingLocator.showInfoOnTable);
    }

    async saveSetting(): Promise<void> {
        await this.expectVisible(ApplicationSettingLocator.buttonSaveSetting);
        await this.click(ApplicationSettingLocator.buttonSaveSetting);
        await this.click(ApplicationSettingLocator.applicationSettingDialogOk);
    }

}