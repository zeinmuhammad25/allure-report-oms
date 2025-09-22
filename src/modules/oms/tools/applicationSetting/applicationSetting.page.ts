import Element from "../../../../base/objects/Element";
import BaseOmsPage from "../../base-oms-page";
import ApplicationSettingScenario from "./applicationSetting.scenario";
import ApplicationSettingLocator from "./applicationSetting.locator";

export default class ApplicationSettingPage extends BaseOmsPage implements ApplicationSettingScenario {
    pageUrl = (): string => this.urls.get.toolsSettingPos.toolIndex;

    shouldHave(): Element[] {
        return [];
    }

    async userSetStation(station: string): Promise<void> {
        await this.expectVisible(ApplicationSettingLocator.defaultStationDropdown);
        await this.click(ApplicationSettingLocator.defaultStationDropdown);
        await this.expectVisible(ApplicationSettingLocator.selectDefaultStation(station));
        await this.click(ApplicationSettingLocator.selectDefaultStation(station));
    }

    async userSetQrCodeScanner(mode: string): Promise<void> {
        await this.expectVisible(ApplicationSettingLocator.qrCodeDropdown);
        await this.click(ApplicationSettingLocator.qrCodeDropdown);
        await this.expectVisible(ApplicationSettingLocator.selectQrCodeScannerMode(mode));
        await this.click(ApplicationSettingLocator.selectQrCodeScannerMode(mode));
    }

    async userSetWaringTime(first: string, second: string): Promise<void> {
        await this.expectVisible(ApplicationSettingLocator.inputTimeFirstWarning);
        await this.click(ApplicationSettingLocator.inputTimeFirstWarning);
        await this.fill(ApplicationSettingLocator.inputTimeFirstWarning, first);
        await this.click(ApplicationSettingLocator.escapeKeyBoard);
        await this.expectVisible(ApplicationSettingLocator.inputTimeSecondWaring);
        await this.click(ApplicationSettingLocator.inputTimeSecondWaring);
        await this.fill(ApplicationSettingLocator.inputTimeSecondWaring, second);
        await this.click(ApplicationSettingLocator.escapeKeyBoard);
    }

    async userFirstWaringTime(
        o?: { append?: boolean; delCount?: number; delFrom?: "start" | "end"; delSub?: number },
        first?: number | string
    ): Promise<void> {
        const field = this.getLocator(ApplicationSettingLocator.inputTimeFirstWarning);
        await this.expectVisible(ApplicationSettingLocator.inputTimeFirstWarning);
        await this.click(ApplicationSettingLocator.inputTimeFirstWarning);
        const raw = await field.inputValue();
        // validasi bukan number
        if (first !== undefined && isNaN(Number(first))) {
            console.warn("⚠️ This is not a number :", first, "Please input Number ONLY");
            return;
        }
        let valueNum = raw ? Number(raw) : 0;
        // 1) base number
        let num = typeof first === "number" ? first : valueNum;
        // 2) append → gabung digit (contoh: 12 append 34 = 1234)
        if (o?.append && typeof first === "number") {
            num = Number(`${valueNum}${first}`);
        }
        // 3) hapus substring tertentu (angka tertentu)
        if (typeof o?.delSub === "number") {
            num = Number(String(num).replace(String(o.delSub), ""));
        }
        // 4) hapus N digit dari depan/belakang
        const delCount = Math.max(0, o?.delCount ?? 0);
        if (delCount > 0) {
            const str = String(num);
            if (o?.delFrom === "start") {
                num = Number(str.slice(delCount));
            } else {
                num = Number(str.slice(0, Math.max(0, str.length - delCount)));
            }
        }
        // 5) isi field (convert ke string untuk fill)
        await this.fill(ApplicationSettingLocator.inputTimeFirstWarning, String(num));
        await this.click(ApplicationSettingLocator.escapeKeyBoard);
    }


