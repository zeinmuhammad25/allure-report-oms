import BasePosLitePage from "../../base-pos-lite-page";
import Element from "../../../../base/objects/Element";
import MenuManagementScenario from "./menuManagement.scenario";
import MenuManagementLocator from "./menuManagement.locator";
import PrinterLocator from "../printer/printer.locator";


export default class MenuManagementPage extends BasePosLitePage implements MenuManagementScenario {


    pageUrl = (): string => this.urls.get.printerSetting.menuManagementUrl;

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