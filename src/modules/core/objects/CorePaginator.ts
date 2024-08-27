import {expect, Locator, Page} from "@playwright/test";
import BaseCorePaginationPage from "../base/base-core-pagination-page";

export default class CorePaginator {
    protected paginatorSelector = (): string => "//div[@class='kv-panel-pager']";
    public paginatorLocator: Locator;
    public firstLocator: Locator;
    public prevLocator: Locator;
    public pageLocator: Locator;
    public nextLocator: Locator;
    public lastLocator: Locator;

    private activePage: number;

    constructor(page: Page) {
        this.paginatorLocator = page.locator(this.paginatorSelector()).locator('ul');
        this.pageLocator = this.paginatorLocator.locator("li");
        this.firstLocator = this.pageLocator.first();
        this.lastLocator = this.pageLocator.last();
    }

    public async validate(page: BaseCorePaginationPage, onPageChanged?: (page: number) => Promise<void>): Promise<void> {
        this.activePage = 0;
        // do nothing if no paginator
        if (await this.paginatorLocator.isHidden()) {
            if (onPageChanged != null) await onPageChanged(this.activePage);
            return;
        }

        const pagesLocator = await this.pageLocator.all();
        const pageSize: number = pagesLocator.length;
        if (pageSize == 0) return;
        this.prevLocator = pagesLocator[1];
        this.nextLocator = pagesLocator[pageSize - 2];

        const regexDisabled = new RegExp("disabled");
        const regexEnabled = new RegExp("^(?!.*\bdisable\b).*");
        await expect(this.firstLocator).toHaveClass(regexDisabled);
        await expect(this.prevLocator).toHaveClass(regexDisabled);
        await expect(pagesLocator[0]).toHaveClass(regexDisabled);
        if (pageSize == 1) {
            await expect(this.nextLocator).toHaveClass(regexDisabled);
            await expect(this.lastLocator).toHaveClass(regexDisabled);
            return;
        }
        await expect(this.nextLocator).toHaveClass(regexEnabled);
        await expect(this.lastLocator).toHaveClass(regexEnabled);

        for (let i = 3; i < pageSize - 2; i++) {
            this.activePage = i - 2;
            await pagesLocator[i].locator('a').click();
            await page.waitForLoadingComplete();
            if (onPageChanged != null) await onPageChanged(this.activePage);

            if (i == pageSize - 1) {
                await expect(this.nextLocator).toHaveClass(regexDisabled);
                await expect(this.lastLocator).toHaveClass(regexDisabled);
            }
            await page.wait(1000);
        }

        // restore to first page
        if (!await this.firstLocator.evaluate(on => on.classList.contains('disabled'))) {
            await this.firstLocator.locator('a').click();
            this.activePage = 0;
        }
    }
}