import Element from "../../../../../base/objects/Element";
import BaseEsoPage from "../../../base/base-eso-page";
import OrderSummaryScenario from "./orderSummary.scenario";
import OrderSummaryLocator from "./orderSummary.locator";

export default class OrderSummaryPage extends BaseEsoPage implements OrderSummaryScenario {
    private branchCode: string = "SFF10";
    pageUrl = (): string => this.urls.get.orderSummary(this.branchCode);

    shouldHave(): Element[] {
        return [
            Element.ofSelector(OrderSummaryLocator.orderSummaryTitle)
        ]
    }


    goToHistory(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    goToNewOrder(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    confirm(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    goBack(): Promise<void> {
        throw new Error("Method not implemented.");
    }

}