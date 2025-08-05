import BaseEsoPage from "../../../base/base-eso-page";
import SearchAddressScenario from "./searchAddress.scenario";
import Element from "../../../../../base/objects/Element";
import HomeLocator from "../../home/home.locator";
import SearchAddressLocator from "./searchAddress.locator";
import DeliveryAddressPage from "../deliveryAddress/deliveryAddress.page";
import SaveAddressPage from "../saveAddress/saveAddress.page";

export default class SearchAddressPage extends BaseEsoPage implements SearchAddressScenario {

    pageUrl = (): string => this.urls.get.searchAddress;
    private apiSearch: string = '/web/qsv1/map/search';

    shouldHave(): Element[] {
        return [
            Element.ofSelector(SearchAddressLocator.searchField),
        ]
    }

    async searchAddress(address: string): Promise<void> {
        await this.expectVisible(SearchAddressLocator.searchField);
        await this.wait(300);
        await this.fill(SearchAddressLocator.searchField, address);
        await this.waitForResponse(this.apiSearch);
    }

    async saveAddress(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async selectAddressToAdd(): Promise<void> {
        await this.expectVisible(SearchAddressLocator.selectSuggestionByIndex(1));
        await this.click(SearchAddressLocator.selectSuggestionByIndex(1));
        await this.expectVisible(SearchAddressLocator.confirmButton);
        await this.clickAndExpectGotoPage(SearchAddressLocator.confirmButton, SaveAddressPage);
        await this.wait(300);
    }

    async selectAddress(): Promise<void> {
        await this.expectVisible(SearchAddressLocator.selectButton)
        await this.clickAndExpectGotoPage(SearchAddressLocator.selectButton, DeliveryAddressPage)
    }

    async hasSuggestions(): Promise<void> {
        await this.wait(300);
        await this.expectHasElements(SearchAddressLocator.searchSuggestions)
    }

    async hasEmptySuggestions(): Promise<void> {
        await this.wait(300);
        await this.expectHasEmptyElement(SearchAddressLocator.searchSuggestions)
    }

    async selectCurrentGPSLocation(): Promise<void> {
        await this.expectVisible(SearchAddressLocator.gpsButton)
        await this.click(SearchAddressLocator.gpsButton)
        await this.wait(500)
    }
}