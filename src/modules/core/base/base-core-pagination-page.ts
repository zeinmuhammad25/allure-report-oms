import BaseCorePage from "./base-core-page";
import {CoreFilter} from "../objects/CoreFilter";
import {CoreAction} from "../objects/CoreAction";
import {expect, Locator, Page} from "@playwright/test";
import CorePaginator from "../objects/CorePaginator";

export default abstract class BaseCorePaginationPage extends BaseCorePage {
    protected containerSelector = (): string => "//div[@id='w0-container']";
    protected loadingSelector = (): string => "//div[@class='kv-grid-loading' and @id='#w0-container']";

    public containerLocator: Locator;
    public filterLocator: Locator;
    public contentLocator: Locator;
    public emptyLocator: Locator;
    public loadingLocator: Locator;
    public rowsLocator: Locator;

    public corePaginator: CorePaginator;

    constructor(page: Page) {
        super(page);
        this.containerLocator = page.locator(this.containerSelector());
        this.filterLocator = this.containerLocator.locator('table').locator('thead');
        this.contentLocator = this.containerLocator.locator('table').locator('tbody');
        this.emptyLocator = this.contentLocator
            .locator('tr')
            .locator('td')
            .locator("//div[@class='empty']");
        this.rowsLocator = this.contentLocator
            .locator('tr')
            .filter({hasNot: this.emptyLocator});
        this.loadingLocator = page.locator(this.loadingSelector());
        this.corePaginator = new CorePaginator(page);
    }

    abstract withActions(): CoreAction[];

    abstract withFilters(): CoreFilter[];

    async performCheckInitialElements(): Promise<void> {
        await this.corePaginator.validate(this);
        for (const filter of this.withFilters()) await filter.validate(this);
        await this.expectContentEmpty();
        for (const action of this.withActions()) await action.validate(this);
        return super.performCheckInitialElements();
    }

    public async expectContentEmpty() {
        await expect(this.emptyLocator).toBeVisible();
    }

    public async expectHasContent() {
        await expect(this.emptyLocator).toBeHidden();
    }

    public async waitForLoadingComplete(
        onComplete?: () => Promise<void>,
        duration: number = 50,
        retry: number = 20,
    ): Promise<void> {
        for (let i = 0; i < retry; i++) {
            if (await this.loadingLocator.isHidden()) {
                if (onComplete != null) await onComplete();
                return;
            }
            await this.wait(duration);
        }
    }

    public async scanData() {

    }
}