import BaseScenario from "../../../../../../base/base-scenario";
import AddMenuModel from "../../addMenu.model";

export default interface AddOrderV2Scenario extends BaseScenario {

    modifyHeadPackage(qty: number[]): Promise<void>;

    modifyDetailPackage(menuOrder: AddMenuModel[]): Promise<void>;

    selectPackageGroup(groupName: string): Promise<void>;

    nextMoveOtherMenuDetailPackage(): Promise<void>;

    addToCartMenuDetailPackage(): Promise<void>;

    cancelMenuDetailPackage(): Promise<void>;
}