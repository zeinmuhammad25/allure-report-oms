import BaseScenario from "../../../../base/base-scenario";

export default interface DineInScenario extends BaseScenario {
    bookTable():Promise<void>;
    bookAndOrder():Promise<void>;
}