    async userSecondWaringTime(
        o?: { append?: boolean; delCount?: number; delFrom?: "start" | "end"; delSub?: number },
        second?: number | string
    ): Promise<void> {
        const field = this.getLocator(ApplicationSettingLocator.inputTimeSecondWaring);
        await this.expectVisible(ApplicationSettingLocator.inputTimeSecondWaring);
        await this.click(ApplicationSettingLocator.inputTimeSecondWaring);
        const raw = await field.inputValue();
        // validasi: kalau isi sekarang bukan number → warning & stop
        if (second !== undefined && isNaN(Number(second))) {
            console.warn("⚠️ This is not a number :", second, "Please input Number ONLY");
            return;
        }
        let current = raw === "" ? 0 : Number(raw);
        // 1) base number
        let num = typeof second === "number" ? second : current;
        // 2) append (gabung digit; contoh: 12 append 34 -> 1234)
        if (o?.append && typeof second === "number") {
            num = Number(String(current) + String(second));
        }
        // 3) hapus digit/sub-number tertentu (jika diminta)
        if (typeof o?.delSub === "number") {
            num = Number(String(num).replace(String(o.delSub), "")) || 0;
        }
        // 4) hapus N digit dari depan/belakang (jika diminta)
        const delCount = Math.max(0, o?.delCount ?? 0);
        if (delCount > 0) {
            const s = String(num);
            num =
                o?.delFrom === "start"
                    ? Number(s.slice(delCount)) || 0
                    : Number(s.slice(0, Math.max(0, s.length - delCount))) || 0;
        }
        // 5) isi field & tutup keyboard
        await this.fill(ApplicationSettingLocator.inputTimeSecondWaring, String(num));
        await this.click(ApplicationSettingLocator.escapeKeyBoard);
    }


    async userSetSalesMode(dineIn: string, quickService: string): Promise<void> {
        await this.expectVisible(ApplicationSettingLocator.showDineInMode);
        await this.click(ApplicationSettingLocator.showDineInMode);
        await this.expectVisible(ApplicationSettingLocator.selectSalesModeForDineIn(dineIn));
        await this.click(ApplicationSettingLocator.selectSalesModeForDineIn(dineIn));
        await this.click(ApplicationSettingLocator.closeAfterSet);
        await this.expectVisible(ApplicationSettingLocator.showQuickServiceMode);
        await this.click(ApplicationSettingLocator.showQuickServiceMode);
        await this.expectVisible(ApplicationSettingLocator.selectSalesModeForQuickService(quickService));
        await this.click(ApplicationSettingLocator.selectSalesModeForQuickService(quickService));
        await this.click(ApplicationSettingLocator.closeAfterSet);
    }

    async showDropDownDineISalesMode(): Promise<void> {
        await this.expectVisible(ApplicationSettingLocator.showDineInMode);
        await this.click(ApplicationSettingLocator.showDineInMode);
    }

    async userDineInSalesMode(dineIn: string | string[]): Promise<void> {
        const items = Array.isArray(dineIn) ? dineIn : [dineIn];
        const panel = "(//div[contains(@class,'mat-select-panel')])[1]";

        // buka panel hanya kalau lagi ketutup
        const openIfClosed = async () => {
            try {
                await this.expectVisible(panel);     // kalau masih kebuka, ini lolos
            } catch {
                await this.expectVisible(ApplicationSettingLocator.showDineInMode);
                await this.click(ApplicationSettingLocator.showDineInMode); // buka lagi
                await this.expectVisible(panel);
            }
        };

        for (const label of items) {
            await openIfClosed(); // pastikan panel ready tiap iterasi
            const opt = ApplicationSettingLocator.selectSalesModeForDineIn(label);
            await this.expectVisible(opt);
            await this.click(opt); // toggle (select/unselect)
        }

        await this.click(ApplicationSettingLocator.closeAfterSet);
    }

    async showDropDownQuickServiceSalesMode(): Promise<void> {
        await this.expectVisible(ApplicationSettingLocator.showQuickServiceMode);
        await this.click(ApplicationSettingLocator.showQuickServiceMode);
    }

    async userQuickServiceSalesMode(quickService: string | string[]): Promise<void> {

        const items = Array.isArray(quickService) ? quickService : [quickService];
        const panel = "(//div[contains(@class,'mat-select-panel')])[1]";

        // buka panel hanya kalau lagi ketutup
        const openIfClosed = async () => {
            try {
                await this.expectVisible(panel);     // kalau masih kebuka, ini lolos
            } catch {
                await this.expectVisible(ApplicationSettingLocator.showQuickServiceMode);
                await this.click(ApplicationSettingLocator.showQuickServiceMode); // buka lagi
                await this.expectVisible(panel);
            }
        };

        for (const label of items) {
            await openIfClosed(); // pastikan panel ready tiap iterasi
            const opt = ApplicationSettingLocator.selectSalesModeForQuickService(label);
            await this.expectVisible(opt);
            await this.click(opt); // toggle (select/unselect)
        }

        await this.click(ApplicationSettingLocator.closeAfterSet);
    }

