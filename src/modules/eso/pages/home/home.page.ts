import Element from "../../../../base/objects/Element";
import BaseEsoPage from "../../base/base-eso-page";
import HomeScenario from "./home.scenario";
import {EsoMode} from "../../objects/esoMode";
import HomeLocator from "./home.locator";
import {Language} from "../../objects/language";

export default class HomePage extends BaseEsoPage implements HomeScenario {
    private branchCode: string = 'WYR';
    private mode: EsoMode = EsoMode.DineIn;

    pageUrl = (): string => this.urls.get.homePage(this.branchCode, this.mode);

    shouldHave(): Element[] {
        return [
            Element.ofSelector(HomeLocator.tableField),
        ]
    }

    async inputTableNumber(table: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async changeMode(mode: EsoMode): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async changeLanguage(language: Language): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async goToSearch(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async goToBranchDetail(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async goToOrderHistory(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async goToPrivacyPolicy(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async goToLoginPage(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async goBack(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async selectCategory(language: Language): Promise<void> {
        throw new Error("Method not implemented.");
    }

}