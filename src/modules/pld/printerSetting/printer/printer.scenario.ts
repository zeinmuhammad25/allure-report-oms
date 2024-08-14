import BaseScenario from "../../../../base/base-scenario";

export default interface PrinterScenario extends BaseScenario {

    performUiPrinterCheck(): Promise<void>;
    performAddPrinter(): Promise<void>;
}
