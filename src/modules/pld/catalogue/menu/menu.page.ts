import BasePosLitePage from "../../base-pos-lite-page";
import Element from "../../../../base/objects/Element";
import MenuScenario from "./menu.scenario";
import MenuLocator from "./menu.locator";
import MenuSinglePage from "./menuSingle/menuSingle.page";
import MenuPackagePage from "./menuPackage/menuPackage.page";
import {Keyboard} from "../../../../base/constants/Keyboard";


export default class MenuPage extends BasePosLitePage implements MenuScenario {
    private menuNameSearchData = "Test Menu 01"

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

    async createMenuPackage(): Promise<MenuPackagePage> {

        await this.click(MenuLocator.menuPackageTab);
        return this.clickAndExpectGotoPage(MenuLocator.menuPackageAddButton, MenuPackagePage);
    }

    async cleanUpMenuSingle(): Promise<void> {
        await this.click(MenuLocator.menuSearchField);
        await this.typeKeyboard(this.menuNameSearchData);
        await this.click(MenuLocator.menuMagnifyingGlass);
        await this.expectVisible(MenuLocator.menuDeleteButton);
    }




}