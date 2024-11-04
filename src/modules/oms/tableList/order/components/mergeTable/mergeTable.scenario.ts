import BaseScenario from "../../../../../../base/base-scenario";

export default interface Book extends BaseScenario {
    selectRoom(roomName: string): Promise<void>;

    selectTable(tableName: string): Promise<void>;
    
}