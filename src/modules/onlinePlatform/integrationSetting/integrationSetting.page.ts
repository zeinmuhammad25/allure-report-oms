import BasePage from "../../../base/base-page";
import Urls from "../../../configs/urls";
import Element from "../../../base/objects/Element";
import IntegrationSettingScenario from "./integrationSetting.scenario";
import IntegrationSettingLocator from "./integrationSetting.locator";


export default class IntegrationSettingPage extends BasePage implements IntegrationSettingScenario {


    pageUrl = (): string => Urls.menu;


    shouldHave(): Element[] {
        return [
            Element.ofSelector(IntegrationSettingLocator.activeTab),
            Element.ofSelector(IntegrationSettingLocator.inactiveTab),
            Element.ofSelector(IntegrationSettingLocator.addBranchIntegration),
            Element.ofSelector(IntegrationSettingLocator.applicationProcessTab),
            Element.ofSelector(IntegrationSettingLocator.applicationProcessFailedTab),
            Element.ofSelector(IntegrationSettingLocator.listBranchOnlineSetting),
        ];
    }


}