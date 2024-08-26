import BasePosLitePage from "../../base-pos-lite-page";
import Element from "../../../../base/objects/Element";
import OnlinePaymentScenario from "./onlinePayment.scenario";
import OnlinePaymentLocator from "./onlinePayment.locator";


export default class OnlinePaymentPage extends BasePosLitePage implements OnlinePaymentScenario {


    pageUrl = (): string => this.urls.get.dashboard.onlinePaymentUrl;


    shouldHave(): Element[] {
        return [
            Element.ofSelector(OnlinePaymentLocator.dataReadGuideButton),
            Element.ofSelector(OnlinePaymentLocator.onlinePaymentDropdown),
            Element.ofSelector(OnlinePaymentLocator.onlinePaymentFilter),
            Element.ofSelector(OnlinePaymentLocator.onlinePaymentDayTab),
            Element.ofSelector(OnlinePaymentLocator.onlinePaymentWeekTab),
            Element.ofSelector(OnlinePaymentLocator.onlinePaymentDateField),
            Element.ofSelector(OnlinePaymentLocator.onlinePaymentDownload),
        ];
    }


}