import BaseScenario from "../../../../base/base-scenario";

export default interface PrinterScenario extends BaseScenario {

    performAddPrinter(): Promise<void>;

    performEditPrinter(): Promise<void>;
}
