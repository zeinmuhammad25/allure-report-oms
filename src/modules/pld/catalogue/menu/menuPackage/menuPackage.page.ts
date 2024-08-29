import BasePosLitePage from "../../../base-pos-lite-page";
import Element from "../../../../../base/objects/Element";
import MenuPackageScenario from "./menuPackage.scenario";
import MenuPackageLocator from "./menuPackage.locator";


export default class MenuPackagePage extends BasePosLitePage implements MenuPackageScenario {


    pageUrl = (): string => this.urls.get.catalogue.menuPackageUrl;


    shouldHave(): Element[] {
        return [

            Element.ofSelector(MenuPackageLocator.menuPackageCreateCancelButton),
            Element.ofSelector(MenuPackageLocator.menuPackageCreateSaveButton),


        ];
    }


}