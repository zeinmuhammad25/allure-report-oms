import BasePosLitePage from "../../base-pos-lite-page";
import Element from "../../../../base/objects/Element";
import PaymentLocator from "./payment.locator";
import PaymentScenario from "./payment.scenario";


export default class PaymentPage extends BasePosLitePage implements PaymentScenario {


    pageUrl = (): string => this.urls.get.report.paymentReportUrl;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(PaymentLocator.salesDateField),

        ];
    }


}