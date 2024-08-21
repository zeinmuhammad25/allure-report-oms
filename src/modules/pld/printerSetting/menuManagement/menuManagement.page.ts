import BasePosLitePage from "../../base-pos-lite-page";
import Urls from "../../../../configs/urls";
import Element from "../../../../base/objects/Element";
import MenuManagementScenario from "./menuManagement.scenario";
import MenuManagementLocator from "./menuManagement.locator";
import PrinterLocator from "../printer/printer.locator";


export default class MenuManagementPage extends BasePosLitePage implements MenuManagementScenario {


    pageUrl = (): string => Urls.menu;

    // Real URL = https://dev7.esb.co.id/esb-core-lite/esb-order/setting/index
    shouldHave(): Element[] {
        return [
            Element.ofSelector(MenuManagementLocator.menuManagementTab),
            Element.ofSelector(MenuManagementLocator.menuManagementSearchBar),
            Element.ofSelector(MenuManagementLocator.branchColumn),
            Element.ofSelector(MenuManagementLocator.firstBranchEditButton),

        ];
    }

    async navigateToManagement(): Promise<void> {
        await this.expectVisible(PrinterLocator.printerSettingSidebar);
        await this.click(PrinterLocator.printerSettingSidebar)
        await this.expectVisible(MenuManagementLocator.menuManagementSidebar);
        await this.click(MenuManagementLocator.menuManagementSidebar);

    }

    async managementMenuSearch(): Promise<void> {
        await this.expectVisible(PrinterLocator.printerSettingSidebar);
        await this.click(PrinterLocator.printerSettingSidebar)
        await this.expectVisible(MenuManagementLocator.menuManagementSidebar);
        await this.click(MenuManagementLocator.menuManagementSidebar);
        await this.expectVisible(MenuManagementLocator.menuManagementSearchBar);
    }

    async navigateToMenuManagementEdit(): Promise<void> {
        await this.click(MenuManagementLocator.menuManagementEditButton);
    }

}