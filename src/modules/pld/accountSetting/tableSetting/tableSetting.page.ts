import Element from "../../../../base/objects/Element";
import TableSettingScenario from "./tableSetting.scenario";
import TableSettingLocator from "./tableSetting.locator";
import BasePosLitePage from "../../base-pos-lite-page";


export default class TableSettingPage extends BasePosLitePage implements TableSettingScenario {


    pageUrl = (): string => this.urls.get.accountSetting.tableSettingUrl;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(TableSettingLocator.addTableSettingButton),
            Element.ofSelector(TableSettingLocator.tableSettingSearchBranch),
            Element.ofSelector(TableSettingLocator.tableSettingSearchCompany),
            Element.ofSelector(TableSettingLocator.tableSettingSearchRoom),
            Element.ofSelector(TableSettingLocator.tableSettingStatus),
        ];
    }


}