import Element from "../../../../base/objects/Element";
import BaseOmsPage from "../../base-oms-page";
import SynchronizeDataScenario from "./synchronizeData.scenario";
import SynchronizeDataLocator from "./synchronizeData.locator";
import {SynchronizeDataObject} from "./SynchronizeDataObject";

export default class SynchronizeDataPage extends BaseOmsPage implements SynchronizeDataScenario {

    pageUrl = (): string => this.urls.get.toolsSettingPos.toolIndex;

    shouldHave(): Element[] {
        return [

            Element.ofSelector(SynchronizeDataLocator.getLocatorSynchronize(SynchronizeDataObject.SyncAutoSyncPOS)),
            Element.ofSelector(SynchronizeDataLocator.getLocatorSynchronize(SynchronizeDataObject.SyncBranchSettings)),
            Element.ofSelector(SynchronizeDataLocator.getLocatorSynchronize(SynchronizeDataObject.SyncSales))

        ];
    }

    async synchronizeDataAutoSync(): Promise<void> {
        await this.expectVisible(SynchronizeDataLocator.getLocatorSynchronize(SynchronizeDataObject.SyncAutoSyncPOS));
        await this.click(SynchronizeDataLocator.getLocatorSynchronize(SynchronizeDataObject.SyncAutoSyncPOS));
        await this.expectVisible(SynchronizeDataLocator.buttonUpdateSetting);
        await this.click(SynchronizeDataLocator.buttonUpdateSetting);
        await this.expectTextVisible("Settings have been saved", true);
    }

    async synchronizeDataAll(): Promise<void> {
        await this.expectVisible(SynchronizeDataLocator.buttonSelectAll);
        await this.click(SynchronizeDataLocator.buttonSelectAll);
        await this.click(SynchronizeDataLocator.buttonSynchronize);
        await this.expectTextVisibleTimout("", true, 80000);
    }

    async synchronizeDataBranchSetting(): Promise<void> {
        await this.wait(300)
        await this.expectVisible(SynchronizeDataLocator.getLocatorSynchronize(SynchronizeDataObject.SyncBranchSettings));
        await this.click(SynchronizeDataLocator.getLocatorSynchronize(SynchronizeDataObject.SyncBranchSettings));
        await this.click(SynchronizeDataLocator.buttonSynchronize);
        await this.expectTextVisibleTimout("Data sync finished", true, 80000);
    }

    async synchronizeDataMasterSetting(): Promise<void> {
        await this.expectVisible(SynchronizeDataLocator.getLocatorSynchronize(SynchronizeDataObject.SyncMasterSettings));
        await this.click(SynchronizeDataLocator.getLocatorSynchronize(SynchronizeDataObject.SyncMasterSettings));
        await this.click(SynchronizeDataLocator.buttonSynchronize);
        await this.expectTextVisibleTimout("Data sync finished", true, 80000);
    }

    async synchronizeDataMember(): Promise<void> {
        await this.expectVisible(SynchronizeDataLocator.getLocatorSynchronize(SynchronizeDataObject.SyncMember));
        await this.click(SynchronizeDataLocator.getLocatorSynchronize(SynchronizeDataObject.SyncMember));
        await this.click(SynchronizeDataLocator.buttonSynchronize);
        await this.expectTextVisibleTimout("Data sync finished", true, 80000);
    }

    async synchronizeDataPromotion(): Promise<void> {
        await this.expectVisible(SynchronizeDataLocator.getLocatorSynchronize(SynchronizeDataObject.SyncPromotion));
        await this.click(SynchronizeDataLocator.getLocatorSynchronize(SynchronizeDataObject.SyncPromotion));
        await this.click(SynchronizeDataLocator.buttonSynchronize);
        await this.expectTextVisibleTimout("Data sync finished", true, 80000);
    }

    async synchronizeDataTable(): Promise<void> {
        await this.expectVisible(SynchronizeDataLocator.getLocatorSynchronize(SynchronizeDataObject.SyncTable));
        await this.click(SynchronizeDataLocator.getLocatorSynchronize(SynchronizeDataObject.SyncTable));
        await this.click(SynchronizeDataLocator.buttonSynchronize);
        await this.expectTextVisibleTimout("Data sync finished", true, 80000);
    }

    async synchronizeDataMenu(): Promise<void> {
        await this.expectVisible(SynchronizeDataLocator.getLocatorSynchronize(SynchronizeDataObject.SyncMenu));
        await this.click(SynchronizeDataLocator.getLocatorSynchronize(SynchronizeDataObject.SyncMenu));
        await this.click(SynchronizeDataLocator.buttonSynchronize);
        await this.expectTextVisibleTimout("Data sync finished", true, 80000);
    }

    async synchronizeDataSales(): Promise<void> {
        await this.expectVisible(SynchronizeDataLocator.getLocatorSynchronize(SynchronizeDataObject.SyncSales));
        await this.click(SynchronizeDataLocator.getLocatorSynchronize(SynchronizeDataObject.SyncSales));
        await this.click(SynchronizeDataLocator.buttonSynchronize);
        await this.expectTextVisibleTimout("Data sync finished", true, 80000);
    }

    async synchronizeDataUser(): Promise<void> {
        await this.expectVisible(SynchronizeDataLocator.getLocatorSynchronize(SynchronizeDataObject.SyncUser));
        await this.click(SynchronizeDataLocator.getLocatorSynchronize(SynchronizeDataObject.SyncUser));
        await this.click(SynchronizeDataLocator.buttonSynchronize);
        await this.expectTextVisibleTimout("Data sync finished", true, 80000);
    }

    async closePopUpAfterSync(): Promise<void> {
        await this.waitForVisible(
            SynchronizeDataLocator.buttonCloseSyncPopup,
            async () => {
                await this.click(SynchronizeDataLocator.buttonCloseSyncPopup);
            },
            500,
            20
        );
    }

}