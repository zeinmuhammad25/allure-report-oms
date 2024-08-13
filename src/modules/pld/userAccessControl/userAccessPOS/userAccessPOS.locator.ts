import BaseLocator from "../../../../base/base-locator";

export default class UserAccessPOSLocator extends BaseLocator {

    static userAccessPOSTab: string = "//div[@role='tab' and text()='Hak Akses POS']";

    static addUserAccessPOSButton: string = "//button[@routerlink='/role/pos-user-role/create']";
    static userAccessPOSNameField: string = "#posRoleDesc";
    static cancelButton: string = "//button[@routerlink='/role/pos-user-role/index']";
    static saveButton: string = "//button[text()=' Simpan ']";

    static userAccessPOSNameSearch: string = "//input[@placeholder='Cari Berdasarkan Nama Hak Akses POS']";
    static userActiveFeatureSearch: string = "//nz-select[@nzplaceholder='Cari Berdasarkan Fitur Yang Aktif']";
    static statusSearch: string = "//nz-select[@nzplaceholder='Cari Berdasarkan Status']";

    static userAccessPOSNameColumn: string = "//nz-table-sorters/span[text() = ' Nama Hak Akses POS ']";
    static userActiveFeatureColumn: string = "//nz-table-sorters/span[text() = ' Fitur Yang Aktif ']";
    static statusNameColumn: string = "//th[text() = ' Status ']";


    static tableListSelectAll: string = "//div[text()='Daftar Meja']/following-sibling::div//label[@formcontrolname='checkAllModule']//input";
    static salesRecapitulationSelectAll: string = "//div[text()='Rekapitulasi Penjualan']/following-sibling::div//label[@formcontrolname='checkAllModule']//input";
    static shiftInOutSelectAll: string = "//div[text()='Shift In / Out']/following-sibling::div//label[@formcontrolname='checkAllModule']//input";
    static detailRecapitulationSelectAll: string = "//div[text()='Detail Rekapitulasi']/following-sibling::div//label[@formcontrolname='checkAllModule']//input";
    static branchMenuSelectAll: string = "//div[text()='Cabang Menu']/following-sibling::div//label[@formcontrolname='checkAllModule']//input";
    static printerSelectAll: string = "//div[text()='Printer']/following-sibling::div//label[@formcontrolname='checkAllModule']//input";
    static deviceSelectAll: string = "//div[text()='Perangkat']/following-sibling::div//label[@formcontrolname='checkAllModule']//input";
    static otherSelectAll: string = "//div[text()='Lainnya']/following-sibling::div//label[@formcontrolname='checkAllModule']//input";

