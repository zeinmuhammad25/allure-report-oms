import BasePosLitePage from "../../base-pos-lite-page";
import Element from "../../../../base/objects/Element";
import BannerMarketingScenario from "./bannerMarketing.scenario";
import BannerMarketingLocator from "./bannerMarketing.locator";


export default class BannerMarketingPage extends BasePosLitePage implements BannerMarketingScenario {


    pageUrl = (): string => this.urls.get.esbOrder.bannerMarketingUrl;


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