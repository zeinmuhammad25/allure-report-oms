import BaseLocator from "../../../base/base-locator";

export default class SettingLocator extends BaseLocator {
    static settingTab: string = "//div[@role='tab' and text()='Pengaturan']";
    static companyImageTab: string = "//div[@role='tab' and text()='Gambar Pengaturan']";


    // Index ESB Order Setting
    static esoLinkField: string = "//input[@ng-reflect-model='https://dev7.esb.co.id/eso-qs/']";
    static editESOLink: string = "//span[text()=' Ubah ']/parent::button";
    static visitLink: string = "//span[text()=' Kunjungi Alamat ']/parent::button";
    static guideButton: string = "//a[@href='https://help.esb.id/content/article/mengatur-banner-marketing-pada-poslite-dashboard']";

    static branchSearch: string = "//input[@placeholder='Cari Berdasarkan Cabang']";
    static statusSearch: string = "//nz-select[@nzplaceholder='Cari Berdasarkan Status']";

    static branchColumn: string = "//nz-table-sorters/span[text() = ' Cabang ']";
    static statusESOColumn: string = "//th/span[text() = ' Status ESB Order ']";


    static companyAliasPopUp: string = "//app-modal-change-company-alias";
    static companyAliasField: string = "#companyAlias";

    static saveButton: string = "//button[text()=' Simpan ']";
    static cancelButton: string = "//button[text()='Batal']";
    static cancelEditButton: string = "//button[routerlink='/esb-order/setting/index']";

    // Edit Branch
    static branchNameField: string = "#branchName";
    static branchCodeField: string = "#branchCode";

    static esbOrderActiveYesRadio: string = "//nz-radio-group[@id='activateESBOrderQS']//span[text()=' Ya ']/preceding-sibling::span/input";
    static esbOrderActiveNoRadio: string = "//nz-radio-group[@id='activateESBOrderQS']//span[text()=' Tidak ']/preceding-sibling::span/input";
    static paymentMethodQRIS: string = "//span[text()='QRIS']//parent::div";
    static paymentMethodDana: string = "//span[text()='Dana']//parent::div";
    static paymentMethodLinkAja: string = "//span[text()='Link Aja']//parent::div";
    static paymentMethodShopeePay: string = "//span[text()='ShopeePay']//parent::div";
    static paymentMethodGoPay: string = "//span[text()='GoPay']//parent::div";
    static paymentMethodOVO: string = "//span[text()='OVO']//parent::div";
    static temporaryClosedYesRadio: string = "//nz-radio-group[@id='temporaryOutletClosedInformation']//span[text()=' Ya ']/preceding-sibling::span/input";
    static temporaryClosedNoRadio: string = "//nz-radio-group[@id='temporaryOutletClosedInformation']//span[text()=' Tidak ']/preceding-sibling::span/input";
    static dineInYesRadio: string = "//nz-radio-group[@id='dineIn']//span[text()=' Ya ']/preceding-sibling::span/input";
    static dineInNoRadio: string = "//nz-radio-group[@id='dineIn']//span[text()=' Tidak ']/preceding-sibling::span/input";
    static takeAwayYesRadio: string = "//nz-radio-group[@id='takeAway']//span[text()=' Ya ']/preceding-sibling::span/input";
    static takeAwayNoRadio: string = "//nz-radio-group[@id='takeAway']//span[text()=' Tidak ']/preceding-sibling::span/input";
    static deliveryYesRadio: string = "//nz-radio-group[@id='delivery']//span[text()=' Ya ']/preceding-sibling::span/input";
    static deliveryNoRadio: string = "//nz-radio-group[@id='delivery']//span[text()=' Tidak ']/preceding-sibling::span/input";
    static gosendDelivery: string = "//div[@formarrayname='deliveryCourierIDs']/div[1]";
    static lalamoveDelivery: string = "//div[@formarrayname='deliveryCourierIDs']/div[2]";
    static grabexpressDelivery: string = "//div[@formarrayname='deliveryCourierIDs']/div[3]";
    static pushToPOSYesRadio: string = "//nz-radio-group[@id='pushESBOrderDeliveryToPos']//span[text()=' Ya ']/preceding-sibling::span/input";
    static pushToPOSNoRadio: string = "//nz-radio-group[@id='pushESBOrderDeliveryToPos']//span[text()=' Tidak ']/preceding-sibling::span/input";
    static voucherUsageYesRadio: string = "//nz-radio-group[@id='voucherUsage']//span[text()=' Ya ']/preceding-sibling::span/input";
    static voucherUsageNoRadio: string = "//nz-radio-group[@id='voucherUsage']//span[text()=' Tidak ']/preceding-sibling::span/input";
    static promoAndVoucherUsageYesRadio: string = "//nz-radio-group[@id='parallelPromoAndVoucherusage']//span[text()=' Ya ']/preceding-sibling::span/input";
    static promoAndVoucherUsageNoRadio: string = "//nz-radio-group[@id='parallelPromoAndVoucherusage']//span[text()=' Tidak ']/preceding-sibling::span/input";
    static esbOrderBannerImage: string = "//nz-form-label[@nzfor='selfOrderBanner']/following-sibling::nz-form-control//app-image-uploader";
    static thumbnailImage: string = "//nz-form-label[@nzfor='branchThumbnailImage']/following-sibling::nz-form-control//app-image-uploader";
    static CategorySubCategoryMenuNavigation: string = "//nz-radio-group//span[text()='Kategori / Sub Kategori / Menu']/parent::span/preceding-sibling::span/input";
    static SubCategoryMenuNavigation: string = "//nz-radio-group//span[text()='Sub Kategori / Menu']/parent::span/preceding-sibling::span/input";
    static MenuNavigation: string = "//nz-radio-group//span[text()='Menu']/parent::span/preceding-sibling::span/input";
    static CategoryMenuNavigation: string = "//nz-radio-group//span[text()='Kategori / Menu']/parent::span/preceding-sibling::span/input";
    static mainPageShow: string = "//nz-radio-group[@id='orderLandingPage']//span[text()='Tampilkan']/parent::span/preceding-sibling::span/input";
    static mainPageNotShow: string = "//nz-radio-group[@id='orderLandingPage']//span[text()='Tidak']/parent::span/preceding-sibling::span/input";
    static menuGridView: string = "//nz-radio-group[@id='orderDisplayMode']//span[text()='Grid']/parent::span/preceding-sibling::span/input";
    static menuListView: string = "//nz-radio-group[@id='orderDisplayMode']//span[text()='List']/parent::span/preceding-sibling::span/input";


}