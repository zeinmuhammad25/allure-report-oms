import BaseScenario from "../../../../../base/base-scenario";

export default interface SaveAddressScenario extends BaseScenario {
    inputLabelField(label: string): Promise<void>

    inputAddressInfoField(info: string): Promise<void>

    inputNameField(name: string): Promise<void>

    inputPhoneField(phone: string): Promise<void>

    saveAddress(): Promise<void>

    goBack(): Promise<void>
}