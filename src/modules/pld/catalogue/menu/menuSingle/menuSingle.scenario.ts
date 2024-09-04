import BaseScenario from "../../../../../base/base-scenario";
import MenuSinglePage from "./menuSingle.page";

export default interface MenuSingleScenario extends BaseScenario {

    fillMenuInformation(): Promise<void>;
}
