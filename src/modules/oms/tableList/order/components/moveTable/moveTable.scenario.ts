import BaseScenario from "../../../../../../base/base-scenario";

export default interface MoveTableScenario extends BaseScenario {
    autoMoveTable(): Promise<void>;

    selectRoom(roomName: string): Promise<void>;

    selectTable(tableName: string): Promise<void>;

    disableButtonByLabel(label: string): Promise<void>;

    cancelMoveTableBackTableList(): Promise<void>;

    selectTableAndCancelInAcRoom(): Promise<void>;

    selectTableAndCancelInSmokingRoom(): Promise<void>;

}