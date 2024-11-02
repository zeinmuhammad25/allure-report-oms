import Element from "../../../../base/objects/Element";
import BaseOmsPage from "../../base-oms-page";
import ApplicationSettingScenario from "./applicationSetting.scenario";
import ApplicationSettingLocator from "./applicationSetting.locator";
import {promises} from "node:dns";

export default class ApplicationSettingPage extends BaseOmsPage implements ApplicationSettingScenario {
    pageUrl = (): string => this.urls.get.toolsSettingPos.toolIndex;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(ApplicationSettingLocator.buttonTool),
            Element.ofSelector(ApplicationSettingLocator.buttonApplicationSetting),
            Element.ofSelector(ApplicationSettingLocator.selectDefaultStation("- Select Station -")),
            Element.ofSelector(ApplicationSettingLocator.selectQrCodeScannerMode("Off")),
            Element.ofSelector(ApplicationSettingLocator.inputTimeFirstWarning),
            Element.ofSelector(ApplicationSettingLocator.inputTimeSecondWaring),
            Element.ofSelector(ApplicationSettingLocator.selectSalesModeForDineIn("AT EXCLUSIVE")),
            Element.ofSelector(ApplicationSettingLocator.selectSalesModeForQuickService("AT EXCLUSIVE")),
            Element.ofSelector(ApplicationSettingLocator.checkboxDirectServing),
            Element.ofSelector(ApplicationSettingLocator.checkboxShowCustomerDisplay),
            Element.ofSelector(ApplicationSettingLocator.checkboxSelfOrderServer),
            Element.ofSelector(ApplicationSettingLocator.checkboxShowOnScreenKeyboard),
            Element.ofSelector(ApplicationSettingLocator.selectIntegratedScale("- Select Status -")),
            Element.ofSelector(ApplicationSettingLocator.buttonSaveSetting)


        ];
    }

    async UserSetAllSetting(): Promise<void> {
        await this.click(ApplicationSettingLocator.buttonTool);
        await this.click(ApplicationSettingLocator.buttonApplicationSetting);
        await this.click(ApplicationSettingLocator.selectDefaultStation("KASIR"));
        await this.click(ApplicationSettingLocator.selectQrCodeScannerMode("Device Camera"));
        await this.fill(ApplicationSettingLocator.inputTimeFirstWarning, "2");
        await this.fill(ApplicationSettingLocator.inputTimeSecondWaring, "30");
        await this.click(ApplicationSettingLocator.selectSalesModeForDineIn("AT EXCLUSIVE"));
        await this.click(ApplicationSettingLocator.selectSalesModeForQuickService("AT INCLUSIVE"));
        await this.click(ApplicationSettingLocator.checkboxDirectServing);
        await this.click(ApplicationSettingLocator.toggleHidePendingNotes);
        await this.click(ApplicationSettingLocator.checkboxShowCustomerDisplay);
        await this.click(ApplicationSettingLocator.checkboxSelfOrderServer);
        await this.expectVisible(ApplicationSettingLocator.selectESBOrderPrinterStation("KASIR"));
        await this.click(ApplicationSettingLocator.checkboxShowOnScreenKeyboard);
        await this.click(ApplicationSettingLocator.selectIntegratedScale("Active"));
        await this.click(ApplicationSettingLocator.buttonSaveSetting);
    }

    async UserSetStation(): Promise<void> {
        await this.click(ApplicationSettingLocator.buttonTool);
        await this.click(ApplicationSettingLocator.buttonApplicationSetting);
        await this.click(ApplicationSettingLocator.selectDefaultStation("KASIR"));
        await this.click(ApplicationSettingLocator.buttonSaveSetting);
    }

    async UserSetWaringTime(): Promise<void> {
        await this.click(ApplicationSettingLocator.buttonTool);
        await this.click(ApplicationSettingLocator.buttonApplicationSetting);
        await this.fill(ApplicationSettingLocator.inputTimeFirstWarning, "2");
        await this.fill(ApplicationSettingLocator.inputTimeSecondWaring, "30");
        await this.click(ApplicationSettingLocator.buttonSaveSetting);
    }

    async UserSetSalesMode(): Promise<void> {
        await this.click(ApplicationSettingLocator.buttonTool);
        await this.click(ApplicationSettingLocator.buttonApplicationSetting);
        await this.click(ApplicationSettingLocator.selectSalesModeForDineIn("AT EXCLUSIVE"));
        await this.click(ApplicationSettingLocator.selectSalesModeForQuickService("AT INCLUSIVE"));
        await this.click(ApplicationSettingLocator.buttonSaveSetting);
    }

    async UserSetSelfOrderServer(): Promise<void> {
        await this.click(ApplicationSettingLocator.buttonTool);
        await this.click(ApplicationSettingLocator.buttonApplicationSetting);
        await this.click(ApplicationSettingLocator.checkboxSelfOrderServer);
        await this.expectVisible(ApplicationSettingLocator.selectESBOrderPrinterStation("KASIR"));
        await this.click(ApplicationSettingLocator.buttonSaveSetting);
    }


}