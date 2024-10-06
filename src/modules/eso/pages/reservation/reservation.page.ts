import Element from "../../../../base/objects/Element";
import BaseEsoPage from "../../base/base-eso-page";
import ReservationScenario from "./reservation.scenario";
import ReservationLocator from "./reservation.locator";
import {Salutation} from "../../objects/salutation";

export default class ReservationPage extends BaseEsoPage implements ReservationScenario {

    private apiReservation = '/qsv1/reservation/transaction';

    pageUrl = (): string => this.urls.get.reservation;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(ReservationLocator.paxDropdownButton)
        ]
    }

    async setDay(daysFromNow: number = 0): Promise<void> {
        if (daysFromNow < 0 && daysFromNow > 3) {
            throw new Error("Method not implemented.");
        } else {
            await this.expectVisible(ReservationLocator.dateButton(daysFromNow));
            await this.click(ReservationLocator.dateButton(daysFromNow));
        }
    }

    async setTime(minutesFromNow: number): Promise<void> {
        if (minutesFromNow === -1) {
            await this.expectVisible(ReservationLocator.latestTimeButton);
            await this.click(ReservationLocator.latestTimeButton);
        } else if (minutesFromNow > 0) {
            const times = Math.floor(minutesFromNow / 30);
            await this.expectVisible(ReservationLocator.timeButton(times));
            await this.click(ReservationLocator.timeButton(times));
        } else {
            await this.expectVisible(ReservationLocator.earlyTimeButton);
            await this.click(ReservationLocator.earlyTimeButton);
        }
    }


    async setPax(total: number, expectEmpty:boolean = false): Promise<void> {
        await this.click(ReservationLocator.paxDropdownButton);
        await this.expectVisible(ReservationLocator.bottomSheet);
        await this.selectPaxPicker(total);
        await this.wait(300);
        if(expectEmpty){
            await this.expectInvisible(ReservationLocator.checkPax(total));
        }else{
            await this.expectVisible(ReservationLocator.checkPax(total));
        }

    }

    private async selectPaxPicker(total: number) {
        await this.expectVisible(ReservationLocator.paxPickerTop);
        await this.expectVisible(ReservationLocator.paxPickerMiddle);
        await this.expectVisible(ReservationLocator.bottomSheet);

        if (total < 2) {
            await this.click(ReservationLocator.paxPickerTop)
        } else if (total > 2) {
            const counter = total - 2;
            for (let i = 0; i < counter; i++) {
                await this.click(ReservationLocator.paxPickerBottom);
            }
        }
        await this.wait(300);
        await this.expectVisible(ReservationLocator.paxPickerSaveButton);
        await this.click(ReservationLocator.paxPickerSaveButton);
    }

    async inputSalutation(title: Salutation): Promise<void> {
        await this.expectVisible(ReservationLocator.salutationField);
        await this.click(ReservationLocator.salutationField);
        await this.expectVisible(ReservationLocator.salutation(title));
        await this.click(ReservationLocator.salutation(title));
    }

    async inputEmail(email: string): Promise<void> {
        await this.expectVisible(ReservationLocator.emailField);
        await this.fill(ReservationLocator.emailField, email);
    }

    async inputName(name: string): Promise<void> {
        await this.expectVisible(ReservationLocator.nameField);
        await this.fill(ReservationLocator.nameField, name);
    }

    async inputPhoneNumber(phone: string): Promise<void> {
        await this.expectVisible(ReservationLocator.phoneField);
        await this.fillPhone(ReservationLocator.phoneField, phone, false);
    }

    async inputPurpose(purpose: string): Promise<void> {
        await this.expectVisible(ReservationLocator.purposeDropdownButton);
        await this.click(ReservationLocator.purposeDropdownButton);
        await this.expectVisible(ReservationLocator.purposeOption(purpose));
        await this.click(ReservationLocator.purposeOption(purpose));
        await this.expectVisible(ReservationLocator.purposeConfirmButton);
        await this.click(ReservationLocator.purposeConfirmButton);
    }

    async inputNotes(notes: string) {
        await this.expectVisible(ReservationLocator.notesField);
        await this.fill(ReservationLocator.notesField, notes);
    }


    async confirmSchedule(): Promise<void> {
        await this.expectVisible(ReservationLocator.scheduleConfirmButton);
        await this.click(ReservationLocator.scheduleConfirmButton);
    }

    async confirmFillData(): Promise<void> {
        await this.expectVisible(ReservationLocator.fillDataConfirmButton);
        await this.click(ReservationLocator.fillDataConfirmButton);
    }

    async confirmReservation(): Promise<void> {
        await this.expectVisible(ReservationLocator.reservationConfirmButton);
        await this.click(ReservationLocator.reservationConfirmButton);
    }

    async goBack(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
