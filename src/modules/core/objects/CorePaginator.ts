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
        // this.firstLocator = this.paginatorLocator.locator("//li[@class='first']");
        // this.prevLocator = this.paginatorLocator.locator("//li[@class='prev']");
        // this.nextLocator = this.paginatorLocator.locator("//li[@class='next']");
        // this.lastLocator = this.paginatorLocator.locator("//li[@class='last']");

        this.pageLocator = this.paginatorLocator.locator("li");
        // .filter({hasNot: page.locator('.first')})
        // .filter({hasNot: this.prevLocator})
        // .filter({hasNot: this.nextLocator})
        // .filter({hasNot: this.lastLocator});
    }

    public async validate(page: BaseCorePaginationPage): Promise<void> {
        this.activePage = 0;
        // do nothing if no paginator
        if (await this.paginatorLocator.isHidden()) return;

        const pagesLocator = await this.pageLocator.all();
        const pageSize: number = pagesLocator.length;
        if (pageSize == 0) return;
        this.firstLocator = pagesLocator[0];
        this.prevLocator = pagesLocator[1];
        this.nextLocator = pagesLocator[pageSize - 2];
        this.lastLocator = pagesLocator[pageSize - 1];

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
            if (i == pageSize - 1) {
                await expect(this.nextLocator).toHaveClass(regexDisabled);
                await expect(this.lastLocator).toHaveClass(regexDisabled);
            }
            await page.wait(1000);
        }
        if (!await this.firstLocator.evaluate(on => on.classList.contains('disabled'))) {
            await this.firstLocator.locator('a').click();
        }
    }
}