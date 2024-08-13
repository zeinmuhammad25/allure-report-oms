import BasePage from "../../../../base/base-page";
import Urls from "../../../../configs/urls";
import Element from "../../../../base/objects/Element";
import PrinterScenario from "./printer.scenario";
import PrinterLocator from "./printer.locator";


export default class PrinterPage extends BasePage implements PrinterScenario {


    pageUrl = (): string => Urls.printer;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(PrinterLocator.printerFilter),
            Element.ofSelector(PrinterLocator.findPrinterField),
            Element.ofSelector(PrinterLocator.printerArchiveButton),
            Element.ofSelector(PrinterLocator.addPrinterButton)
        ];
    }


}