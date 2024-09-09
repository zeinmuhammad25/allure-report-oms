import BasePosLitePage from "../../base-pos-lite-page";
import Element from "../../../../base/objects/Element";
import MenuScenario from "./menu.scenario";
import MenuLocator from "./menu.locator";
import MenuSinglePage from "./menuSingle/menuSingle.page";
import MenuPackagePage from "./menuPackage/menuPackage.page";


export default class MenuPage extends BasePosLitePage implements MenuScenario {
    private menuNameSearchData = "Test Menu 01";
    private menuPackageNameData = "Test Menu Package 01";

    pageUrl = (): string => this.urls.get.catalogue.menuUrl;

    shouldHave(): Element[] {
        return [

            Element.ofSelector(MenuLocator.menuSingleTab),
            Element.ofSelector(MenuLocator.menuPackageTab),
            Element.ofSelector(MenuLocator.menuSingleAddButton),
            Element.ofSelector(MenuLocator.menuArchiveButton),
            Element.ofSelector(MenuLocator.menuImportButton),
            Element.ofSelector(MenuLocator.menuExportButton),
            Element.ofSelector(MenuLocator.menuDropdownField),
            Element.ofSelector(MenuLocator.menuSearchField),
            Element.ofSelector(MenuLocator.menuTotalCount),
            Element.ofSelector(MenuLocator.paginationNextButton),
            Element.ofSelector(MenuLocator.paginationPreviousButton),
            Element.ofSelector(MenuLocator.addRecipeButton),
            Element.ofSelector(MenuLocator.instructionButton),
        ];
    }

    async gotoMenuSingle(): Promise<MenuSinglePage> {

        return this.clickAndExpectGotoPage(MenuLocator.menuSingleAddButton, MenuSinglePage);

    }

    async goToMenuPackage(): Promise<MenuPackagePage> {

        await this.click(MenuLocator.menuPackageTab);
        return this.clickAndExpectGotoPage(MenuLocator.menuPackageAddButton, MenuPackagePage);
    }

    async cleanUpMenuSingle(): Promise<void> {
        await this.click(MenuLocator.menuSearchField);
        await this.typeKeyboard(this.menuNameSearchData);
        await this.click(MenuLocator.menuSearchButton);
        await this.click(MenuLocator.menuSingleDeleteButton);//tr[@class='ant-table-row ng-star-inserted']/td[@class='ant-table-cell'][2]
        await this.click(MenuLocator.menuDeleteConfirmationButton);
        await this.expectVisible(MenuLocator.menuDeleteSuccessNotification);
    }

    async cleanUpMenuPackage(): Promise<void> {
        await this.click(MenuLocator.menuPackageTab);
        await this.click(MenuLocator.menuSearchMenuPackageField);
        await this.typeKeyboard(this.menuPackageNameData);
        await this.click(MenuLocator.menuSearchButton);
        await this.click(MenuLocator.menuPackageDeleteButton);
        await this.click(MenuLocator.menuDeleteConfirmationButton);
        await this.expectVisible(MenuLocator.menuDeleteSuccessNotification);
    }


}