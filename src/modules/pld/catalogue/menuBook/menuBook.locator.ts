import BaseLocator from "../../../../base/base-locator";

export default class MenuBookLocator extends BaseLocator {
    static menuBookTab: string = "//div[@role='tab' and text()='Buku Menu']";
    static recommendationMenuTab: string = "//div[@role='tab' and text()='Menu Rekomendasi']";

    // Index menuBook
    static bookNameColumn: string = "//nz-table-sorters/span[text() = ' Nama Buku Menu ']";
    static inclusivePriceColumn: string = "//th[text() = ' Harga Inklusif ']";
    static statusNameColumn: string = "//th[text() = ' Status ']";
    static bookNameSearch: string = "//input[@placeholder='Cari Berdasarkan Nama Buku Menu']";
    static inclusivePriceSearch: string = "//nz-select[@nzplaceholder='Cari Berdasarkan Harga Inklusif']";
    static statusSearch: string = "//nz-select[@nzplaceholder='Cari Berdasarkan Status']";
    static addCategoryButton: string = "#i-menutamplate1";
    static editButton: string = "//td[text()='Makan di Tempat']/following-sibling::td/button[@nzplacement='bottomRight']";

    // Add menuBook
    // Menu Book Tab
    static bookNameField: string = "#menuTemplateName";
    static flagInclusiveToggle: string = "#flagInclusive";
    static duplicateMenuBookButton: string = "//span[text() = 'Salin Buku Menu']/parent::button";
    static selectCategoryButton: string = "#c-menutemplate3";
    static categoryOption: string = "//span[text() = 'Makanan']/parent::div";
    static esbOrderTooltip: string = "//app-standar-tooltip[@ng-reflect-desc= 'Jika ESB Order diaktifkan maka']";

    static selectCategoryPopUp: string = "//app-modal-list-select";
    static searchFilterPopUp: string = "//input[@placeholder = 'Cari']";

    // Recommendation Menu Tab
    static addGroupButton: string = "//span[text() = 'Tambah Kelompok']/parent::button";
    static deleteGroupButton: string = "//span[text() = 'Hapus Kelompok']/parent::button";
    static addRecommendationMenuButton: string = "//span[text() = 'Tambah Menu Rekomendasi']/parent::button";
    static recommendationMenuTooltipButton: string = "//app-standar-tooltip[@desc = 'Anda dapat mengatur menu rekomendasi dari menu utama yang diatur']";

    static addGroupPopUp: string = "//app-modal-create-group-data";
    static addButtonPopUp: string = "//button[text() = ' Tambah ']";
    static cancelButtonPopUp: string = "//button[text() = 'Batal']";


}