import BaseScenario from "../../../../base/base-scenario";
import {EsoMode} from "../../objects/esoMode";
import {Language} from "../../objects/language";

export default interface OrderScenario extends BaseScenario {

    addMenu(menuID: number): Promise<void>

    increaseQty(menuID: number): Promise<void>

    decreaseQty(menuID: number): Promise<void>

    goToSearch(): Promise<void>

    goToViewOrder(): Promise<void>

    goToBranchDetail(): Promise<void>

    goToOrderHistory(): Promise<void>

    goToPrivacyPolicy(): Promise<void>

    goToLoginPage(): Promise<void>

    goBack(): Promise<void>
}