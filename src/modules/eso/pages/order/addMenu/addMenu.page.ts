import Element from "../../../../../base/objects/Element";
import BaseEsoPage from "../../../base/base-eso-page";
import AddMenuScenario from "./addMenu.scenario";
import AddMenuLocator from "./addMenu.locator";

export default class AddMenuPage extends BaseEsoPage implements AddMenuScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(AddMenuLocator.plusButton),
            Element.ofSelector(AddMenuLocator.minusButton)
        ]
    }

    addQuantity(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    confirm(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    goBack(): Promise<void> {
        throw new Error("Method not implemented.");
    }

}