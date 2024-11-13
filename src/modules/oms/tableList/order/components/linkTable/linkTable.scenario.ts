import BaseScenario from "../../../../../../base/base-scenario";

export default interface LinkTableScenario extends BaseScenario {

    singleLinkTable(): Promise<void>;

    userMultiLinkTable(): Promise<void>;

    userCancelLink():Promise<void>;
}