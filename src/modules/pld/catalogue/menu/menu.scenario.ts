import BaseScenario from "../../../../base/base-scenario";
import MenuSinglePage from "./menuSingle/menuSingle.page";
import MenuPackagePage from "./menuPackage/menuPackage.page";

export default interface MenuScenario extends BaseScenario {

    gotoMenuSingle(): Promise<MenuSinglePage>;

    createMenuPackage(): Promise<MenuPackagePage>;
}

