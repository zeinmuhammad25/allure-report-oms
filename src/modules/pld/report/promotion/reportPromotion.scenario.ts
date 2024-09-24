import BaseScenario from "../../../../base/base-scenario";

export default interface ReportPromotionScenario extends BaseScenario {
    validateListOfDataPromotion(): Promise<void>

    validateDetailDataPromotion(): Promise<void>

    validateDownloadDataPromotion(): Promise<void>
}
