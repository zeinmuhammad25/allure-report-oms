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

    private apiBaseUrl = "http://localhost/fnb-pos-v2/api/web/v1";

    async addOrderQuickService(): Promise<void> {
        await this.click(QuickServiceListLocator.sectionQuickService);
        await this.expectVisible(QuickServiceListLocator.buttonAddQuickService);
        await this.click(QuickServiceListLocator.buttonAddQuickService);

    }

    async editOrderQuickService(): Promise<void> {
        await this.clickTopSalesNum();
        console.log("Successfully clicked on the top salesNum.");
    }

    async selectSalesNum(salesNum: string | "first" | "last"): Promise<void> {
        await this.expectVisible(QuickServiceListLocator.quickServiceSalesNum(salesNum));
        await this.click(QuickServiceListLocator.quickServiceSalesNum(salesNum));
    }

    async quickServiceHasData(): Promise<boolean> {
        return await this.isVisible(QuickServiceListLocator.quickServiceSalesNum("first"));
    }

    async clickTopSalesNum(): Promise<void> {
        const salesNums = await this.getSalesNums();
        if (salesNums.length === 0) {
            throw new Error("No salesNums found in the response");
        }

        const topSalesNum = salesNums[0];
        console.log(`Top salesNum: ${topSalesNum}`);
        const topSalesNumLocator = `//td[normalize-space()='${topSalesNum}']`;
        await this.expectVisible(topSalesNumLocator);
        await this.click(topSalesNumLocator);
    }

    async gotoLastPage(): Promise<void> {
        await this.expectVisible(QuickServiceListLocator.getLocatorPagination("Last page"));
        await this.click(QuickServiceListLocator.getLocatorPagination("Last page"));
    }

    async clickLastSalesNum(): Promise<void> {
        const salesNums = await this.getSalesNums();
        if (salesNums.length === 0) {
            throw new Error("No salesNums found in the response");
        }
        const lastSalesNum = salesNums[salesNums.length - 1];
        console.log(`Last salesNum: ${lastSalesNum}`);
        const lastSalesNumLocator = `//td[normalize-space()='${lastSalesNum}']`;
        try {
            await this.expectVisible(lastSalesNumLocator);
            await this.click(lastSalesNumLocator);
        } catch (error) {
            console.warn(`Last salesNum not found, navigating to the last page. Error: ${error.message}`);
            await this.gotoLastPage();
            await this.expectVisible(lastSalesNumLocator);
            await this.click(lastSalesNumLocator);
        }
    }

    async getSalesNums(): Promise<string[]> {
        const token = await this.getLocalStorage("session");
        const result = await this.makeApiRequest<{ salesNum: string }[]>("/order/index-take-away/", {
            baseUrl: this.apiBaseUrl,
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        if (result.status === 200) {
            return result.data.map(item => item.salesNum);
        }
        throw new Error("Failed to fetch sales numbers.");
    }

}
