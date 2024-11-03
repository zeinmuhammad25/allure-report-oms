import Element from "../../../../base/objects/Element";
import BaseOmsPage from "../../base-oms-page";
import SynchronizeDataScenario from "./synchronizeData.scenario";
import SynchronizeDataLocator from "./synchronizeData.locator";

export default class SynchronizeDataPage extends BaseOmsPage implements SynchronizeDataScenario {

    pageUrl = (): string => this.urls.get.toolsSettingPos.toolIndex;

    shouldHave(): Element[] {
        return [

            Element.ofSelector(SynchronizeDataLocator.getLocatorSynchronize("Branch Settings")),
            Element.ofSelector(SynchronizeDataLocator.getLocatorSynchronize("Master Settings")),
            Element.ofSelector(SynchronizeDataLocator.getLocatorSynchronize("Sales"))

        ];
    }

    async synchronizeDataAutoSync(): Promise<void> {
        throw new Error("Method not implemented");
    }

    async synchronizeDataAll(): Promise<void> {
        throw new Error("Method not implemented");
    }

    async synchronizeDataBranchSetting(): Promise<void> {
        throw new Error("Method not implemented");
    }

    async synchronizeDataMasterSetting(): Promise<void> {
        throw new Error("Method not implemented");
    }

    async synchronizeDataMember(): Promise<void> {
        throw new Error("Method not implemented");
    }

    async synchronizeDataPromotion(): Promise<void> {
        throw new Error("Method not implemented");
    }

    async synchronizeDataTable(): Promise<void> {
        throw new Error("Method not implemented");
    }

    async synchronizeDataMenu(): Promise<void> {
        throw new Error("Method not implemented");
    }

    async synchronizeDataSales(): Promise<void> {
        throw new Error("Method not implemented");
    }

    async synchronizeDataUser(): Promise<void> {
        throw new Error("Method not implemented");
    }

}