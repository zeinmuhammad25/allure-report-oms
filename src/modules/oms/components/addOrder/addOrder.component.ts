import Element from "../../../../base/objects/Element";
import BaseOmsPage from "../../base-oms-page";
import AddOrderLocator from "./addOrder.locator";
import AddOrderScenario from "./addOrder.scenario";

export default class AddOrderComponent extends BaseOmsPage implements AddOrderScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(AddOrderLocator.filedSearch),
            Element.ofSelector(AddOrderLocator.refreshButton),
            Element.ofSelector(AddOrderLocator.nextPageItemList),
            Element.ofSelector(AddOrderLocator.backPageItemList),
            Element.ofSelector(AddOrderLocator.addOrderLocatorButtonNext),
            Element.ofSelector(AddOrderLocator.addOrderLocatorButtonBack),
            Element.ofSelector(AddOrderLocator.applyButton),
            Element.ofSelector(AddOrderLocator.cancelButton)
        ];
    }

    async addOneMenuDetailPackage(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async addMultiMenuDetailPackage(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async addNotesMenuDetailPackage(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async minusQtyInDetailMenuPackage(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async addMaxQtyInOneMenuDetailPackage(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async addMenuDetailPackageViaSearch(): Promise<void> {
        throw new Error("Method not implemented.");
    }

}