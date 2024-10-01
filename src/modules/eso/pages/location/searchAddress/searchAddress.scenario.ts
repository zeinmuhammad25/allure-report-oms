import BaseScenario from "../../../../../base/base-scenario";

export default interface SearchAddressScenario extends BaseScenario {
    searchAddress(address: string): Promise<void>

    saveAddress(): Promise<void>

    selectAddress(): Promise<void>
}