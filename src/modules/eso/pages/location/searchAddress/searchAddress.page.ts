import BaseEsoPage from "../../../base/base-eso-page";
import SearchAddressScenario from "./searchAddress.scenario";
import Element from "../../../../../base/objects/Element";
import HomeLocator from "../../home/home.locator";
import SearchAddressLocator from "./searchAddress.locator";

export default class SearchAddressPage extends BaseEsoPage implements SearchAddressScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(SearchAddressLocator.saveButton),
            Element.ofSelector(SearchAddressLocator.selectButton),
        ]
    }

    searchAddress(address: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    saveAddress(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    selectAddress(): Promise<void> {
        throw new Error("Method not implemented.");
    }


}