import BaseEsoPage from "../../../base/base-eso-page";
import SaveAddressScenario from "./saveAddress.scenario";
import Element from "../../../../../base/objects/Element";
import SaveAddressLocator from "./saveAddress.locator";
import DeliveryAddressPage from "../deliveryAddress/deliveryAddress.page";

export default class SaveAddressPage extends BaseEsoPage implements SaveAddressScenario {
    pageUrl = (): string => this.urls.get.saveAddress;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(SaveAddressLocator.addressField),
        ]
    }

    async inputLabelField(label: string): Promise<void> {
        await this.wait(300)
        await this.expectVisible(SaveAddressLocator.labelField);
        await this.fill(SaveAddressLocator.labelField, label);
    }

    async inputAddressInfoField(info: string): Promise<void> {
        await this.expectVisible(SaveAddressLocator.addressField);
        await this.fill(SaveAddressLocator.addressField, info);
    }

    async inputNameField(name: string): Promise<void> {
        await this.expectVisible(SaveAddressLocator.nameField);
        await this.fill(SaveAddressLocator.nameField, name);
    }

    async inputPhoneField(phone: string): Promise<void> {
        await this.expectVisible(SaveAddressLocator.phoneField);
        await this.fillPhone(SaveAddressLocator.phoneField, phone, false);
    }


    async saveAddress(): Promise<void> {
        await this.expectVisible(SaveAddressLocator.saveButton)
        await this.clickAndExpectGotoPage(SaveAddressLocator.saveButton, DeliveryAddressPage)
    }

    async goBack(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}