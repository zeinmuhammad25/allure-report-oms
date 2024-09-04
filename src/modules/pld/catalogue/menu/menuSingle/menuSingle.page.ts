import BasePosLitePage from "../../../base-pos-lite-page";
import Element from "../../../../../base/objects/Element";
import MenuSingleScenario from "./menuSingle.scenario";
import MenuSingleLocator from "./menuSingle.locator";


export default class MenuSinglePage extends BasePosLitePage implements MenuSingleScenario {


    pageUrl = (): string => this.urls.get.catalogue.menuSingleUrl;

    shouldHave(): Element[] {
        return [

            Element.ofSelector(MenuSingleLocator.menuNameField),
            Element.ofSelector(MenuSingleLocator.menuCodeField),
            Element.ofSelector(MenuSingleLocator.menuCategoryField),
            Element.ofSelector(MenuSingleLocator.menuDescriptionField),
            Element.ofSelector(MenuSingleLocator.menuAddBookButton),
            Element.ofSelector(MenuSingleLocator.menuCategoryButton),
            Element.ofSelector(MenuSingleLocator.scRadioButton),
            Element.ofSelector(MenuSingleLocator.TaxRadioButton),
            Element.ofSelector(MenuSingleLocator.focRadioButton),
            Element.ofSelector(MenuSingleLocator.replacementField),
            Element.ofSelector(MenuSingleLocator.menuCreateSaveButton),
            Element.ofSelector(MenuSingleLocator.menuCreateCancelButton),

        ];
    }




}