import BasePosLitePage from "../../base-pos-lite-page";
import Element from "../../../../base/objects/Element";
import SettingScenario from "./setting.scenario";
import SettingLocator from "./setting.locator";


export default class SettingPage extends BasePosLitePage implements SettingScenario {


    pageUrl = (): string => this.urls.get.esbOrder.settingUrl;


    shouldHave(): Element[] {
        return [
            Element.ofSelector(SettingLocator.settingTab),
            Element.ofSelector(SettingLocator.esoLinkField),
            Element.ofSelector(SettingLocator.editESOLink),
            Element.ofSelector(SettingLocator.visitLink),
            Element.ofSelector(SettingLocator.guideButton),
            Element.ofSelector(SettingLocator.branchSearch),
            Element.ofSelector(SettingLocator.statusSearch),
            Element.ofSelector(SettingLocator.statusSearch),
            Element.ofSelector(SettingLocator.branchColumn),
            Element.ofSelector(SettingLocator.statusESOColumn),

        ];
    }


}