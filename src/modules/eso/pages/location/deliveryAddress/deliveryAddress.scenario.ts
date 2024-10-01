import BaseScenario from "../../../../../base/base-scenario";

export default interface DeliveryAddressScenario extends BaseScenario {
    searchLocation(label: string): Promise<void>

    selectAddress(label: string): Promise<void>

    editAddress(label: string): Promise<void>

    deleteAddress(label: string): Promise<void>

    goBack(): Promise<void>
}