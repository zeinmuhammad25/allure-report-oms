import BasePosLitePage from "../../base-pos-lite-page";
import Element from "../../../../base/objects/Element";
import ProfitAndLossScenario from "./profitAndLoss.scenario";
import ProfitAndLossLocator from "./profitAndLoss.locator";


export default class ProfitAndLossPage extends BasePosLitePage implements ProfitAndLossScenario {


    pageUrl = (): string => '';

    shouldHave(): Element[] {
        return [
            Element.ofText("Laporan Laba Rugi"),
            Element.ofSelector(ProfitAndLossLocator.periodFromDateField),
            Element.ofText("Periode Dari"),
            Element.ofSelector(ProfitAndLossLocator.periodToDateField),
            Element.ofText("Periode Sampai"),
            Element.ofSelector(ProfitAndLossLocator.reportTypeDropdown),
            Element.ofText("Jenis Laporan"),
            Element.ofSelector(ProfitAndLossLocator.businessField),
            Element.ofText("Usaha"),
            Element.ofSelector(ProfitAndLossLocator.viewButton),

        ];
    }


}