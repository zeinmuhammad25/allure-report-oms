import BaseOmsPage from "../base-oms-page";
import RegularMemberScenario from "./regularMember.scenario";
import Element from "../../../base/objects/Element";
import RegularMemberLocator from "./regularMember.locator";

export default class RegularMemberPage extends BaseOmsPage implements RegularMemberScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [];
    }

    async createdRegularMember(): Promise<void> {
        await this.expectVisible(RegularMemberLocator.btnAddRegularMember);
        await this.click(RegularMemberLocator.btnAddRegularMember);
    }

    async searchRegularMember(valueMember: string): Promise<void> {
        await this.expectVisible(RegularMemberLocator.fieldSearchMember);
        await this.click(RegularMemberLocator.fieldSearchMember);
        await this.fill(RegularMemberLocator.fieldSearchMember, valueMember);
        await this.expectVisible(RegularMemberLocator.escapeKeyboardMember);
        await this.click(RegularMemberLocator.escapeKeyboardMember);
    }

    async cancelSearchRegularMember(valueMember: string): Promise<void> {
        await this.expectVisible(RegularMemberLocator.fieldSearchMember);
        await this.click(RegularMemberLocator.fieldSearchMember);
        await this.fill(RegularMemberLocator.fieldSearchMember, valueMember);
        await this.expectVisible(RegularMemberLocator.escapeKeyboardMember);
        await this.click(RegularMemberLocator.escapeKeyboardMember);
        await this.expectVisible(RegularMemberLocator.btnClearSearchMember);
        await this.click(RegularMemberLocator.btnClearSearchMember);
    }

    async shortingAscRegularMember(headerName: "Code" | "Name" | "Address" | "Phone" | "Email"): Promise<void> {
        await this.expectVisible(RegularMemberLocator.headerNameAndShorting(headerName));
        await this.click(RegularMemberLocator.headerNameAndShorting(headerName));
    }

    async shortingDescRegularMember(headerName: "Code" | "Name" | "Address" | "Phone" | "Email"): Promise<void> {
        await this.expectVisible(RegularMemberLocator.headerNameAndShorting(headerName));
        await this.click(RegularMemberLocator.headerNameAndShorting(headerName));
        await this.click(RegularMemberLocator.headerNameAndShorting(headerName));
    }

    async shortingAscAndDescRegularMember(headerName: "Code" | "Name" | "Address" | "Phone" | "Email", value: string): Promise<void> {
        await this.expectVisible(RegularMemberLocator.headerNameAndShorting(headerName));
        await this.click(RegularMemberLocator.headerNameAndShorting(headerName));
        await this.expectVisible(RegularMemberLocator.btnDataAndEdit(value));
        await this.click(RegularMemberLocator.headerNameAndShorting(headerName));
        await this.expectVisible(RegularMemberLocator.btnDataAndEdit(value));
    }

    async memberPagination(type: "first" | "previous" | "next" | "last"): Promise<void> {
        await this.expectVisible(RegularMemberLocator.paginationButton(type));
        await this.click(RegularMemberLocator.paginationButton(type));
    }

    async inputFormMemberName(memberName: string): Promise<void> {
        await this.expectVisible(RegularMemberLocator.regularMemberNameField);
        await this.click(RegularMemberLocator.regularMemberNameField);
        await this.fill(RegularMemberLocator.regularMemberNameField, memberName);
        await this.expectVisible(RegularMemberLocator.escapeKeyboardForm);
        await this.click(RegularMemberLocator.escapeKeyboardForm);
    }

    async selectFormGander(gender: "Male" | "Female"): Promise<void> {
        await this.expectVisible(RegularMemberLocator.genderField);
        await this.click(RegularMemberLocator.genderField);
        await this.expectVisible(RegularMemberLocator.selectGender(gender));
        await this.click(RegularMemberLocator.selectGender(gender));
    }

    async clickButtonDate(): Promise<void> {
        await this.expectVisible(RegularMemberLocator.selectBirthDate);
        await this.click(RegularMemberLocator.selectBirthDate);
    }

    async selectMonthAndYear(label: "Choose month and year" | "Choose date"): Promise<void> {
        await this.expectVisible(RegularMemberLocator.btnMonthAndYear(label));
        await this.click(RegularMemberLocator.btnMonthAndYear(label));
    }

    async paginationDatePicker(label: "Next month" | "Previous month" | "Next 20 years" | "Previous 20 years" | "Next year" | "Previous year"): Promise<void> {
        await this.expectVisible(RegularMemberLocator.paginationDatePicker(label));
        await this.click(RegularMemberLocator.paginationDatePicker(label));
    }

    async datePickerYear(year: string): Promise<void> {
        await this.expectVisible(RegularMemberLocator.selectYear(year));
        await this.click(RegularMemberLocator.selectYear(year));
    }

    async datePickerMonth(month: string): Promise<void> {
        await this.expectVisible(RegularMemberLocator.selectMonth(month));
        await this.click(RegularMemberLocator.selectMonth(month));
    }

    async datePickerDate(date: string): Promise<void> {
        await this.expectVisible(RegularMemberLocator.selectDate(date));
        await this.click(RegularMemberLocator.selectDate(date));
    }

    async inputFormPhone(phoneNumber: string): Promise<void> {
        await this.expectVisible(RegularMemberLocator.phoneMemberField);
        await this.click(RegularMemberLocator.phoneMemberField);
        await this.fill(RegularMemberLocator.phoneMemberField, phoneNumber);
        await this.click(RegularMemberLocator.escapeKeyboardForm);
    }

    async inputFormEmail(
        o?: { append?: boolean; delCount?: number; delFrom?: "start" | "end"; delSub?: string },
        email?: string
    ): Promise<void> {
        const field = this.getLocator(RegularMemberLocator.emailMemberField);
        await this.expectVisible(RegularMemberLocator.emailMemberField);
        await this.click(RegularMemberLocator.emailMemberField);
        const value = await field.inputValue();
        let data = email ?? value;
        if (o?.append && email) {
            data = value + email;
        }
        if (o?.delSub?.trim()) {
            data = value.replace(o.delSub.trim(), "");
        }
        if ((o?.delCount ?? 0) > 0) {
            const n = Math.max(0, o.delCount!);
            data =
                o?.delFrom === "start"
                    ? value.slice(n) // hapus dari depan
                    : value.slice(0, Math.max(0, value.length - n)); // hapus dari belakang
        }
        await this.fill(RegularMemberLocator.emailMemberField, data);
        await this.click(RegularMemberLocator.escapeKeyboardForm);
    }


    async inputFormAddress(
        o?: { append?: boolean; delCount?: number; delFrom?: "start" | "end"; delSub?: string },
        text?: string
    ): Promise<void> {
        const field = this.getLocator(RegularMemberLocator.addressMemberField);
        // Pastikan field address terlihat & fokus
        await this.expectVisible(RegularMemberLocator.addressMemberField);
        await this.click(RegularMemberLocator.addressMemberField);
        // Ambil value lama
        const value = await field.inputValue();
        let address = text ?? value;
        // Jika append → tambahkan text ke belakang value lama
        if (o?.append && text) {
            address = value + text;
        }
        // Jika hapus substring tertentu
        if (o?.delSub?.trim()) {
            address = value.replace(o.delSub.trim(), "");
        }
        // Jika hapus sejumlah karakter (by count)
        if ((o?.delCount ?? 0) > 0) {
            const n = Math.max(0, o.delCount!);
            address =
                o?.delFrom === "start"
                    ? value.slice(n) // hapus dari depan
                    : value.slice(0, Math.max(0, value.length - n)); // hapus dari belakang
        }
        // Isi ulang field address dengan value terbaru
        await this.fill(RegularMemberLocator.addressMemberField, address);
        // Klik untuk tutup keyboard / hilangkan fokus
        await this.click(RegularMemberLocator.escapeKeyboardForm);
    }


}