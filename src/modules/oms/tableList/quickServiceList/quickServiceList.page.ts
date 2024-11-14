import BaseOmsPage from "../../base-oms-page";
import Element from "../../../../base/objects/Element";
import QuickServiceListScenario from "./quickServiceList.scenario";
import QuickServiceListLocator from "./quickServiceList.locator";

export default class QuickServiceListPage extends BaseOmsPage implements QuickServiceListScenario {

    pageUrl: () => string;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(QuickServiceListLocator.buttonAddQuickService)
        ];
    }

    async addOrderQuickService(): Promise<void> {
        await this.click(QuickServiceListLocator.sectionQuickService);
        await this.expectVisible(QuickServiceListLocator.buttonAddQuickService);
        await this.click(QuickServiceListLocator.buttonAddQuickService);

    }

    async editOrderQuickService(): Promise<void> {
        await this.clickTopSalesNum();
        console.log("Successfully clicked on the top salesNum.");
    }

    async fetchSalesNums(): Promise<string[]> {
        const response = await this.makeApiRequest("/api/web/v1/order/index-take-away/");
        if (Array.isArray(response.data)) {
            return response.data.map(item => item.salesNum);
        }
        throw new Error("Unexpected API response format");

    }

    async clickTopSalesNum(): Promise<void> {
        const salesNums = await this.fetchSalesNums();
        if (salesNums.length === 0) {
            throw new Error("No salesNums found in the response");
        }

        const topSalesNum = salesNums[0];
        console.log(`Top salesNum: ${topSalesNum}`);
        const topSalesNumLocator = `//td[normalize-space()='${topSalesNum}']`;
        await this.expectVisible(topSalesNumLocator);
        await this.click(topSalesNumLocator);
    }

    async clickLastSalesNum(): Promise<void> {
        const salesNums = await this.fetchSalesNums();
        if (salesNums.length === 0) {
            throw new Error("No salesNums found in the response");
        }

        const lastSalesNum = salesNums[salesNums.length - 1];
        console.log(`Last salesNum: ${lastSalesNum}`);
        const lastSalesNumLocator = `//td[normalize-space()='${lastSalesNum}']`;
        await this.expectVisible(lastSalesNumLocator);
        await this.click(lastSalesNumLocator);
    }

}