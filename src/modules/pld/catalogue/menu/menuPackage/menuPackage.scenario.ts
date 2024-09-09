import BaseScenario from "../../../../../base/base-scenario";

export default interface MenuPackageScenario extends BaseScenario {

    fillMenuPackageInformationForm(): Promise<void>;

    dismissTooltip(): Promise<void>;

    fillMenuPackageGroupForm(): Promise<void>;

    saveMenuPackage(): Promise<void>;

}
