import CorePaginationPage from "./CorePaginationPage";
import CorePaginationRow from "./CorePaginationRow";

export default class CorePaginationData {
    public limit: number;
    public countPage: number;
    public countColumn: number;
    public countItem: number;
    public pages: CorePaginationPage[] = [];

    public constructor(limit: number, countPage: number, countColumn: number, countItem: number) {
        this.limit = limit;
        this.countItem = countItem;
        this.countColumn = countColumn;
        this.countPage = countPage;
        for (let i = 0; i < countPage; i++) {
            this.pages.push(new CorePaginationPage(this.limit, this.countColumn, this.countItem));
        }
    }

    public addRow(page: number, row: CorePaginationRow) {
        this.pages[page].addRow(row);
    }
}