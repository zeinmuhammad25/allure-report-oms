import BaseCorePage from "./base-core-page";
import {CoreFilter} from "../objects/CoreFilter";

export default abstract class BaseCorePaginationPage extends BaseCorePage {
    private locatorLoading = "#w0-container[contains(@class, 'kv-grid-loading')]";

    abstract withFilters(): CoreFilter[];

    async performCheckInitialElements(): Promise<void> {
        for (const filter of this.withFilters())
            await this.waitForInvisible(this.locatorLoading, () => this.validateFilter(filter));
        return super.performCheckInitialElements();
    }

    private async validateFilter(filter: CoreFilter) {
        await filter.validate(this);
    }
}