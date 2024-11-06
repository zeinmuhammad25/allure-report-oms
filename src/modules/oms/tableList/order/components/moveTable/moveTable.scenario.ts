import BaseScenario from "../../../../../../base/base-scenario";

export default interface MoveTableScenario extends BaseScenario {
    userSelectMoveTableToTable(): Promise<void>;

    userSelectMoveQuickServiceToTable(): Promise<void>;
}