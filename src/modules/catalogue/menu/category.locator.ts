import BaseLocator from "../../../base/base-locator";

export default class CategoryLocator extends BaseLocator {
    static categoryTab : string = `//div[@role='tab' and text()='Kategori']`;
    static subCategoryTab : string = `//div[@role='tab' and text()='Sub Kategori']`;

    //     Index Menu
    static categoryNameColumn : string = `//nz-table-sorters/span[text() = ' Nama Kategori '];`;
    static subCategoryNameColumn : string = `//th[text() = ' Status ']`;

    static categoryNameSearch: string = `//input[@placeholder='Cari Berdasarkan Nama Kategori']`;


}