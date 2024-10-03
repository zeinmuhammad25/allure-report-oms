import BaseEsoPage from "../../../base/base-eso-page";
import DeliveryAddressScenario from "./deliveryAddress.scenario";
import Element from "../../../../../base/objects/Element";
import DeliveryAddressLocator from "./deliveryAddress.locator";
import SearchAddressPage from "../searchAddress/searchAddress.page";
import SaveAddressPage from "../saveAddress/saveAddress.page";
import BranchListPage from "../../branchList/branchList.page";

export default class DeliveryAddressPage extends BaseEsoPage implements DeliveryAddressScenario {

    private apiUserAddress: string = '/user/address';

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
        await this.expectVisible(DeliveryAddressLocator.selectButtonByLabel(label))
        await this.clickAndExpectGotoPage(DeliveryAddressLocator.editButtonByLabel(label), BranchListPage)
    }

    async editAddress(label: string): Promise<void> {
        await this.expectVisible(DeliveryAddressLocator.editButtonByLabel(label))
        await this.clickAndExpectGotoPage(DeliveryAddressLocator.editButtonByLabel(label), SaveAddressPage)
    }

    async deleteAddress(label: string): Promise<void> {
        await this.expectVisible(DeliveryAddressLocator.deleteButtonByLabel(label))
        await this.click(DeliveryAddressLocator.deleteButtonByLabel(label))
    }

    async confirmDelete(): Promise<void> {
        await this.expectVisible(DeliveryAddressLocator.confirmDeleteButton)
        await this.click(DeliveryAddressLocator.confirmDeleteButton)
        await this.waitForResponse(this.apiUserAddress)
    }

    async goBack(): Promise<void> {
        throw new Error("Method not implemented.");
    }

}