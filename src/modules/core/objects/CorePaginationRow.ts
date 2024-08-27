import CorePaginationItem from "./CorePaginationItem";

export default class CorePaginationRow {
    public countColumn: number;
    public items: CorePaginationItem[];

    public get countItem(): number {
        return this.items.length;
    }

    constructor(countColumn: number) {
        this.countColumn = countColumn;
    }

    public addItems(...items: CorePaginationItem[]) {
        this.items.push(...items);
    }

    public canAddItem(): boolean {
        return this.countItem < this.countColumn;
    }
}