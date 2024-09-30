import Element from "../../../../base/objects/Element";
import BaseEsoPage from "../../base/base-eso-page";
import ModeScenario from "./mode.scenario";
import ModeLocator from "./mode.locator";
import {EsoMode} from "../../objects/esoMode";
import {Language} from "../../objects/language";

export default class ModePage extends BaseEsoPage implements ModeScenario {
    private branchCode: string = 'WYR';

    pageUrl = (): string => this.urls.get.modePage(this.branchCode);

    shouldHave(): Element[] {
        return [
            Element.ofSelector(ModeLocator.backButton),
            Element.ofSelector(ModeLocator.languageButton)
        ]
    }

    selectMode(mode: EsoMode): Promise<void> {
        throw new Error("Method not implemented.");
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