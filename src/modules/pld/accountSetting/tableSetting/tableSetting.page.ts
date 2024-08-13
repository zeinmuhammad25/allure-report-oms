import BasePage from "../../../base/base-page";
import Urls from "../../../configs/urls";
import Element from "../../../base/objects/Element";
import TableSettingScenario from "./tableSetting.scenario";
import TableSettingLocator from "./tableSetting.locator";


export default class TableSettingPage extends BasePage implements TableSettingScenario {


    pageUrl = (): string => Urls.accbranch;

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