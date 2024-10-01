import BaseEsoPage from "../../../base/base-eso-page";
import DeliveryAddressScenario from "./deliveryAddress.scenario";
import Element from "../../../../../base/objects/Element";
import HomeLocator from "../../home/home.locator";
import DeliveryAddressLocator from "./deliveryAddress.locator";

export default class DeliveryAddressPage extends BaseEsoPage implements DeliveryAddressScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(DeliveryAddressLocator.example),
        ]
    }

    searchLocation(label: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    selectAddress(label: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    editAddress(label: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    deleteAddress(label: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    goBack(): Promise<void> {
        throw new Error("Method not implemented.");
    }

}