import BaseScenario from "../../../../base/base-scenario";

export default interface addOrderScenario extends BaseScenario {
    userAddOneMenuDetailPackage(): Promise<void>;

    userAddMultiMenuDetailPackage(): Promise<void>;

    userAddNotesMenuDetailPackage(): Promise<void>;

    userMinusQtyInDetailMenuPackage(): Promise<void>;

    userAddMakQtyInOneMenuDetailPackage(): Promise<void>;

    useraddMenuDetailPackageViaSearch(): Promise<void>;
}
