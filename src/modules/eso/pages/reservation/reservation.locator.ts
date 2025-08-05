import BaseLocator from "../../../../base/base-locator";
import {Salutation} from "../../objects/salutation";


export default class ReservationLocator extends BaseLocator {


    static scheduleConfirmButton: string = `(//button//span[contains(text(),'Continue')])[1]`;
    static fillDataConfirmButton: string = `(//button//span[contains(text(),'Continue')])[2]`;
    static reservationConfirmButton: string = `//button[@id='confirm-reservation-button']`;
    static cancelButton: string = `//button//span[text()='Cancel']`;
    static cancelConfirmButton: string = `//button[@id='selection-botton-0']`;
    static cancelAbortButton: string = `//button[@id='selection-botton-1']`;

    // Pax
    static paxDropdownButton: string = "//mat-icon[text()='people']";
    static checkPax = (totalPax:number): string => `//button//div[contains(text(),'${totalPax} Pax')]`;
    static bottomSheet: string = "//mat-bottom-sheet-container";
    static paxPickerTop: string = "//div[@data-type='top']";
    static paxPickerMiddle: string = "//div[@data-type='middle']";
    static paxPickerBottom: string = "//div[@data-type='bottom']";
    static paxPickerSaveButton: string = "//button[@id='save-button']";

    // Date
    static calenderButton: string = "//button[@id='calendar-button']";
    static dateButton = (id: number) => `//button[@id='button-date-${id}']`;

    // Time
    static timeButton = (id: number) => `//button[@id='time-button-${id}']`;
    static earlyTimeButton: string = `//button[@id='time-button-0']`;
    static latestTimeButton: string = `//div[contains(@class,'btn-time-container')]/button[last()]`;
    static confirmTimeButton: string = `//button[@id='submit-purpose-button']`;

    static emailField: string = "//input[@id='email']";
    static nameField: string = "//input[@id='customerName']";
    static phoneField: string = "//input[@id='phoneNumber']";
    static notesField: string = "//textarea[@id='notes']";
    static salutationField: string = "//mat-select[@placeholder='Salutation']";
    static salutation = (title: Salutation) => `//mat-option[@id='mat-option-${title}']`

    // Purpose
    static purposeDropdownButton: string = "//button[contains(@class,'btn-purpos')]";
    static purposeOption = (purpose: string): string => `//mat-list-item/span[text()=' ${purpose} ']`;
    static purposeConfirmButton: string = "//button[@id='submit-purpose-button']";


}