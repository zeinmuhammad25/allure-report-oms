import BasePosLitePage from "../../base-pos-lite-page";
import Element from "../../../../base/objects/Element";
import ReportPromotionScenario from "./reportPromotion.scenario";
import ReportPromotionLocator from "./reportPromotion.locator";

export default class ReportPromotionPage extends BasePosLitePage implements ReportPromotionScenario {

    pageUrl = (): string => this.urls.get.report.promotionReportUrl;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(ReportPromotionLocator.salesDateField),
            Element.ofSelector(ReportPromotionLocator.salesCompanyField),
            Element.ofSelector(ReportPromotionLocator.salesBrandField),
            Element.ofSelector(ReportPromotionLocator.salesBranchField),
            Element.ofSelector(ReportPromotionLocator.reportMode),
            Element.ofSelector(ReportPromotionLocator.promotionType),
            Element.ofSelector(ReportPromotionLocator.promotionName),
            Element.ofSelector(ReportPromotionLocator.transactionNumber),
            Element.ofSelector(ReportPromotionLocator.salesViewButton),


        ];
    }

private async inputSalesDate():Promise<void>{

}
private async inputSalesCompany():Promise<void>{

}
private async inputSalesBrand():Promise<void>{

}
private async inputSalesBranch():Promise<void>{

}
private async inputReportMode():Promise<void>{

}
private async inputPromotionType():Promise<void>{

}
private async inputPromotionName():Promise<void>{

}
private async inputTransactionNumber():Promise<void>{

}

private async fillFilterAndShow():Promise<void>{
    await this.inputSalesDate()
    await this.inputSalesCompany()
    await this.inputSalesBrand()
    await this.inputSalesBranch()
    await this.inputReportMode()
    await this.inputPromotionType()
    await this.inputPromotionName()
    await this.inputTransactionNumber()
}

    async validateListOfDataPromotion(): Promise<void> {
        await this.fillFilterAndShow()
    }

    async validateDetailDataPromotion(): Promise<void> {
        await this.fillFilterAndShow()
    }

    async validateDownloadDataPromotion(): Promise<void> {
        await this.fillFilterAndShow()
        await this.clickAndExpectDownloadedFile(ReportPromotionLocator.salesDownloadButton, 'LAPORAN_PROMOSI','xlsx')
    }
}