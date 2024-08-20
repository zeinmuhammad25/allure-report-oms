import BaseLocator from "../../../base/base-locator";

export default class ProfileLocator extends BaseLocator {

    static infoProfileSelected: string = "//div[@aria-selected='true']";
    static infoProfileUnselected: string = "//div[@aria-selected='false']";
    static infoButton: string = "//button[@class='button button-info']"
    static userNameEditButton: string = "//div[contains(@class, 'esb-caption-1') and contains(@class, 'c-pointer') and contains(@class, 'ng-star-inserted') and text()='Ubah']";
    static userNameEditFieldPopup: string = "(//input[@id='fullName'])[2]";
    static editPhonenumber: string = "";
    static userNameField: string = "//input[@id='fullName']";
    static cancelButton: string = "//button[@type='button']";
    static saveButton: string = "//button[normalize-space()='Simpan']";
    static buttonBack: string = "//button[@class='button back']";


}