import BasePosLitePage from "../../../../base-pos-lite-page";
import Urls from "../../../../../../configs/urls";
import Element from "../../../../../../base/objects/Element";
import BranchTabSettingPOSLocator from "./branchTabSettingPOS.locator";
import BranchTabSettingPOSScenario from "./branchTabSettingPOS.scenario";


export default class BranchTabSettingPOSPage extends BasePosLitePage implements BranchTabSettingPOSScenario {
    private storeCloseTime = "18:00";

    pageUrl = (): string => Urls.dashboard;

    shouldHave(): Element[] {
        return [];
    }


    async navigateToTabSettingPOS(): Promise<void> {
        await this.click(BranchTabSettingPOSLocator.branchTabSettingPOS);
    }

    async adjustStoreCloseTime(): Promise<void> {
        await this.click(BranchTabSettingPOSLocator.reminderStoreCloseDropdown);
        await this.click(BranchTabSettingPOSLocator.storeCloseClockPickerHour);
        await this.click(BranchTabSettingPOSLocator.storeCloseClockPickerMinute);
        await this.click(BranchTabSettingPOSLocator.branchTabSettingPOSSaveButton);
    }

    async adjustStoreCloseTimeManual(): Promise<void> {
        await this.click(BranchTabSettingPOSLocator.storeCloseRadioYesUnchecked);
        await this.expectVisible(BranchTabSettingPOSLocator.storeCloseRadioYesChecked);
        await this.click(BranchTabSettingPOSLocator.reminderStoreCloseDropdown);
        await this.typeKeyboard(this.storeCloseTime);
        await this.click(BranchTabSettingPOSLocator.storeCloseClockPickerMinute);
        await this.click(BranchTabSettingPOSLocator.branchTabSettingPOSSaveButton);
    }

    async adjustStoreCloseNotification(): Promise<void> {
        await this.click(BranchTabSettingPOSLocator.storeCloseRadioYesUnchecked);
        await this.expectVisible(BranchTabSettingPOSLocator.storeCloseRadioYesChecked);
        await this.click(BranchTabSettingPOSLocator.reminderStoreCloseDropdown);
        await this.click(BranchTabSettingPOSLocator.storeCloseClockPickerHour);
        await this.click(BranchTabSettingPOSLocator.storeCloseClockPickerMinute);
        await this.click(BranchTabSettingPOSLocator.branchTabSettingPOSSaveButton);

    }

    async resetStoreCloseTime(): Promise<void> {
        await this.click(BranchTabSettingPOSLocator.branchTabSettingPOS);
        await this.wait(800);
        const isNoChecked = await this.isVisible(BranchTabSettingPOSLocator.storeCloseRadioNoChecked);

        if (!isNoChecked) {
            await this.click(BranchTabSettingPOSLocator.storeCloseRadioNoUnchecked);
        }
        await this.click(BranchTabSettingPOSLocator.branchTabSettingPOSSaveButton);


    }


}