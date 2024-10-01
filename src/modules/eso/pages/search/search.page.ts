import Element from "../../../../base/objects/Element";
import BaseEsoPage from "../../base/base-eso-page";
import SearchScenario from "./search.scenario";
import SearchLocator from "./search.locator";

export default class SearchPage extends BaseEsoPage implements SearchScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(SearchLocator.buttonCart)
        ]
    }

    inputMenuName(menu: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    addMenu(menuID: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

    increaseQuantity(menuID: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

    decreaseQuantity(menuID: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

}