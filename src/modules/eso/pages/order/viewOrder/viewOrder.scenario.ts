import BaseScenario from "../../../../../base/base-scenario";

export default interface ViewOrderScenario extends BaseScenario {
    goBack(): Promise<void>;

    continueToPayment(): Promise<void>;

    addNotes(notes: string): Promise<void>;
}