import BasePosLitePage from "../../base-pos-lite-page";
import Element from "../../../../base/objects/Element";
import ProfitAndLossScenario from "./profitAndLoss.scenario";
import ProfitAndLossLocator from "./profitAndLoss.locator";


export default class ProfitAndLossPage extends BasePosLitePage implements ProfitAndLossScenario {


    pageUrl = (): string => this.urls.get.report.profitAndLossUrl;

    shouldHave(): Element[] {
        return [

            Element.ofSelector(ProfitAndLossLocator.periodFromDateField),
            Element.ofSelector(ProfitAndLossLocator.periodToDateField),
            Element.ofSelector(ProfitAndLossLocator.profitAndLossReportTypeDropdown),
            Element.ofSelector(ProfitAndLossLocator.profitAndLossCompanyDropdown),
            Element.ofSelector(ProfitAndLossLocator.viewButton),

        ];
    }


}