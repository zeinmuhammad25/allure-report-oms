import CorePaginationItem from "./CorePaginationItem";
import CorePaginationPage from "./CorePaginationPage";
import CorePaginationRow from "./CorePaginationRow";

export default class CorePaginationData {
    public limit: number = 10;
    public count: number = 10;
    public pages: CorePaginationPage[] = [];

    public pageCount = this.pages.length;


    constructor(limit: number, count: number) {
        this.limit = limit;
        this.count = count;
    }

    public addRow(row: CorePaginationRow): CorePaginationData {
        this.pages[this.findAvailablePage()].addRow(row);
        return this;
    }

    public addItem(item: CorePaginationItem): CorePaginationData {
        this.pages[this.findAvailablePage()].addItem(item);
        return this;
    }

    private findAvailablePage(): number {
        if (this.pages.length == 0 || !this.pages[this.pages.length - 1].canAddRow()) {
            this.pages.push(new CorePaginationPage(this.limit));
        }
        return this.pages.length - 1;

    }
}