import BaseScenario from "../../../base/base-scenario";

export default interface SidebarScenario extends BaseScenario {
    openSidebar(): Promise<void>;

    closeSidebar(): Promise<void>;

}