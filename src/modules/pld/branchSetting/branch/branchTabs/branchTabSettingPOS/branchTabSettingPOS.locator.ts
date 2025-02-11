import BaseLocator from "../../../../../../base/base-locator";

export default class BranchTabSettingPOSLocator extends BaseLocator {

    static branchTabSettingPOS: string = "//div[contains(text(),'Pengaturan POS')]";
    static mandatoryAdditionalInfoRadioButtonYes: string = "//label[@ng-reflect-nz-value='true']//span[@class='ant-radio']//input[@type='radio']";
    static mandatoryAdditionalInfoRadioButtonNo: string = "//nz-radio-group[@id='mandatoryAdditionalInfo']//label[@ng-reflect-nz-value='false']//input[@type='radio']";
    static notificationStoreCloseRadioYesButton: string = "//nz-radio-group[@id='shiftNotificationSetting1']//label[@ng-reflect-nz-value='true' and contains(@class, 'ant-radio-wrapper-checked')]";
    static notificationStoreCloseRadioNoButton: string = "//nz-radio-group[@id='shiftNotificationSetting1']//label[@ng-reflect-nz-value='false' and not(contains(@class, 'ant-radio-wrapper-checked'))]";
    static storeCloseRadioNoUnchecked: string = "//nz-form-item[.//label[contains(text(), 'Notifikasi Tutup Toko')]]//label[span[text()=' Tidak ']]/span[not(contains(@class, 'ant-radio-checked'))]/input";
    static storeCloseRadioNoChecked: string = "//nz-form-item[.//label[contains(text(), 'Notifikasi Tutup Toko')]]//label[span[text()=' Tidak ']]/span[contains(@class, 'ant-radio-checked')]";
    static storeCloseRadioYesUnchecked: string = "//nz-form-item[nz-form-label/label[@for='shiftNotificationSetting1']]//nz-radio-group[@formcontrolname='shiftNotificationSetting1']//label[@ng-reflect-nz-value='true' and contains(@class, 'ant-radio-wrapper') and not(contains(@class, 'ant-radio-wrapper-checked'))]//span[text()=' Ya ']";
    static storeCloseRadioYesChecked: string = "//nz-form-item[nz-form-label/label[@for='shiftNotificationSetting1']]//nz-radio-group[@formcontrolname='shiftNotificationSetting1']//label[@ng-reflect-nz-value='true' and contains(@class, 'ant-radio-wrapper-checked')]//span[text()=' Ya ']";


    //reminderStoreClose
    static reminderStoreCloseDropdown: string = "//input[@placeholder='Atur Waktu']";
    static storeCloseClockPickerHour: string = "//div[@class='cdk-overlay-container']//ul[1]//li[10]//div[1]"
    static storeCloseClockPickerMinute: string = "//ul[2]//li[6]//div[1]";

    static branchTabSettingPOSSaveButton: string = "//button[@class='button button-orange button-small ng-star-inserted']";


}