import Element from "../../../../base/objects/Element";
import BaseEsoPage from "../../base/base-eso-page";
import ModeScenario from "./mode.scenario";
import ModeLocator from "./mode.locator";
import {EsoMode} from "../../objects/esoMode";
import {Language} from "../../objects/language";

export default class ModePage extends BaseEsoPage implements ModeScenario {
    private branchCode: string = 'SFF10';

    pageUrl = (): string => this.urls.get.modePage(this.branchCode);

    shouldHave(): Element[] {
        return [
            Element.ofSelector(ModeLocator.backButton),
            Element.ofSelector(ModeLocator.languageButton)
        ]
    }

    async selectMode(mode: EsoMode): Promise<void> {
        await this.expectVisible(ModeLocator.buttonMode(mode))
        await this.click(ModeLocator.buttonMode(mode))
    }

    changeLanguage(language: Language): Promise<void> {
        throw new Error("Method not implemented.");
    }

    openCompanyBusinessHour(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    contactUs(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    visitUs(): Promise<void> {
        throw new Error("Method not implemented.");
    }

}