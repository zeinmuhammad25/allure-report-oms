import BaseScenario from "../../../../base/base-scenario";
import MenuSinglePage from "./menuSingle/menuSingle.page";
import MenuPackageLocator from "./menuPackage/menuPackage.locator";
import MenuPackagePage from "./menuPackage/menuPackage.page";

export default interface MenuScenario extends BaseScenario {

    createSingleMenu(): Promise<MenuSinglePage>;
    createPackageMenu(): Promise<MenuPackagePage>;
}

