import BasePosLitePage from "../../base-pos-lite-page";
import Urls from "../../../../configs/urls";
import Element from "../../../../base/objects/Element";
import AddRecipeScenario from "./addRecipe.scenario";
import AddRecipeLocator from "./addRecipe.locator";


export default class AddRecipePage extends BasePosLitePage implements AddRecipeScenario {


    pageUrl = (): string => this.urls.get.catalogue.addRecipeUrl;


    shouldHave(): Element[] {
        return [
            Element.ofSelector(AddRecipeLocator.adjustRecipeButton),
            Element.ofSelector(AddRecipeLocator.duplicateRecipeButton),
            Element.ofSelector(AddRecipeLocator.cancelButton),

        ];
    }


}