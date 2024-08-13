import BaseLocator from "../../../../base/base-locator";

export default class AddRecipeLocator extends BaseLocator {

    static duplicateRecipeButton: string = "//button[@class='esb-btn-md-outline-secondary ng-star-inserted']";
    static adjustRecipeButton: string = "//button[@class='esb-btn-md-secondary']";
    static cancelButton: string = "//button[@class='esb-btn-md-outline-danger mr-2']";

}