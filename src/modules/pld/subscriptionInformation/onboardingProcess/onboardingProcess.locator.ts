import BaseLocator from "../../../../base/base-locator";

export default class OnboardingProcessLocator extends BaseLocator {

    // STEP 0
    static inputBusinessPopUp: string = "//app-modal-onboarding-form";
    static businessType: string = "#ownershipTypeID";
    static businessNameInput: string = "//input[@formcontrolname='companyName']";
    static brandNameInput: string = "//input[@formcontrolname='brandName']";
    static productTypeInput: string = "//app-select-chip[@placeholder='Pilih jenis produk']";
    static saveButton: string = "//button[text()=' Simpan ']";
    static continueButton: string = "//button[text()=' Lanjutkan ']";

    static guideItemCreateMenu: string = "#guidingItem0";
    static guideItemCreateBranch: string = "#guidingItem1";
    static guideItemStartSelling: string = "#guidingItem2";

    static openOutletPopUp: string = "//app-last-step-onboarding";
    static openNowButton: string = "#btnOpenOutlet";
    static openLaterButton: string = "//button[text()='Nanti saja']";

    // Step 1
    static openStorePopUp: string = "//app-last-step-onboarding";
    static menuMenuCoachMark: string = "//div[@class='introjs-tooltiptext' and contains(.,'Buat Menu untuk toko Anda di sini')]";
    static menuInformationCoachMark: string = "//div[@class='introjs-tooltiptext' and contains(.,'Mulai dengan lengkapi info menu yang akan Anda jual')]";
    static menuBookCoachMark: string = "//div[@class='introjs-tooltiptext' and contains(.,'Buku Menu berfungsi untuk membuat perbedaan harga pada satu menu')]";
    static menuBookBalloonTooltip: string = "//div[text() = 'Isi harga untuk menu Makan di Tempat Anda']";
    static menuTaxAndServiceChargeCoachMark: string = "//div[@class='introjs-tooltiptext' and contains(.,'Aktifkan Pajak & Service charge untuk menu Anda di sini')]";
    static continueSetUpBranchCoachMark: string = "//div[@class='introjs-tooltiptext' and contains(.,'Anda dapat melanjutkan Pengaturan Cabang disini')]";
    static continueSetUpBranchButton: string = "#btnCoachmarkBranch";

    // Step 2
    static branchMenuCoachMark: string = "//div[@class='introjs-tooltiptext' and contains(.,'Anda bisa mengatur informasi cabang di sini,')]";
    static salesModeCoachMark: string = "//div[@class='introjs-tooltiptext' and contains(.,'Mode penjualan adalah cara outlet melayani pesanan pelanggan.')]";
    static salesModeItemCoachMark: string = "//div[@class='introjs-tooltiptext' and contains(.,'Pengaturan biaya setiap mode penjualan bisa')]";

    // Step 3
    static bindingPopUp: string = "//app-modal-binding";
    static downloadConfirmationCheckBox: string = "#accent-download";
    static connectToPOSLiteButton: string = "#btn-download-poslite";
    static scanQRCoachMark: string = "//div[@class='introjs-tooltiptext' and contains(.,'Scan QR untuk sambungkan ke POSLite Apps')]";

    static createNowButton: string = "//a[text()='Buat Sekarang']";
    static addNowButton: string = "//a[text()='Tambahkan sekarang']";
    static okayButton: string = "//a[text()='Oke']";
    static connectNowButton: string = "//a[text()='Sambungkan Sekarang']";


}