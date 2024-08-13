import BasePage from "../../../../base/base-page";
import Urls from "../../../../configs/urls";
import Element from "../../../../base/objects/Element";
import SettingScenario from "./setting.scenario";
import SettingLocator from "./setting.locator";


export default class SettingPage extends BasePage implements SettingScenario {


    pageUrl = (): string => Urls.menu;

    // Real URL = https://dev7.esb.co.id/esb-core-lite/esb-order/setting/index
    shouldHave(): Element[] {
        return [
            Element.ofSelector(SettingLocator.settingTab),
            Element.ofSelector(SettingLocator.companyImageTab),
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