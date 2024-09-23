import BaseCorePage from "./base-core-page";
import {CoreFilter} from "../objects/CoreFilter";
import {CoreAction} from "../objects/CoreAction";
import {expect, Locator, Page} from "@playwright/test";
import CorePaginator from "../objects/CorePaginator";
import CorePaginationData from "../objects/CorePaginationData";
import CorePaginationRow from "../objects/CorePaginationRow";
import CorePaginationItem from "../objects/CorePaginationItem";
import assert = require("node:assert");

export default abstract class BaseCorePaginationPage extends BaseCorePage {
    protected wCode: string = "w0";
    protected containerSelector = (): string => `//div[@id='${this.wCode}-container']`;
    protected loadingSelector = (): string => `//div[@class='kv-grid-loading' and @id='#${this.wCode}-container']`;
    protected itemCountSelector = (): string => "//div[@class='summary']//b>>nth=-1";
    protected filterSelector = (): string => `#${this.wCode}-filters`;

    public itemCountLocator: Locator;
    public containerLocator: Locator;
    public filterLocator: Locator;
    public columnLocator: Locator;
    public contentLocator: Locator;
    public emptyLocator: Locator;
    public loadingLocator: Locator;
    public rowsLocator: Locator;

    public corePaginator: CorePaginator;

    private data: CorePaginationData;
    protected rows: CorePaginationRow[] = [];
    private items: CorePaginationItem[] = [];
    private itemCount: number = 0;
    private columnFilterCount: number = 0;
    private columnCount: number = 0;
    private pageCount: number = 0;
    private limit: number = 20;

    public constructor(page: Page) {
        super(page);
        this.setupLocator();
    }

    abstract withActions(): CoreAction[];

    abstract withFilters(): CoreFilter[];

    async performCheckInitialElements(): Promise<void> {
        await this.doScraping();
        for (let i = 0; i < this.withFilters().length; i++) {
            const filter = this.withFilters()[i];
            const data = this.rows
                .map(value => value.items[i].content)
                // filter unique
                .filter((x, i, a) => a.indexOf(x) == i)
                // take first 5
                .slice(0, Math.min(this.rows.length, 5));

            await filter.validate(this, data, async (value: string) => {
                await this.wait(400);
                const content = await this.rowsLocator.first().locator('td').nth(i).textContent();
                assert(content.includes(value), `filter value: ${value} content: ${content}`)
            });
            await filter.cleanUp(this);
        }

        for (const action of this.withActions())
            await action.validate(this);
        return super.performCheckInitialElements();
    }

    private setupLocator() {
        this.itemCountLocator = this._page.locator(this.itemCountSelector());
        this.containerLocator = this._page.locator(this.containerSelector());
        this.filterLocator = this.containerLocator.locator(this.filterSelector());
        this.columnLocator = this.containerLocator.locator('table').locator('thead').locator('tr').first().locator('th');
        this.contentLocator = this.containerLocator.locator('table').locator('tbody');
        this.emptyLocator = this.contentLocator
            .locator('tr')
            .locator('td')
            .locator("//div[@class='empty']");
        this.rowsLocator = this.contentLocator
            .locator('tr')
        this.loadingLocator = this._page.locator(this.loadingSelector());
        this.corePaginator = new CorePaginator(this._page);
    }

    public async doScraping() {
        this.setupLocator();
        this.itemCount = Number(await this.itemCountLocator.textContent() ?? '0');
        this.columnCount = await this.columnLocator.count();
        this.columnFilterCount = await this.filterLocator.locator('td').count();
        this.pageCount = ~~(this.itemCount / this.limit) + (this.itemCount / this.limit > 0 ? 1 : 0);
        this.data = new CorePaginationData(this.limit, this.pageCount, this.columnFilterCount, this.itemCount);
        this.rows = [];
        await this.corePaginator.validate(this, async (page) => this.scanData(page));
        return this;
    }

    public async waitForLoadingComplete(
        onComplete?: () => Promise<void>,
        duration: number = 50,
        retry: number = 20,
    ): Promise<void> {
        await expect(this.loadingLocator).toBeHidden();
        if (onComplete != null) await onComplete();

        // for (let i = 0; i < retry; i++) {
        //     if (await this.loadingLocator.isHidden()) {
        //         if (onComplete != null) await onComplete();
        //         return;
        //     }
        //     await this.wait(duration);
        // }
    }

    public async scanData(page: number) {
        if (await this.emptyLocator.isVisible()) return;
        await expect(this.emptyLocator).toBeHidden();
        await this.wait(500);
        const rows = await this.rowsLocator.all();
        for (let i = 0; i < rows.length; i++) {
            const rowData = new CorePaginationRow(this.columnCount);
            const columns = await rows[i].locator("td").all();
            for (let j = 0; j < columns.length; j++) {
                const item = new CorePaginationItem(await columns[j].textContent());
                rowData.addItem(item);
                this.items.push(item);
            }
            this.rows.push(rowData);
            this.data.pages[page].addRow(rowData);
        }
    }
}