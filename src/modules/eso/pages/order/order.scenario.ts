import BaseScenario from "../../../../base/base-scenario";
import {EsoMode} from "../../objects/esoMode";
import {Language} from "../../objects/language";

export default interface OrderScenario extends BaseScenario {

    addMenu(menuID: number): Promise<void>;

    increaseQty(menuID: number): Promise<void>;

    decreaseQty(menuID: number): Promise<void>;

    goToSearch(): Promise<void>;

    goToViewOrder(): Promise<void>;

    goToBranchDetail(): Promise<void>;

    goToOrderHistory(): Promise<void>;

    goToPrivacyPolicy(): Promise<void>;

    goToLoginPage(): Promise<void>;

    openSideBar(): Promise<void>;

    openMembershipForm(): Promise<void>;

    inputPhoneNumberMembership(phone: string): Promise<void>;

    inputPasswordMembership(pass: string): Promise<void>;

    inputTable(tableNumber: number): Promise<void>;

    changeLanguage(language: Language): Promise<void>;

    submitMembership(): Promise<void>;

    loginGoogle(): Promise<void>;

    loginFacebook(): Promise<void>;

    performApplyMembershipSubs(phone: string, pass: string): Promise<void>;

    expectInvalidInputOnApplyMembership(): Promise<void>;

    submitWithExpectationFailedResult(): Promise<void>;

    goBack(): Promise<void>;
}