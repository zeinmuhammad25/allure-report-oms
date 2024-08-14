import BasePage from "../../../../base/base-page";
import Urls from "../../../../configs/urls";
import Element from "../../../../base/objects/Element";
import AddRecipeScenario from "./addRecipe.scenario";
import AddRecipeLocator from "./addRecipe.locator";


export default class AddRecipePage extends BasePosLitePage implements AddRecipeScenario {


    pageUrl = (): string => Urls.menu;

    // Real URL = https://dev7.esb.co.id/esb-core-lite/catalog/menu-category/index
    shouldHave(): Element[] {
        return [
            Element.ofSelector(AddRecipeLocator.adjustRecipeButton),
            Element.ofSelector(AddRecipeLocator.duplicateRecipeButton),
            Element.ofSelector(AddRecipeLocator.cancelButton),

        ];
    }


}