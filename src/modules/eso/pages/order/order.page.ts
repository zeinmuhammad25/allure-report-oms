import Element from "../../../../base/objects/Element";
import BaseEsoPage from "../../base/base-eso-page";
import OrderScenario from "./order.scenario";
import {EsoMode} from "../../objects/esoMode";
import OrderLocator from "./order.locator";
import {Language} from "../../objects/language";
import BranchListLocator from "../branchList/branchList.locator";

export default class OrderPage extends BaseEsoPage implements OrderScenario {
    private branchCode: string = "WYR";
    private mode: EsoMode = EsoMode.DineIn;
    private categoryID: number = 6;
    private apiAuth: string = "/eso-api/web/v1/user/auth";
    private apiValidateLogin: string = "/qsv1/membership/validate-login";

    pageUrl = (): string => this.urls.get.orderPage(this.branchCode, this.mode, this.categoryID);

    shouldHave(): Element[] {
        return [
            Element.ofSelector(OrderLocator.backButton),
            Element.ofSelector(OrderLocator.searchButton),
            Element.ofSelector(OrderLocator.sideBarButton),
        ];
    }

    async addMenu(menuID: number): Promise<void> {
        await this.expectVisible(OrderLocator.addButton(menuID));
        await this.click(OrderLocator.addButton(menuID));
    }

    async increaseQty(menuID: number, times: number = 1): Promise<void> {
        if (times > 0) {
            for (let i = 0; i < times; i++) {
                await this.expectVisible(OrderLocator.plusButton(menuID));
                await this.click(OrderLocator.plusButton(menuID));
            }
        }
    }

    async decreaseQty(menuID: number, times: number = 1): Promise<void> {
        if (times > 0) {
            for (let i = 0; i < times; i++) {
                await this.expectVisible(OrderLocator.minusButton(menuID));
                await this.click(OrderLocator.minusButton(menuID));
            }
        }
    }

    async goToSearch(): Promise<void> {
        await this.expectVisible(OrderLocator.searchButton);
        await this.click(OrderLocator.searchButton);
    }

    async goToViewOrder(): Promise<void> {
        await this.expectVisible(OrderLocator.checkOutButton);
        await this.click(OrderLocator.checkOutButton);
    }

    async goToBranchDetail(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async goToOrderHistory(): Promise<void> {
        await this.expectVisible(OrderLocator.sideBarHistory);
        await this.click(OrderLocator.sideBarHistory);
    }

    async goToPrivacyPolicy(): Promise<void> {
        await this.expectVisible(OrderLocator.privacyPolicyButton);
        await this.click(OrderLocator.privacyPolicyButton);
    }

    async goToLoginPage(): Promise<void> {
        await this.expectVisible(OrderLocator.membershipLoginButton);
        await this.click(OrderLocator.membershipLoginButton);
    }

    async goBack(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async openSideBar(): Promise<void> {
        await this.expectVisible(OrderLocator.sideBarButton);
        await this.click(OrderLocator.sideBarButton);
    }

    async openMembershipForm(): Promise<void> {
        await this.expectVisible(OrderLocator.loopLiteButton);
        await this.click(OrderLocator.loopLiteButton);
    }

    async inputPhoneNumberMembership(phone: string): Promise<void> {
        await this.expectVisible(OrderLocator.phoneField);
        await this.fillPhone(OrderLocator.phoneField, phone, false);
    }

    async inputPasswordMembership(pass: string): Promise<void> {
        await this.expectVisible(OrderLocator.passwordField);
        await this.fill(OrderLocator.passwordField, pass);
    }

    async submitMembership(): Promise<void> {
        await this.expectVisible(OrderLocator.membershipLoginButton);
        await this.click(OrderLocator.membershipLoginButton);
        await this.waitForResponse(this.apiAuth);
    }

    async performApplyMembershipSubs(phone: string, pass: string): Promise<void> {
        await this.openSideBar();
        await this.openMembershipForm();
        await this.inputPhoneNumberMembership(phone);
        await this.inputPasswordMembership(pass);
        await this.submitMembership();
        await this.wait(300);
    }

    async expectInvalidInputOnApplyMembership(): Promise<void> {
        await this.expectVisible(OrderLocator.errorMessage);
    }

    async submitWithExpectationFailedResult(): Promise<void> {
        await this.expectVisible(OrderLocator.membershipLoginButton);
        await this.click(OrderLocator.membershipLoginButton);
        await this.waitForResponse(this.apiValidateLogin);
        await this.expectVisible(OrderLocator.errorMessage);
    }

    async inputTable(tableNumber: number): Promise<void> {
        await this.expectVisible(OrderLocator.tableField);
        await this.fill(OrderLocator.tableField, tableNumber.toString());
        await this.expectVisible(OrderLocator.tableSaveButton);
        await this.click(OrderLocator.tableSaveButton);
    }


    async changeLanguage(language: Language): Promise<void> {
        await this.setLanguage(language);
        await this.expectLanguage(language);
    }

    private async setLanguage(language: Language) {
        await this.expectVisible(OrderLocator.languageButton);
        await this.click(OrderLocator.languageButton);

        if (language === Language.Indonesia) {
            await this.expectVisible(OrderLocator.idLanguage);
            await this.click(OrderLocator.idLanguage);
        } else {
            await this.expectVisible(OrderLocator.enLanguage);
            await this.click(OrderLocator.enLanguage);
        }
    }

    private async expectLanguage(language: Language) {
        await this.openSideBar();
        if (language === Language.Indonesia) {
            await this.expectVisible(OrderLocator.idActiveLang);
        } else {
            await this.expectVisible(OrderLocator.enActiveLang);
        }
        await this.expectVisible(OrderLocator.sidebarCloseButton);
        await this.click(OrderLocator.sidebarCloseButton);
        await this.expectInvisible(OrderLocator.sidebarCloseButton);
    }

    async loginGoogle(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async loginFacebook(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}