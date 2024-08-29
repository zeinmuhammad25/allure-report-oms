import BasePosLitePage from "../../../base-pos-lite-page";
import Urls from "../../../../../configs/urls";
import Element from "../../../../../base/objects/Element";
import MenuLocator from "../menu.locator";
import MenuPackageScenario from "./menuPackage.scenario";


export default class MenuPackagePage extends BasePosLitePage implements MenuPackageScenario {


    pageUrl = (): string => Urls.singlemenu;



    shouldHave(): Element[] {
        return [

            Element.ofSelector(MenuLocator.newHeadPackageMenuRadio),
            Element.ofSelector(MenuLocator.existingHeadPackageMenuRadio),
            Element.ofSelector(MenuLocator.menuPackageNameField),
            Element.ofSelector(MenuLocator.menuCodeField),
            Element.ofSelector(MenuLocator.menuDescriptionField),

            Element.ofSelector(MenuLocator.separatePrintYesRadio),
            Element.ofSelector(MenuLocator.separatePrintNoRadio),
            Element.ofSelector(MenuLocator.),
            Element.ofSelector(MenuLocator.menuCategoryField),


        ];
    }


}