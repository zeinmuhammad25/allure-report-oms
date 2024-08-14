import BasePosLitePage from "../../base-pos-lite-page";
import Element from "../../../../base/objects/Element";
import PrinterScenario from "./printer.scenario";
import PrinterLocator from "./printer.locator";


export default class PrinterPage extends BasePosLitePage implements PrinterScenario {
    private stationName = "test Printer";
    private stationNameEmpty = "";
    private stationNameSpecialChar = "test Printer@!#";
    private stationNameNumber = "test Printer0123";

    pageUrl = (): string => this.urls.get.printerSetting.printer;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(PrinterLocator.printerFilter),
            Element.ofSelector(PrinterLocator.findPrinterField),
            Element.ofSelector(PrinterLocator.printerArchiveButton),
            Element.ofSelector(PrinterLocator.addPrinterButton)
        ];
    }

    async performUiPrinterCheck(): Promise<void> {
        await this.expectTextVisible("Pengaturan Printer");
        console.log("Verified text 'Pengaturan Printer' is visible");
        await this.clickText("Pengaturan Printer");
        await this.expectVisible(PrinterLocator.printerButtonSidebar);
        await this.click(PrinterLocator.printerButtonSidebar);
        await this.click(PrinterLocator.addPrinterButton);
        await this.clear(PrinterLocator.stationNameField);
        await this.fill(PrinterLocator.stationNameField, this.stationName);
    }

    async performAddPrinter(): Promise<void> {
        await this.expectTextVisible("Pengaturan Printer");
        console.log("Verified text 'Pengaturan Printer' is visible");
        await this.clickText("Pengaturan Printer");
        await this.expectVisible(PrinterLocator.printerButtonSidebar);
        await this.click(PrinterLocator.printerButtonSidebar);
        await this.click(PrinterLocator.addPrinterButton);
        await this.click(PrinterLocator.suggestionStationName);
        await this.clear(PrinterLocator.stationNameField);
        await this.fill(PrinterLocator.stationNameField, this.stationName);
        await this.click(PrinterLocator.printerBranchField);
        await this.click(PrinterLocator.printerViewOption1);
        await this.clickButtonByText("Simpan");
        await this.click(PrinterLocator.printerDeleteButton);
        await this.expectTextVisible("Ya, Hapus");
        await this.clickButtonByText("Ya, Hapus");
        await this.expectTextInvisible("Ya, Hapus");
        await this.expectTextInvisible("Test Printer");

    }


}