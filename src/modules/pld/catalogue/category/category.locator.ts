import BaseLocator from "../../../base/base-locator";

export default class CategoryLocator extends BaseLocator {
    static categoryTab: string = `//div[@role='tab' and text()='Kategori']`;
    static subCategoryTab: string = `//div[@role='tab' and text()='Sub Kategori']`;

    // Index Category
    static categoryNameColumn: string = `//nz-table-sorters/span[text() = ' Nama Kategori ']`;
    static subCategoryNameColumn: string = `//nz-table-sorters/span[text() = ' Nama Sub Kategori ']`;
    static statusNameColumn: string = `//th[text() = ' Status ']`;
    static categoryNameSearch: string = `//input[@placeholder='Cari Berdasarkan Nama Kategori']`;
    static subCategoryNameSearch: string = `//input[@placeholder='Cari Berdasarkan Nama Sub Kategori']`;
    static statusSearch: string = `//nz-select[@nzplaceholder='Cari Berdasarkan Status']`;
    static addCategoryButton: string = `#i-menucategory1`;
    static setSubCategory: string = `//td[text()='Makanan']/following-sibling::td/button[text() = ' Terapkan Sub Kategori']`;
    static editButton: string = `//td[text()='Makanan']/following-sibling::td/button[@nzplacement='bottomRight']`;


    //      Add Category
    static headerAddCategoryText: string = `//strong[text()='Tambah Kategori']`;
    static categoryNameField: string = `#menuCategoryDesc`;
    static categoryCodeField: string = `#menuCategoryCode`;
    static categoryDescriptionField: string = `#description`;
    static categoryImageField: string = `#browse`;
    static addSubCategoryField: string = `#c-menucategory3`;
    static generateCodeButton: string = `(//form//span/button[@nztooltiptitle='Generate Kode'])[1]`;    //Request Unique selector, because its duplicate
    static guideButton: string = `//app-guide-info`;
    static cancelButton: string = `//button[text()=' Batal ' and @routerlink='/catalog/menu-category/index']`;
    static saveButton: string = `#c-menucategory4`;


    // Pop Up Add Sub Category
    static headerPopUpSubCategoryText: string = `//strong[text()='Tambah Sub Kategori']`;
    static nameSubCategoryPopUpField: string = `#menuCategoryDetailDesc`;
    static codeSubCategoryPopUpField: string = `#menuCategoryDetailCode`;
    static descriptionSubCategoryPopUpField: string = `#description`;               //Request New Unique ID, because its duplicate
    static imageSubCategoryPopUpField: string = `#browse`;                          //Request New Unique ID, because its duplicate
    static cancelPopUpButton: string = `//form//button[text()='Batal']`;
    static addPopUpButton: string = `//form//button[text()=' Tambah ']`;
    static generateCodePopUpButton: string = `(//form//span/button[@nztooltiptitle='Generate Kode'])[2]`;       //Request Unique selector, because its duplicate

    // Pop Up Dirty Box
    static dirtyBoxPopUp: string = `//app-modal-dirty-form`;
    static dirtyBoxHeadlineText: string = `//h3[@class='dirty-form-container__headline' and text() = 'Apakah Anda yakin membatalkan pengisian?']`
    static dirtyBoxSubHeadlineText: string = `//p[@class='dirty-form-container__subheadline' and text() = 'Semua data yang sudah Anda isi di sini tidak akan tersimpan']`;
    static dirtyBoxCancelButton: string = `//div[@class= 'dirty-form-container__action']/button[text() = 'Batal']`;
    static dirtyBoxContinueButton: string = `//div[@class= 'dirty-form-container__action']/button[text() = 'Lanjut isi data']`;


}