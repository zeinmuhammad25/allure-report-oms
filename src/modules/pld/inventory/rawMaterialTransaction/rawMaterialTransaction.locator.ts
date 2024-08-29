import BaseLocator from "../../../../base/base-locator";

export default class RawMaterialTransactionLocator extends BaseLocator {

    static rawMaterialTransactionDate: string = "(//input[@type='text'])[1]";
    static rawMaterialTransactionBranch: string = "//div[@class='ant-col ant-col-xs-24 ant-col-md-4']//nz-select[@nzplaceholder='Pilih Cabang' and @nzsize='large']";
    static rawMaterialTransactionType: string = "//nz-select[@id='transactionTypeID']";
    static rawMaterialTransactionCount: string = "//div[@class='page-total-container']";
    static rawMaterialTransactionAdd: string = "//button[normalize-space()='Tambah Transaksi']";

    //Tambah Transaksi page

    static rawMaterialTxBranchDropdown: string = "//nz-select-item[@title='Ini Cabang 6 Bulan']";
    static rawMaterialTxType: string = "//nz-select-item[@title='Penyesuaian Stok']";
    static rawMaterialTxNote: string = "//textarea[@id='additionalInfo']";
    static rawMaterialSettingButton: string = "(//button[normalize-space()='Atur Bahan Baku'])[1]";
    static rawMaterialCancelButton: string = "button[type='button']";
    static rawMaterialSaveButton: string = "//button[normalize-space()='Simpan']";

}