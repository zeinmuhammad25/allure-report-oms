import BaseScenario from "../../../../../../base/base-scenario";

export default interface EditOrderScenario extends BaseScenario {
    editOrderQty(): Promise<void>;

    inputNotesMenu(): Promise<void>;

    applyPromotionMenu(): Promise<void>;
}