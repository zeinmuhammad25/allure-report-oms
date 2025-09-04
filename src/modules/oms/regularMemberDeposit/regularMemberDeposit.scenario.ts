import BaseScenario from "../../../base/base-scenario";
import {MemberObject} from "./MemberObject";


export default interface RegularMemberDepositScenario extends BaseScenario {
    createdMemberDeposit(): Promise<void>;

    searchMemberDeposit(valueMember: string): Promise<void>;

    cancelSearchMemberDeposit(): Promise<void>;

    clickFilterDate(): Promise<void>;

    selectMonthAndYear(side: "left" | "right", nav: "prev" | "next"): Promise<void>;

    datePickerFilterDate(day: string): Promise<void>;

    applyDateInFilterDate(): Promise<void>;

    depositPagination(type: "first" | "previous" | "next" | "last"): Promise<void>;

    dataValidation(value: string, opts?: { maxProbe?: number }): Promise<number>;

    applyRegularMemberNameList(): Promise<void>;

    applyRegularMemberNameQr(): Promise<void>;

    shortingAscDeposit(headerName: "Deposit Number" | "Date" | "Regular Member Name" | "Regular Member Phone" | "Regular Member Email" | "Deposit Total" | "Sync Date" | "Reprint"): Promise<void>;

    shortingDescDeposit(headerName: "Deposit Number" | "Date" | "Regular Member Name" | "Regular Member Phone" | "Regular Member Email" | "Deposit Total" | "Sync Date" | "Reprint"): Promise<void>;

    shortingAscAndDescDeposit(headerName: "Deposit Number" | "Date" | "Regular Member Name" | "Regular Member Phone" | "Regular Member Email" | "Deposit Total" | "Sync Date" | "Reprint", value: string): Promise<void>;

    searchMemberList(memberName: string): Promise<void>;

    clearSearchMemberList(): Promise<void>;

    shortingAscDepositMemberList(headerName: "Name" | "Phone" | "Address"): Promise<void>;

    shortingDescDepositMemberList(headerName: "Name" | "Phone" | "Address"): Promise<void>;

    shortingAscAndDescDepositMemberList(headerName: "Name" | "Phone" | "Address", value: string): Promise<void>;

    selectRegularMemberNameList(value: string): Promise<void>;

    memberListFormPagination(type: "first" | "previous" | "next" | "last"): Promise<void>;

    inputMemberIdQr(memberId: string): Promise<void>;

    applyMemberIdQr(): Promise<void>;

    paymentMethodMember(paymentMethod: MemberObject): Promise<void>;

    paymentMemberCategoryType(paymentCategoryType: MemberObject): Promise<void>;

}