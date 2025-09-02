import BaseOmsPage from "../base-oms-page";
import RegularMemberScenario from "./regularMember.scenario";
import Element from "../../../base/objects/Element";
import RegularMemberLocator from "./regularMember.locator";

export default class RegularMemberPage extends BaseOmsPage implements RegularMemberScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [];
    }

    /**
     * CARA MEMANGGIL DI SPECT:
     * // 1) Replace / isi baru
     * await this.inputFormX({}, "Teks Baru");
     * // 2) Clear (kosongkan)
     * await this.inputFormX({}, "");
     * // 3) Append (tambah di belakang)
     * await this.inputFormX({ append: true }, " Tambahan");
     * // 4) Delete N karakter dari belakang
     * await this.inputFormX({ delCount: 5 });
     * // 5) Delete N karakter dari depan
     * await this.inputFormX({ delCount: 3, delFrom: "start" });
     * // 6) Delete berdasarkan substring tertentu
     * await this.inputFormX({ delSub: "SubStringYangDihapus" });
     * Catatan:
     * - Semua contoh di atas berlaku untuk: inputFormAddress / inputFormEmail / inputFormPhone / inputFormMemberName
     */

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

    async inputFormMemberName(
        o?: { append?: boolean; delCount?: number; delFrom?: "start" | "end"; delSub?: string },
        memberName?: string
    ): Promise<void> {
        const field = this.getLocator(RegularMemberLocator.regularMemberNameField);
        await this.expectVisible(RegularMemberLocator.regularMemberNameField);
        await this.click(RegularMemberLocator.regularMemberNameField);

        const value = await field.inputValue();
        let name = memberName ?? value;
        if (o?.append && memberName) {
            name = value + memberName;
        }
        if (o?.delSub?.trim()) {
            name = value.replace(o.delSub.trim(), "");
        }
        if ((o?.delCount ?? 0) > 0) {
            const n = Math.max(0, o.delCount!);
            name =
                o?.delFrom === "start"
                    ? value.slice(n) // hapus dari depan
                    : value.slice(0, Math.max(0, value.length - n)); // hapus dari belakang
        }
        await this.fill(RegularMemberLocator.regularMemberNameField, name);
        await this.click(RegularMemberLocator.escapeKeyboardForm);
        if (!name || name.trim() === "") {
            await this.expectTextVisible("Regular Member Name cannot be blank", true);
        }
    }

    async selectFormGander(gender: "Male" | "Female" | ""): Promise<void> {
        if (!gender || gender.trim() === "") {
            await this.expectTextVisible("Gender cannot be blank", true);
            return;
        }
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

    async inputFormPhone(
        o?: { append?: boolean; delCount?: number; delFrom?: "start" | "end"; delSub?: string },
        phoneNumber?: string
    ): Promise<void> {
        const field = this.getLocator(RegularMemberLocator.phoneMemberField);
        await this.expectVisible(RegularMemberLocator.phoneMemberField);
        await this.click(RegularMemberLocator.phoneMemberField);
        const value = await field.inputValue();
        let phone = phoneNumber ?? value;
        if (o?.append && phoneNumber) {
            phone = value + phoneNumber;
        }
        if (o?.delSub?.trim()) {
            phone = value.replace(o.delSub.trim(), "");
        }
        if ((o?.delCount ?? 0) > 0) {
            const n = Math.max(0, o.delCount!);
            phone =
                o?.delFrom === "start"
                    ? value.slice(n) // hapus dari depan
                    : value.slice(0, Math.max(0, value.length - n)); // hapus dari belakang
        }
        await this.fill(RegularMemberLocator.phoneMemberField, phone);
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
        // Append → tambahkan text baru di belakang
        if (o?.append && text) {
            address = value + text;
        }
        // Hapus substring tertentu
        if (o?.delSub?.trim()) {
            address = value.replace(o.delSub.trim(), "");
        }
        // Hapus sejumlah karakter
        if ((o?.delCount ?? 0) > 0) {
            const n = Math.max(0, o.delCount!);
            address =
                o?.delFrom === "start"
                    ? value.slice(n) // hapus dari depan
                    : value.slice(0, Math.max(0, value.length - n)); // hapus dari belakang
        }
        // **Auto-trim maksimal 200 karakter**
        if (address.length > 200) {
            address = address.slice(0, 200);
        }
        // Isi ulang field address dengan value terbaru
        await this.fill(RegularMemberLocator.addressMemberField, address);
        // Klik untuk tutup keyboard / hilangkan fokus
        await this.click(RegularMemberLocator.escapeKeyboardForm);
    }

    async selectAndEditMember(memberValue: string): Promise<void> {
        await this.expectVisible(RegularMemberLocator.btnDataAndEdit(memberValue));
        await this.click(RegularMemberLocator.btnDataAndEdit(memberValue));
    }

    async cancelCreateAndUpdateMember(): Promise<void> {
        await this.expectVisible(RegularMemberLocator.cancelMemberForm);
        await this.click(RegularMemberLocator.cancelMemberForm);
    }

}