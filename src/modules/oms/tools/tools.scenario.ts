import BaseScenario from "../../../base/base-scenario";
import {ToolsTabs} from "./ToolsTabs";

export default interface ToolsScenario extends BaseScenario {
    selectTab(tabName: ToolsTabs): Promise<void>;
}