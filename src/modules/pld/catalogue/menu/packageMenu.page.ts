import BasePage from "../../../../base/base-page";
import Urls from "../../../../configs/urls";
import Element from "../../../../base/objects/Element";
import MenuLocator from "./menu.locator";
import PackageMenuScenario from "./packageMenu.scenario";


export default class PackageMenuPage extends BasePosLitePage implements PackageMenuScenario {


    pageUrl = (): string => Urls.singlemenu;

    // real URL : https://dev7.esb.co.id/esb-core-lite-8/catalog/menu/create-package

    shouldHave(): Element[] {
        return [

            Element.ofSelector(MenuLocator.newHeadPackageMenuRadio),
            Element.ofSelector(MenuLocator.existingHeadPackageMenuRadio),
            Element.ofSelector(MenuLocator.menuPackageNameField),
            Element.ofSelector(MenuLocator.menuCodeField),
            Element.ofSelector(MenuLocator.menuDesciptionField),

            Element.ofSelector(MenuLocator.separatePrintYesRadio),
            Element.ofSelector(MenuLocator.separatePrintNoRadio),
            Element.ofSelector(MenuLocator.addGroupMenuButton),
            Element.ofSelector(MenuLocator.menuCategoryField),


        ];
    }


}