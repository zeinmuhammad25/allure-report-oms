import BaseScenario from "../../../../../base/base-scenario";

export default interface MenuSingleScenario extends BaseScenario {

    fillMenuInformation(): Promise<void>;

    updateMenuInformation(): Promise<void>;
}
