import BaseScenario from "../../../../../../base/base-scenario";
import AddMenuModel from "../../addMenu.model";

export default interface AddOrderScenario extends BaseScenario {

    modifyMenuDetailPackage(menuOrder: AddMenuModel[]): Promise<void>;

    applyMenuDetailPackage(): Promise<void>;

    cancelMenuDetailPackage(): Promise<void>;

}
