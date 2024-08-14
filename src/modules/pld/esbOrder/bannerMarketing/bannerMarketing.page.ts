import BasePage from "../../../../base/base-page";
import Urls from "../../../../configs/urls";
import Element from "../../../../base/objects/Element";
import BannerMarketingScenario from "./bannerMarketing.scenario";
import BannerMarketingLocator from "./bannerMarketing.locator";


export default class BannerMarketingPage extends BasePosLitePage implements BannerMarketingScenario {


    pageUrl = (): string => Urls.menu;

    // Real URL = https://dev7.esb.co.id/esb-core-lite/esb-order/banner/index
    shouldHave(): Element[] {
        return [
            Element.ofSelector(BannerMarketingLocator.bannerMarketingTab),
            Element.ofSelector(BannerMarketingLocator.bannerNameSearch),
            Element.ofSelector(BannerMarketingLocator.branchSearch),
            Element.ofSelector(BannerMarketingLocator.startDateSearch),
            Element.ofSelector(BannerMarketingLocator.endDateSearch),
            Element.ofSelector(BannerMarketingLocator.statusSearch),
            Element.ofSelector(BannerMarketingLocator.bannerNameColumn),
            Element.ofSelector(BannerMarketingLocator.branchColumn),
            Element.ofSelector(BannerMarketingLocator.startDateColumn),
            Element.ofSelector(BannerMarketingLocator.endDateColumn),
            Element.ofSelector(BannerMarketingLocator.statusNameColumn),
            Element.ofSelector(BannerMarketingLocator.addBannerMarketingButton),

        ];
    }


}