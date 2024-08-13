import BasePage from "../../../../base/base-page";
import Urls from "../../../../configs/urls";
import Element from "../../../../base/objects/Element";
import OnlinePaymentScenario from "./onlinePayment.scenario";
import OnlinePaymentLocator from "./onlinePayment.locator";


export default class OnlinePaymentPage extends BasePage implements OnlinePaymentScenario {


    pageUrl = (): string => Urls.singlemenu;

    // real URL : /esb-core-lite/dashboard/online-fund/index

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