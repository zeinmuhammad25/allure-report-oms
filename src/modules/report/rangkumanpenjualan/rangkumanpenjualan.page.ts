import BasePage from "../../../base/base-page";
import Urls from "../../../configs/urls";
import Element from "../../../base/objects/Element";
import RangkumanpenjualanScenario from "./rangkumanpenjualan.scenario";
import RangkumanpenjualanLocator from "./rangkumanpenjualan.locator";


export default class RangkumanpenjualanPage extends BasePage implements RangkumanpenjualanScenario {


    pageUrl = (): string => Urls.salessum;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(RangkumanpenjualanLocator.salesdatefield),
            Element.ofSelector(RangkumanpenjualanLocator.salescompfield),
            Element.ofSelector(RangkumanpenjualanLocator.salesbrandfield),
            Element.ofSelector(RangkumanpenjualanLocator.salesbranchfield),
            Element.ofSelector(RangkumanpenjualanLocator.salesdownloadbutton),
            Element.ofSelector(RangkumanpenjualanLocator.salesviewbutton),
        ];
    }


}