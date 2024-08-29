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
            Element.ofSelector(MenuPackageLocator.menuPackageNewHeadRadioButton),
            Element.ofSelector(MenuPackageLocator.menuPackageExistingHeadRadioButton),
            Element.ofSelector(MenuPackageLocator.menuPackageCategoryField),
            Element.ofSelector(MenuPackageLocator.menuPackageNameField),
            Element.ofSelector(MenuPackageLocator.menuPackageCodeField),
            Element.ofSelector(MenuPackageLocator.menuPackageDescField),
            Element.ofSelector(MenuPackageLocator.menuPackageServiceChargeRadioButton),
            Element.ofSelector(MenuPackageLocator.menuPackageTaxRadioButton),
            Element.ofSelector(MenuPackageLocator.menuPackageFOCRadioButton),
            Element.ofSelector(MenuPackageLocator.menuPackageReplacementField)


        ];
    }


}