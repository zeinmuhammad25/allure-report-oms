import Element from "../../../../../base/objects/Element";
import BasePosLitePage from "../../../base-pos-lite-page";
import PrinterCreateLocator from "./printerCreate.locator";
import PrinterCreateScenario from "./printerCreate.scenario";

export default class PrinterCreatePage extends BasePosLitePage implements PrinterCreateScenario {
    private stationName = "Test Printer 01";

    pageUrl = (): string => this.urls.get.login.loginUrl;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(PrinterCreateLocator.printerNameField),
            Element.ofSelector(PrinterCreateLocator.printerNameSuggestion1),
            Element.ofSelector(PrinterCreateLocator.printerNameSuggestion2),
            Element.ofSelector(PrinterCreateLocator.printerNameSuggestion3),
            Element.ofSelector(PrinterCreateLocator.printerBranchDropdown),
            Element.ofSelector(PrinterCreateLocator.printerViewDropdown),

        ];
    }


    async printerFormFill(): Promise<void> {
        await this.expectVisible(PrinterCreateLocator.printerNameField);
        await this.fill(PrinterCreateLocator.printerNameField, this.stationName);
        await this.click(PrinterCreateLocator.printerBranchDropdown);
        await this.click(PrinterCreateLocator.printerBranchOption1);
        await this.expectVisible(PrinterCreateLocator.printerViewDropdown);
        await this.click(PrinterCreateLocator.printerViewDropdown);
        await this.click(PrinterCreateLocator.printerViewType1);
        await this.click(PrinterCreateLocator.printerSaveButton);

    }

}