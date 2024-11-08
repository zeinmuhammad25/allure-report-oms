import BaseScenario from "../../../../../../base/base-scenario";

export default interface MoveTableScenario extends BaseScenario {
    autoMoveTable(): Promise<void>;

    cancelMoveTableBackTableList(): Promise<void>;

    selectTableAndCancelInAcRoom(): Promise<void>;

    selectTableAndCancelInSmokingRoom(): Promise<void>;


}