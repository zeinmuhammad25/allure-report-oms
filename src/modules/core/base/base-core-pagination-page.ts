import BaseCorePage from "./base-core-page";
import {CoreFilter} from "../objects/CoreFilter";
import {CoreAction} from "../objects/CoreAction";
import {expect, Locator, Page} from "@playwright/test";
import CorePaginator from "../objects/CorePaginator";
import CorePaginationData from "../objects/CorePaginationData";
import CorePaginationRow from "../objects/CorePaginationRow";
import CorePaginationItem from "../objects/CorePaginationItem";

export default abstract class BaseCorePaginationPage extends BaseCorePage {
    protected containerSelector = (): string => "//div[@id='w0-container']";
    protected loadingSelector = (): string => "//div[@class='kv-grid-loading' and @id='#w0-container']";
    protected itemCountSelector = (): string => "//div[@class='summary']//b>>nth=-1";

    public itemCountLocator: Locator;
    public containerLocator: Locator;
    public filterLocator: Locator;
    public contentLocator: Locator;
    public emptyLocator: Locator;
    public loadingLocator: Locator;
    public rowsLocator: Locator;

    public corePaginator: CorePaginator;

    private data: CorePaginationData;
    private items: CorePaginationItem[] = [];
    private itemCount: number = 0;
    private columnCount: number = 0;
    private pageCount: number = 0;
    private limit: number = 20;

    public constructor(page: Page) {
        super(page);
        this.itemCountLocator = page.locator(this.itemCountSelector());
        this.containerLocator = page.locator(this.containerSelector());
        this.filterLocator = this.containerLocator.locator('#w0-filters');
        this.contentLocator = this.containerLocator.locator('table').locator('tbody');
        this.emptyLocator = this.contentLocator
            .locator('tr')
            .locator('td')
            .locator("//div[@class='empty']");
        this.rowsLocator = this.contentLocator
            .locator('tr')
        this.loadingLocator = page.locator(this.loadingSelector());
        this.corePaginator = new CorePaginator(page);
    }

    abstract withActions(): CoreAction[];

    abstract withFilters(): CoreFilter[];

    async performCheckInitialElements(): Promise<void> {
        this.itemCount = Number(await this.itemCountLocator.textContent() ?? '0');
        this.columnCount = await this.filterLocator.locator('td').count();
        this.pageCount = ~~(this.itemCount / this.limit) + (this.itemCount / this.limit > 0 ? 1 : 0);
        this.data = new CorePaginationData(this.limit, this.pageCount, this.columnCount, this.itemCount);

        await this.corePaginator.validate(this, async (page) => this.scanData(page));
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

    public async scanData(page: number) {
        if (await this.emptyLocator.isVisible()) return;
        await expect(this.emptyLocator).toBeHidden();
        await this.wait(100);
        const rows = await this.contentLocator.locator('tr').all();
        for (let i = 0; i < rows.length; i++) {
            const rowData = new CorePaginationRow(this.columnCount);
            const columns = await rows[i].locator("td").all();
            for (let j = 0; j < columns.length; j++) {
                const content = await columns[j].textContent();
                const item = new CorePaginationItem(content);
                rowData.addItem(item);
                this.items.push(item);
            }
            this.data.pages[page].addRow(rowData);
        }
    }
}