    async userSalesModeforQuickService(quickService: string): Promise<void> {
        await this.expectVisible(ApplicationSettingLocator.showDefaultQsMode);
        await this.click(ApplicationSettingLocator.showDefaultQsMode);
        await this.expectVisible(ApplicationSettingLocator.selectSalesModeForDefaultQS(quickService));
        await this.click(ApplicationSettingLocator.selectSalesModeForDefaultQS(quickService));
        await this.click(ApplicationSettingLocator.closeAfterSet);
    }

    async userSetDirectServing(): Promise<void> {
        await this.expectVisible(ApplicationSettingLocator.checkboxDirectServing);
        await this.click(ApplicationSettingLocator.checkboxDirectServing);
    }

    async userHideNotesSetDirectServing(): Promise<void> {
        await this.expectVisible(ApplicationSettingLocator.toggleHidePendingNotes);
        await this.click(ApplicationSettingLocator.toggleHidePendingNotes);
    }

    async setCustomerDisplay(option: string): Promise<void> {
        // buka dropdown
        await this.expectVisible(ApplicationSettingLocator.checkboxShowCustomerDisplay);
        await this.click(ApplicationSettingLocator.checkboxShowCustomerDisplay);

        if (option.toUpperCase() === "OFF") {
            // pilih OFF
            await this.expectVisible(ApplicationSettingLocator.selectedOffShowCustomerDisplay);
            await this.click(ApplicationSettingLocator.selectedOffShowCustomerDisplay);
            return;
        }

        // pilih sesuai label yang lu kirim (exact match)
        const opt = ApplicationSettingLocator.selectedShowCustomerDisplay(option);
        await this.expectVisible(opt);
        await this.click(opt);
    }

    async proceedMonitorDisplay(): Promise<void> {
        await this.expectVisible(ApplicationSettingLocator.displayMonitorProceed);
        await this.click(ApplicationSettingLocator.displayMonitorProceed);
    }

    async cancelMonitorDisplay(): Promise<void> {
        await this.expectVisible(ApplicationSettingLocator.displayMonitorCancel);
        await this.click(ApplicationSettingLocator.displayMonitorCancel);
    }

    async inputLengthPoleDisplay(
        o?: { append?: boolean; delCount?: number; delFrom?: "start" | "end"; delSub?: number },
        length?: number | string
    ): Promise<void> {
        const field = this.getLocator(ApplicationSettingLocator.CustomerDisplayLength);
        await this.expectVisible(ApplicationSettingLocator.CustomerDisplayLength);
        await this.click(ApplicationSettingLocator.CustomerDisplayLength);
        const raw = await field.inputValue();
        // validasi: kalau isi sekarang bukan number → warning & stop
        if (length !== undefined && isNaN(Number(length))) {
            console.warn("⚠️ This is not a number :", length, "Please input Number ONLY");
            return;
        }
        let current = raw === "" ? 0 : Number(raw);
        // 1) base number
        let num = typeof length === "number" ? length : current;
        // 2) append (gabung digit; contoh: 12 append 34 -> 1234)
        if (o?.append && typeof length === "number") {
            num = Number(String(current) + String(length));
        }
        // 3) hapus digit/sub-number tertentu (jika diminta)
        if (typeof o?.delSub === "number") {
            num = Number(String(num).replace(String(o.delSub), "")) || 0;
        }
        // 4) hapus N digit dari depan/belakang (jika diminta)
        const delCount = Math.max(0, o?.delCount ?? 0);
        if (delCount > 0) {
            const s = String(num);
            num =
                o?.delFrom === "start"
                    ? Number(s.slice(delCount)) || 0
                    : Number(s.slice(0, Math.max(0, s.length - delCount))) || 0;
        }
        // 5) isi field & tutup keyboard
        await this.fill(ApplicationSettingLocator.CustomerDisplayLength, String(num));
        await this.click(ApplicationSettingLocator.escapeKeyBoard);
    }

