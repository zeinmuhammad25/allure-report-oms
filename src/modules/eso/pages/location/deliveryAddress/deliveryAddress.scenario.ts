import BaseScenario from "../../../../../base/base-scenario";

export default interface DeliveryAddressScenario extends BaseScenario {
    gotoSearchAddress(label: string): Promise<void>

    addHomeAddress(): Promise<void>

    selectAddress(label: string): Promise<void>

    editAddress(label: string): Promise<void>

    deleteAddress(label: string): Promise<void>

    goBack(): Promise<void>
}