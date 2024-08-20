import BaseScenario from "../../../../base/base-scenario";

export default interface MenuManagementScenario extends BaseScenario {

    navigateToManagement(): Promise<void>;

    managementMenuSearch(): Promise<void>;

    managementMenuEdit(): Promise<void>;

}