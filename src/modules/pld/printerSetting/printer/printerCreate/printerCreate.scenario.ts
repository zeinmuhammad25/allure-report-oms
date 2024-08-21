import BaseScenario from "../../../../../base/base-scenario";

export default interface PrinterCreateScenario extends BaseScenario {

    printerFormFill(): Promise<void>;
}
