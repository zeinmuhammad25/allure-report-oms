import BaseScenario from "../../../../base/base-scenario";
import {Salutation} from "../../objects/salutation";

export default interface ReservationScenario extends BaseScenario {
    setDay(): Promise<void>

    /**
     * @param minutes
     * * if equal -1 return latest time.
     * * if greater than 1 will be divided by 30 minutes and rounding down.
     * * else return earliest time
     */
    setTime(minutes: number): Promise<void>

    setPax(total: number): Promise<void>

    confirmSchedule(): Promise<void>

    confirmFillData(): Promise<void>

    inputSalutation(title: Salutation): Promise<void>

    inputEmail(email: string): Promise<void>

    inputName(name: string): Promise<void>

    inputPhoneNumber(phone: string): Promise<void>

    inputPurpose(purpose: string): Promise<void>

    inputNotes(notes: string): Promise<void>

    confirmReservation(): Promise<void>

    goBack(): Promise<void>

}