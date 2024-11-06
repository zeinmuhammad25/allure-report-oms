import BaseScenario from "../../../../../../base/base-scenario";

export default interface AddOrderScenario extends BaseScenario {
    addOneMenuDetailPackage(): Promise<void>;

    addMultiMenuDetailPackage(): Promise<void>;

    addNotesMenuDetailPackage(): Promise<void>;

    minusQtyInDetailMenuPackage(): Promise<void>;

    addMaxQtyInOneMenuDetailPackage(): Promise<void>;

    addMenuDetailPackageViaSearch(): Promise<void>;
}
