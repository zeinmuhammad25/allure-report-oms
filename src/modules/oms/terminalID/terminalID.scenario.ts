import BaseScenario from "../../../base/base-scenario";

export default interface TerminalIDScenario extends BaseScenario {

    selectTerminalID(): Promise<void>

    applyTerminalID(): Promise<void>

    claimTerminalID(): Promise<void>

    saveTerminalID(): Promise<void>


}