import CorePaginationRow from "./CorePaginationRow";
import CorePaginationItem from "./CorePaginationItem";

export default class CorePaginationPage {
    public countColumn: number;
    public maxRow: number;
    public rows: CorePaginationRow[];

    public get countRow(): number {
        return this.rows.length;
    }

    constructor(maxRow: number) {
        this.maxRow = maxRow;
    }

    public canAddRow(): boolean {
        return this.countRow < this.maxRow;
    }

    public addRow(row: CorePaginationRow): CorePaginationPage {
        this.rows.push(row);
        return this;
    }

    public addItem(item: CorePaginationItem) {

    }

    private findAvailableRow(): number {
        if (this.rows.length == 0 || !this.rows[this.rows.length - 1].canAddItem()) {
            this.rows.push(new CorePaginationRow(this.countColumn));
        }
        return this.rows.length - 1;

    }
}