    static createOrder: string = "//div[text()='Buat Pesanan']/following-sibling::div//label[@formcontrolname='hasAccess']//input";
    static cancelOrder: string = "//div[text()='Pembatalan Pesanan']/following-sibling::div//label[@formcontrolname='hasAccess']//input";
    static moveTable: string = "//div[text()='Pindahkan Meja']/following-sibling::div//label[@formcontrolname='hasAccess']//input";
    static moveOrder: string = "//div[text()='Pindahkan Pesanan']/following-sibling::div//label[@formcontrolname='hasAccess']//input";
    static cancelTable: string = "//div[text()='Batalkan Meja']/following-sibling::div//label[@formcontrolname='hasAccess']//input";
    static addPromotion: string = "//div[text()='Tambah Promosi']/following-sibling::div//label[@formcontrolname='hasAccess']//input";
    static splitBill: string = "//div[text()='Pisahkan Tagihan']/following-sibling::div//label[@formcontrolname='hasAccess']//input";
    static openPrice: string = "//div[text()='Harga Bebas']/following-sibling::div//label[@formcontrolname='hasAccess']//input";
    static printBill: string = "//div[text()='Cetak Tagihan']/following-sibling::div//label[@formcontrolname='hasAccess']//input";
    static orderFee: string = "//div[text()='Biaya Pemesanan']/following-sibling::div//label[@formcontrolname='hasAccess']//input";
    static promotionMenuAuthorization: string = "//div[text()='Otorisasi Menu Promosi']/following-sibling::div//label[@formcontrolname='hasAccess']//input";
    static freeItemPromotionAuthorization: string = "//div[text()='Otorisasi Promosi Item Gratis']/following-sibling::div//label[@formcontrolname='hasAccess']//input";
    static dailySales: string = "//div[text()='Penjualan Harian']/following-sibling::div//label[@formcontrolname='hasAccess']//input";
    static salesHistory: string = "//div[text()='Riwayat Penjualan']/following-sibling::div//label[@formcontrolname='hasAccess']//input";
    static printAndResendBill: string = "//div[text()='Cetak dan Kirim Ulang Tagihan']/following-sibling::div//label[@formcontrolname='hasAccess']//input";
    static voidSales: string = "//div[text()='Penjualan Void']/following-sibling::div//label[@formcontrolname='hasAccess']//input";
    static itemVoidSales: string = "//div[text()='Penjualan Void Per-Item']/following-sibling::div//label[@formcontrolname='hasAccess']//input";
    static pastDateVoidSales: string = "//div[text()='Penjualan Void di Tanggal Lampau']/following-sibling::div//label[@formcontrolname='hasAccess']//input";
    static pastDateItemVoidSales: string = "//div[text()='Penjualan Item Void di Tanggal Lampau']/following-sibling::div//label[@formcontrolname='hasAccess']//input";
    static shiftInformation: string = "//div[text()='Informasi Shift']/following-sibling::div//label[@formcontrolname='hasAccess']//input";
    static shiftIn: string = "//div[text()='Shift Masuk']/following-sibling::div//label[@formcontrolname='hasAccess']//input";
    static shiftEnd: string = "//div[text()='Akhiri Shift']/following-sibling::div//label[@formcontrolname='hasAccess']//input";
    static shiftOut: string = "//div[text()='Shift Keluar']/following-sibling::div//label[@formcontrolname='hasAccess']//input";
    static startShiftMoreThanOnce: string = "//div[text()='Mulai Hari Lebih Dari Sekali']/following-sibling::div//label[@formcontrolname='hasAccess']//input";
    static shiftLogList: string = "//div[text()='Daftar Log Shift']/following-sibling::div//label[@formcontrolname='hasAccess']//input";
    static shiftDetail: string = "//div[text()='Shift Detail']/following-sibling::div//label[@formcontrolname='hasAccess']//input";
    static reprintShiftReport: string = "//div[text()='Cetak Ulang Laporan Shift']/following-sibling::div//label[@formcontrolname='hasAccess']//input";
    static menuBranchList: string = "//div[text()='Daftar Cabang Menu']/following-sibling::div//label[@formcontrolname='hasAccess']//input";
    static changeQtyAndOutOfStock: string = "//div[text()='Ubah Qty & Stok Habis']/following-sibling::div//label[@formcontrolname='hasAccess']//input";
    static changeStationMenu: string = "//div[text()='Ubah Station Menu']/following-sibling::div//label[@formcontrolname='hasAccess']//input";
    static editStation: string = "//div[text()='Edit Station']/following-sibling::div//label[@formcontrolname='hasAccess']//input";
    static printTest: string = "//div[text()='Tes Print']/following-sibling::div//label[@formcontrolname='hasAccess']//input";
    static openCashierDrawer: string = "//div[text()='Buka Laci Kasir']/following-sibling::div//label[@formcontrolname='hasAccess']//input";
    static dataSynchronization: string = "//div[text()='Sinkronisasi Data']/following-sibling::div//label[@formcontrolname='hasAccess']//input";
    static changePrinterSetting: string = "//div[text()='Ubah Pengaturan Cetakan']/following-sibling::div//label[@formcontrolname='hasAccess']//input";
    static branchEventList: string = "//div[text()='Daftar Acara Cabang']/following-sibling::div//label[@formcontrolname='hasAccess']//input";
    static pettyCash: string = "//div[text()='Kas Kecil']/following-sibling::div//label[@formcontrolname='hasAccess']//input";

}