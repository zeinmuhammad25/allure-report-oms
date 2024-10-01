import BaseEsoPage from "../../../base/base-eso-page";
import SaveAddressScenario from "./saveAddress.scenario";
import Element from "../../../../../base/objects/Element";
import SaveAddressLocator from "./saveAddress.locator";

export default class SaveAddressPage extends BaseEsoPage implements SaveAddressScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(SaveAddressLocator.labelField),
            Element.ofSelector(SaveAddressLocator.addressField),
        ]
    }

    inputLabelField(label: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    inputAddressInfoField(info: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    inputNameField(name: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    inputPhoneField(phone: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    goBack(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}