import BasePosLitePage from "../../base-pos-lite-page";
import Element from "../../../../base/objects/Element";
import MenuScenario from "./menu.scenario";
import MenuLocator from "./menu.locator";
import MenuSinglePage from "./menuSingle/menuSingle.page";
import MenuPackagePage from "./menuPackage/menuPackage.page";


export default class MenuPage extends BasePosLitePage implements MenuScenario {
    private menuSingleNameData = "Test Menu 01";
    private menuPackageNameData = "Test Menu Package 01";
    private menuSingleNameUpdate    = "Test Menu Edit 01";

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
        while (true) {
            await this.clear(MenuLocator.menuSearchField);
            await this.typeKeyboard(this.menuSingleNameData);
            await this.click(MenuLocator.menuSearchButton);
            await this.wait(1000);
            const menuDataIsVisible = await this.isVisible(MenuLocator.menuSingleTestDataFirstRow);
            if (!menuDataIsVisible) {
                break;
            }
            await this.click(MenuLocator.menuSingleDeleteButton);
            await this.expectVisible(MenuLocator.menuDeletePopupImage);
            await this.click(MenuLocator.menuDeleteConfirmationButton);
            await this.wait(1000);
        }
    }


    async cleanUpMenuPackage(): Promise<void> {
        await this.click(MenuLocator.menuPackageTab);
        while (true) {
            await this.clear(MenuLocator.menuSearchMenuPackageField);
            await this.typeKeyboard(this.menuPackageNameData);
            await this.click(MenuLocator.menuSearchButton);
            await this.wait(1000);
            const menuPackageDataIsVisible = await this.isVisible(MenuLocator.menuPackageTestDataFirstRow);
            if (!menuPackageDataIsVisible) {
                break;
            }
            await this.click(MenuLocator.menuPackageDeleteButton);
            await this.expectVisible(MenuLocator.menuDeletePopupImage);
            await this.click(MenuLocator.menuDeleteConfirmationButton);
            await this.wait(1000);
        }
    }

    async editMenuSingle(): Promise<void> {
        await this.clear(MenuLocator.menuSearchField);
        await this.typeKeyboard(this.menuSingleNameData);
        await this.click(MenuLocator.menuSearchButton);
        await this.expectVisible(MenuLocator.menuSingleEditButton);
        await this.click(MenuLocator.menuSingleEditButton);
    }

    async cleanUpMenuSingleUpdate(): Promise<void> {
        while (true) {
            await this.clear(MenuLocator.menuSearchField);
            await this.typeKeyboard(this.menuSingleNameUpdate);
            await this.click(MenuLocator.menuSearchButton);
            await this.wait(1000);
            const menuUpdateIsVisible = await this.isVisible(MenuLocator.menuSingleUpdateDataFirstRow);
            if (!menuUpdateIsVisible) {
                break;
            }
            await this.click(MenuLocator.menuSingleDeleteButton);
            await this.expectVisible(MenuLocator.menuDeletePopupImage);
            await this.click(MenuLocator.menuDeleteConfirmationButton);
            await this.wait(1000);
        }
    }




}