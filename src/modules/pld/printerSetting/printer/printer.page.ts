import BasePosLitePage from "../../base-pos-lite-page";
import Element from "../../../../base/objects/Element";
import PrinterScenario from "./printer.scenario";
import PrinterLocator from "./printer.locator";


export default class PrinterPage extends BasePosLitePage implements PrinterScenario {
    private stationName = "Test Printer Edit";
    private stationNameEdit = "Test Printer Edit";
    private stationNameEmpty = "";
    private stationNameSpecialChar = "test Printer@!#";
    private stationNameNumber = "test Printer0123";


    pageUrl = (): string => this.urls.get.printerSetting.printer;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(PrinterLocator.printerFilter),
            Element.ofSelector(PrinterLocator.findPrinterField),
            Element.ofSelector(PrinterLocator.printerArchiveButton),
            Element.ofSelector(PrinterLocator.addPrinterButton),
            Element.ofText("Pengaturan Printer")
        ];
    }


    async performAddPrinter(): Promise<void> {
        await this.expectTextVisible("Pengaturan Printer");
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
        await this.expectTextVisible("Data Berhasil disimpan!");
        await this.click(PrinterLocator.printerDeleteButton);
        await this.clickButtonByText("Ya, Hapus");
        await this.expectTextVisible("Data berhasil dipindahkan ke");


    }

    async performEditPrinter(): Promise<void> {
        await this.expectTextVisible("Pengaturan Printer");
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
        await this.expectTextVisible("Data Berhasil disimpan!");
        await this.click(PrinterLocator.printerEditButton);
        await this.clear(PrinterLocator.stationNameField);
        await this.fill(PrinterLocator.stationNameField, this.stationNameEdit);
        await this.click(PrinterLocator.printerBranchFilled);
        await this.click(PrinterLocator.printerViewOption2);
        await this.click(PrinterLocator.printerSaveButton);
        await this.expectTextVisible("Data Berhasil disimpan!");
        await this.click(PrinterLocator.printerDeleteButton);
        await this.clickButtonByText("Ya, Hapus");
        await this.expectTextVisible("Data berhasil dipindahkan ke");


    }


}