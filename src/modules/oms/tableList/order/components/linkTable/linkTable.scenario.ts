import BaseScenario from "../../../../../../base/base-scenario";

export default interface LinkTableScenario extends BaseScenario {

    userSingleLinkTable(): Promise<void>;

    userMultiLinkTable(): Promise<void>;

    userLinkTableMultiData(): Promise<void>;

    userUnLinkTable(): Promise<void>;
}