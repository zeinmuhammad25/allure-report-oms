import BasePosLitePage from "../../../base-pos-lite-page";
import Urls from "../../../../../configs/urls";
import Element from "../../../../../base/objects/Element";
import MenuManagementEditScenario from "./menuManagementEdit.scenario";
import MenuManagementEditLocator from "./menuManagementEdit.locator";


export default class MenuManagementEditPage extends BasePosLitePage implements MenuManagementEditScenario {


    pageUrl = (): string => Urls.menu;

    // Real URL = https://dev7.esb.co.id/esb-core-lite/esb-order/setting/index
    shouldHave(): Element[] {
        return [
            Element.ofSelector(MenuManagementEditLocator.menuManagementRadioBtn),
            Element.ofSelector(MenuManagementEditLocator.menuManagementSaveBtn),
            Element.ofSelector(MenuManagementEditLocator.menuManagementCancelBtn),
        ];
    }

    async setOutOfStockTrue(): Promise<void> {
        await this.expectVisible(MenuManagementEditLocator.menuManagementRadioBtn);
    }

    async setOutOfStockFalse(): Promise<void> {
        await this.expectVisible(MenuManagementEditLocator.menuManagementRadioBtn);
    }


}