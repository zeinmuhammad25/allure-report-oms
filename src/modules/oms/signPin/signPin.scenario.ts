import BaseScenario from "../../../base/base-scenario";

export default interface SignPinScenario extends BaseScenario {
    inputPinByTouch(pin: string): Promise<void>;

    inputPinByKeyboard(pin: string): Promise<void>;

    clearPin(): Promise<void>;

    submitPinValidateStartDayYes(): Promise<void>;

    submitPinValidateStartDayNo(): Promise<void>;

    submitPinNoUnregisteredUser(): Promise<void>;

    submitPin(): Promise<void>;

    validateShowStarCash(inputCash: string): Promise<void>;

    closePopUpAlert(): Promise<void>;

    storeAuthState(): Promise<void>;

    validateNotNowCheckCustomerPayments(): Promise<void>;
}