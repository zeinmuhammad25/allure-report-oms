import BaseLocator from "../../../base/base-locator";

export default class PaymentMethodLocator extends BaseLocator {
    static addPaymentMethodButton: string = "//button[@routerlink='/account-setting/payment-method/create']";
    static paymentMethodNameSearch: string = "//input[@placeholder='Cari Berdasarkan Nama Metode Pembayaran']";
    static paymentMethodTypeSearch: string = "//nz-select[@nzplaceholder='Cari Berdasarkan Tipe Metode']";
    static branchSearch: string = "//nz-select[@nzplaceholder='Cari Berdasarkan Cabang']";
    static statusSearch: string = "//nz-select[@nzplaceholder='Cari Berdasarkan Status']";

    static paymentMethodNameColumn: string = "//nz-table-sorters/span[text() = ' Nama Metode Pembayaran ']";
    static paymentMethodTypeColumn: string = "//nz-table-sorters/span[text() = ' Tipe Metode ']";
    static branchColumn: string = "//nz-table-sorters/span[text() = ' Cabang ']";
    static statusNameColumn: string = "//th[text() = ' Status ']";

    // Add Payment Method
    static methodTypeField: string = "#paymentMethodTypeID";
    static methodNameField: string = "#paymentMethodName";
    static branchField: string = "//nz-select[@formcontrolname='branchIDs']";

    static saveButton: string = "//button[text()=' Simpan ']";
    static cancelButton: string = "//button[@routerlink='/account-setting/payment-method/index']";

}