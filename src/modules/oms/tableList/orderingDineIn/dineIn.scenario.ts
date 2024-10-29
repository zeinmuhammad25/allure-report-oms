import BaseScenario from "../../../../base/base-scenario";
import {promises} from "node:dns";

export default interface dineInScenario extends BaseScenario {
    bookTable():Promise<void>;
    bookAndOrder():Promise<void>;
}