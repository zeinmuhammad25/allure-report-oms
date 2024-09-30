import Element from "../../../../../base/objects/Element";
import BaseEsoPage from "../../../base/base-eso-page";
import ViewOrderScenario from "./viewOrder.scenario";
import ViewOrderLocator from "./viewOrder.locator";

export default class ViewOrderPage extends BaseEsoPage implements ViewOrderScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(ViewOrderLocator.confirmButton),
            Element.ofSelector(ViewOrderLocator.backButton)
        ]
    }

    goBack(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    continueToPayment(): Promise<void> {
        throw new Error("Method not implemented.");
    }

}