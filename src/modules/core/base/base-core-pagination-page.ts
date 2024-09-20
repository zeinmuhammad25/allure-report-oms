import BaseCorePage from "./base-core-page";
import {CoreFilter} from "../objects/CoreFilter";

export default abstract class BaseCorePaginationPage extends BaseCorePage {
    abstract withFilters(): CoreFilter[];

    async performCheckInitialElements(): Promise<void> {
        for (const filter of this.withFilters()) await filter.validate(this);
        return super.performCheckInitialElements();
    }
}