    async inputPortPoleDisplay(
        o?: { append?: boolean; delCount?: number; delFrom?: "start" | "end"; delSub?: number },
        port?: number | string
    ): Promise<void> {
        const field = this.getLocator(ApplicationSettingLocator.CustomerDisplayport);
        await this.expectVisible(ApplicationSettingLocator.CustomerDisplayport);
        await this.click(ApplicationSettingLocator.CustomerDisplayport);
        const raw = await field.inputValue();
        // validasi: kalau isi sekarang bukan number → warning & stop
        if (port !== undefined && isNaN(Number(port))) {
            console.warn("⚠️ This is not a number :", port, "Please input Number ONLY");
            return;
        }
        let current = raw === "" ? 0 : Number(raw);
        // 1) base number
        let num = typeof port === "number" ? port : current;
        // 2) append (gabung digit; contoh: 12 append 34 -> 1234)
        if (o?.append && typeof port === "number") {
            num = Number(String(current) + String(port));
        }
        // 3) hapus digit/sub-number tertentu (jika diminta)
        if (typeof o?.delSub === "number") {
            num = Number(String(num).replace(String(o.delSub), "")) || 0;
        }
        // 4) hapus N digit dari depan/belakang (jika diminta)
        const delCount = Math.max(0, o?.delCount ?? 0);
        if (delCount > 0) {
            const s = String(num);
            num =
                o?.delFrom === "start"
                    ? Number(s.slice(delCount)) || 0
                    : Number(s.slice(0, Math.max(0, s.length - delCount))) || 0;
        }
        // 5) isi field & tutup keyboard
        await this.fill(ApplicationSettingLocator.CustomerDisplayport, String(num));
        await this.click(ApplicationSettingLocator.escapeKeyBoard);
    }

    async userSetSelfOrderServer(): Promise<void> {
        await this.expectVisible(ApplicationSettingLocator.checkboxSelfOrderServer);
        await this.wait(700);
        await this.click(ApplicationSettingLocator.checkboxSelfOrderServer);

    }

    async dropDownSelfOrderServer(): Promise<void> {
        await this.wait(300);
        await this.expectVisible(ApplicationSettingLocator.dropDownSelfOrderServer);
        await this.click(ApplicationSettingLocator.dropDownSelfOrderServer);
    }

    async userSetSelfOrderServerStation(station: string): Promise<void> {
        await this.wait(700);
        await this.expectVisible(ApplicationSettingLocator.selectESBOrderPrinterStation(station));
        await this.click(ApplicationSettingLocator.selectESBOrderPrinterStation(station));
    }

    async userOffSelfOrderServerStation(): Promise<void> {
        await this.expectVisible(ApplicationSettingLocator.turnOffServer);
        await this.click(ApplicationSettingLocator.turnOffServer);
        await this.waitForResponse("setting/save-terminal-setting");
    }

    async cancelUserOffSelfOrderServerStation(): Promise<void> {
        await this.expectVisible(ApplicationSettingLocator.cancelTurnOffServer);
        await this.click(ApplicationSettingLocator.cancelTurnOffServer);
    }

    async UserShowOnScreenKeyboard(): Promise<void> {
        await this.expectVisible(ApplicationSettingLocator.checkboxShowOnScreenKeyboard);
        await this.click(ApplicationSettingLocator.checkboxShowOnScreenKeyboard);
    }

    async userSetIntegratedScale(status: string): Promise<void> {
        await this.expectVisible(ApplicationSettingLocator.ShowOnIntegratedScale);
        await this.click(ApplicationSettingLocator.ShowOnIntegratedScale);
        await this.expectVisible(ApplicationSettingLocator.selectIntegratedScale(status));
        await this.click(ApplicationSettingLocator.selectIntegratedScale(status));
    }

    async UserShowInfoOnTable(): Promise<void> {
        await this.expectVisible(ApplicationSettingLocator.showInfoOnTable);
        await this.click(ApplicationSettingLocator.showInfoOnTable);
    }

    async saveSetting(): Promise<void> {
        await this.expectVisible(ApplicationSettingLocator.buttonSaveSetting);
        await this.click(ApplicationSettingLocator.buttonSaveSetting);
        await this.click(ApplicationSettingLocator.applicationSettingDialogOk);
    }

    async closePopUpApplicationSetting(): Promise<void> {
        await this.expectVisible(ApplicationSettingLocator.closePopUp);
        await this.click(ApplicationSettingLocator.closePopUp);
    }

}