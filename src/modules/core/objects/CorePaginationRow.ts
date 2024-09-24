import CorePaginationItem from "./CorePaginationItem";

export default class CorePaginationRow {
    public countColumn: number;
    public items: CorePaginationItem[];

    public get countItem(): number {
        return this.items.length;
    }

    constructor(countColumn: number) {
        this.countColumn = countColumn;
        this.items = [];
    }

    public addItem(item: CorePaginationItem) {
        this.items.push(item);
    }

    public addItems(...items: CorePaginationItem[]) {
        this.items.push(...items);
    }

    public canAddItem(): boolean {
        return this.countItem < this.countColumn;
    }

    public getItem(position: number){
        return this.items[position];
    }
}