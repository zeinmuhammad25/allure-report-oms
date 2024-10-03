import BaseEsoPage from "../../../base/base-eso-page";
import DeliveryAddressScenario from "./deliveryAddress.scenario";
import Element from "../../../../../base/objects/Element";
import DeliveryAddressLocator from "./deliveryAddress.locator";
import SearchAddressPage from "../searchAddress/searchAddress.page";

export default class DeliveryAddressPage extends BaseEsoPage implements DeliveryAddressScenario {

    pageUrl = (): string => this.urls.get.deliveryAddress;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(DeliveryAddressLocator.backButton),
            Element.ofSelector(DeliveryAddressLocator.searchField),
        ]
    }

    async gotoSearchAddress(): Promise<void> {
        await this.clickAndExpectGotoPage(DeliveryAddressLocator.searchField, SearchAddressPage)
    }

    async addHomeAddress(): Promise<void> {
        await this.expectVisible(DeliveryAddressLocator.addHomeAddress)
        await this.click(DeliveryAddressLocator.addHomeAddress)
    }

    async addOfficeAddress(): Promise<void> {
        await this.expectVisible(DeliveryAddressLocator.addOfficeAddress)
        await this.click(DeliveryAddressLocator.addOfficeAddress)
    }

    async addOtherAddress(): Promise<void> {
        await this.expectVisible(DeliveryAddressLocator.addOtherAddress)
        await this.click(DeliveryAddressLocator.addOtherAddress)
    }

    async selectAddress(label: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async editAddress(label: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async deleteAddress(label: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async goBack(): Promise<void> {
        throw new Error("Method not implemented.");
    }

}