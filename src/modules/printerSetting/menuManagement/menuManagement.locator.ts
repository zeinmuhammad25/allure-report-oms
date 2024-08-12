import BaseLocator from "../../../base/base-locator";

export default class MenuManagementLocator extends BaseLocator {
    static menuManagementTab: string = "//div[@role='tab' and text()='Manajemen Menu']";
    static branchSearch: string = "//input[@placeholder='Cari Berdasarkan Cabang']";
    static branchColumn: string = "//nz-table-sorters/span[text() = ' Cabang ']";

    static firstBranchEditButton: string = "#i-branchmenu1";

    // Edit Menu Management
    static menuNameColumn: string = "//th[text() = 'Nama Menu']";
    static kitchenPrinterColumn: string = "//th[text() = 'Printer Dapur']";
    static checkerPrinterColumn: string = "//th[text() = 'Printer Checker']";
    static outOfStockColumn: string = "//th[text() = 'Stock Habis']";
    static selectKitchenPrinter: string = "//nz-select[@formcontrolname='stationID']";
    static selectCheckerPrinter: string = "//nz-select[@formcontrolname='checkerStationID']";

    static saveButton: string = "#c-branchmenu3";
    static cancelButton: string = "//button[@routerlink='/printer-setting/branch-menu/index']";


}