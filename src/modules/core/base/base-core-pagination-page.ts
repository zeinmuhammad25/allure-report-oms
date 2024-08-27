import BaseCorePage from "./base-core-page";
import {CoreFilter} from "../objects/CoreFilter";
import {CoreAction} from "../objects/CoreAction";
import {expect, Locator, Page} from "@playwright/test";

export default abstract class BaseCorePaginationPage extends BaseCorePage {
    protected containerSelector = (): string => "//div[@id='w0-container']";
    protected loadingSelector = (): string => "//div[@class='kv-grid-loading' and @id='#w0-container']";
    public containerLocator: Locator;
    public filterLocator: Locator;
    public contentLocator: Locator;
    public emptyLocator: Locator;
    public loadingLocator: Locator;

    constructor(page: Page) {
        super(page);
        this.containerLocator = page.locator(this.containerSelector());
        this.filterLocator = this.containerLocator.locator('table').locator('thead');
        this.contentLocator = this.containerLocator.locator('table').locator('tbody');
        this.emptyLocator = this.contentLocator
            .locator('tr')
            .locator('td')
            .locator("//div[@class='empty']");
        this.loadingLocator = page.locator(this.loadingSelector())
    }

    abstract withActions(): CoreAction[];

    abstract withFilters(): CoreFilter[];

    async performCheckInitialElements(): Promise<void> {
        for (const filter of this.withFilters()) await filter.validate(this);
        await this.expectContentEmpty();
        for (const action of this.withActions()) await action.validate(this);
        await this.expectHasContent();
        return super.performCheckInitialElements();
    }

    public async expectContentEmpty() {
        await expect(this.emptyLocator).toBeVisible();
    }

    public async expectHasContent() {
        await expect(this.emptyLocator).toBeHidden();
    }

    public async waitForLoading(
        onComplete?: () => Promise<void>,
        duration: number = 100,
        retry: number = 20,
    ): Promise<void> {
        for (let i = 0; i < retry; i++) {
            await this.wait(duration);
            if (await this.loadingLocator.isHidden()) {
                if (onComplete != null) await onComplete();
                return;
            }
        }
    }
}