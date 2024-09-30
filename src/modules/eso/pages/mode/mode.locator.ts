import BaseLocator from "../../../../base/base-locator";
import {EsoMode} from "../../objects/esoMode";

export default class ModeLocator extends BaseLocator {
    static backButton: string = "//button[contains(@class, 'back-button')]";
    static languageButton: string = "//button[@aria-label='language-button']";
    static branchInfo: string = "//div[@class='d-flex flex-row align-items-center branch-section pointer ng-star-inserted']";

    //Mode Buttons
    static buttonMode = (mode: EsoMode): string => `//button[@id='mode-${mode}']`;
}