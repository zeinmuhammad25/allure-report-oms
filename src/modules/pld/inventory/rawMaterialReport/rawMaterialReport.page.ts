import BasePosLitePage from "../../base-pos-lite-page";
import Element from "../../../../base/objects/Element";
import RawMaterialScenario from "../rawMaterial/rawMaterial.scenario";
import RawMaterialReportLocator from "./rawMaterialReport.locator";


export default class RawMaterialReportPage extends BasePosLitePage implements RawMaterialScenario {


    pageUrl = (): string => this.urls.get.inventory.rawMaterialReportUrl;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(RawMaterialReportLocator.rawMaterialReportTypeDropdown),
            Element.ofSelector(RawMaterialReportLocator.rawMaterialReportStartDate),
            Element.ofSelector(RawMaterialReportLocator.rawMaterialReportEndDate),
            Element.ofSelector(RawMaterialReportLocator.ramMaterialReportBranchDropdown),
            Element.ofSelector(RawMaterialReportLocator.rawMaterialReportViewButton),
        ];
    }


}