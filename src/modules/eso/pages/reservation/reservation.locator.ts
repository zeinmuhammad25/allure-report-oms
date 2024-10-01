import BaseLocator from "../../../../base/base-locator";


export default class ReservationLocator extends BaseLocator {
    static timeButton = (id: number) => `//button[@id='time-button-${id}']`;
    static dateButton = (id: number) => `//button[@id='button-date-${id}']`;
    static continueButton = (id: number) => `//button//span[text()='Continue']`;
    static cancelButton = (id: number) => `//button//span[text()='Cancel']`;
    static cancelConfirmButton = (id: number) => `//button[@id='selection-botton-0']`;
    static cancelAbortButton = (id: number) => `//button[@id='selection-botton-1']`;
}