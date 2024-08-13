import BasePage from "../../../base/base-page";
import Urls from "../../../configs/urls";
import Element from "../../../base/objects/Element";
import RawMaterialScenario from "../rawMaterial/rawMaterial.scenario";
import RawMaterialReportLocator from "./rawMaterialReport.locator";


export default class RawMaterialReportPage extends BasePage implements RawMaterialScenario {


    pageUrl = (): string => Urls.rawmaterial;

    shouldHave(): Element[] {
        return [
            Element.ofText("Laporan Bahan Baku"),
            Element.ofText("Tipe Laporan"),
            Element.ofText("Periode Dari"),
            Element.ofText("Periode Sampai"),
            Element.ofText("Cabang"),
            Element.ofSelector(RawMaterialReportLocator.reportTypeRawMaterialReportDropdown),
            Element.ofSelector(RawMaterialReportLocator.startDateRawMaterialReport),
            Element.ofSelector(RawMaterialReportLocator.endDateRawMaterialReport),
            Element.ofSelector(RawMaterialReportLocator.branchRawMaterialReportDropdown),
            Element.ofSelector(RawMaterialReportLocator.viewRawMaterialReportButton),
        ];
    }


}