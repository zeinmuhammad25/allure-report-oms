import BasePosLitePage from "../../base-pos-lite-page";
import Element from "../../../../base/objects/Element";
import PrinterScenario from "./printer.scenario";
import PrinterLocator from "./printer.locator";


export default class PrinterPage extends BasePosLitePage implements PrinterScenario {
    private stationName = "Test Printer 01";

    pageUrl = (): string => this.urls.get.printerSetting.printerUrl;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(PrinterLocator.printerDeleteButton),
            Element.ofSelector(PrinterLocator.printerSearchBar),
            Element.ofSelector(PrinterLocator.printerSearchDropdown),
        ];
    }


    async navigateToPrinter(): Promise<void> {
        await this.expectVisible(PrinterLocator.printerSettingSidebar);
        await this.click(PrinterLocator.printerSettingSidebar);
        await this.click(PrinterLocator.printerSidebar);

    }

    async performAddPrinter(): Promise<void> {
        await this.expectVisible(PrinterLocator.printerButtonAdd);
        await this.click(PrinterLocator.printerButtonAdd);

    }

    async performEditPrinter(): Promise<void> {
        await this.expectVisible(PrinterLocator.printerEditButton);
    }

    async performDeletePrinter(): Promise<void> {
        await this.expectVisible(PrinterLocator.printerDeleteButton);
        await this.click(PrinterLocator.printerDeleteButton);
        await this.expectVisible(PrinterLocator.printerPopupImage);
        await this.click(PrinterLocator.printerPopupDelete);
        await this.click(PrinterLocator.printerDeleteNotif);
    }

    async performSearchPrinter(): Promise<void> {
        await this.expectVisible(PrinterLocator.printerSearchDropdown);
        await this.fill(PrinterLocator.printerSearchBar, this.stationName);
        await this.click(PrinterLocator.printerSearchButton);
        await this.expectVisible(PrinterLocator.printerStationData);

    }


}