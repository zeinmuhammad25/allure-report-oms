import BaseScenario from "../../../../../../base/base-scenario";

export default interface MoveItemScenario extends BaseScenario {
    moveAllMenu(): Promise<void>;

    movePartialItemMenu(): Promise<void>;

    moveItemToSectionDineIn(): Promise<void>;

    moveItemToSectionQuickService(): Promise<void>;
}