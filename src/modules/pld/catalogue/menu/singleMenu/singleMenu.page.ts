import BasePosLitePage from "../../../base-pos-lite-page";
import Element from "../../../../../base/objects/Element";
import SingleMenuScenario from "./singleMenu.scenario";
import SingleMenuLocator from "./singleMenu.locator";


export default class SingleMenuPage extends BasePosLitePage implements SingleMenuScenario {


    pageUrl = (): string => this.urls.get.catalogue.singleMenUrl;

    shouldHave(): Element[] {
        return [

            Element.ofSelector(SingleMenuLocator.menuNameField),
            Element.ofSelector(SingleMenuLocator.menuCodeField),
            Element.ofSelector(SingleMenuLocator.menuCategoryField),
            Element.ofSelector(SingleMenuLocator.menuDescriptionField),
            Element.ofSelector(SingleMenuLocator.menuAddBookButton),
            Element.ofSelector(SingleMenuLocator.menuCategoryButton),
            Element.ofSelector(SingleMenuLocator.scRadioButton),
            Element.ofSelector(SingleMenuLocator.TaxRadioButton),
            Element.ofSelector(SingleMenuLocator.focRadioButton),
            Element.ofSelector(SingleMenuLocator.replacementField),
            Element.ofSelector(SingleMenuLocator.menuCreateSaveButton),
            Element.ofSelector(SingleMenuLocator.menuCreateCancelButton),

        ];
    }


}