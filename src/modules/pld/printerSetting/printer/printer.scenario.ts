import BaseScenario from "../../../../base/base-scenario";

export default interface PrinterCreateS extends BaseScenario {

    navigateToPrinter(): Promise<void>;

    performAddPrinter(): Promise<void>;

    performEditPrinter(): Promise<void>;

    performDeletePrinter(): Promise<void>;

    performSearchPrinter(): Promise<void>;
}
