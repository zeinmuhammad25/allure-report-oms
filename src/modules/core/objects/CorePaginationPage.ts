import CorePaginationRow from "./CorePaginationRow";
import CorePaginationItem from "./CorePaginationItem";

export default class CorePaginationPage {
    public limit: number;
    public countColumn: number;
    public countItem: number;
    public rows: CorePaginationRow[];

    public get countRow(): number {
        return this.rows.length;
    }


    constructor(limit: number, countColumn: number, countItem: number) {
        this.limit = limit;
        this.countColumn = countColumn;
        this.countItem = countItem;
        this.rows = [];
    }

    public canAddRow(): boolean {
        return this.countRow < this.limit;
    }

    public addRow(row: CorePaginationRow): CorePaginationPage {
        this.rows.push(row);
        return this;
    }
}