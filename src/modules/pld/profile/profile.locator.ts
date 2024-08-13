import BaseLocator from "../../../../base/base-locator";

export default class ProfileLocator extends BaseLocator {

    static infoProfileSelected: string = "//div[@aria-selected='true']"; //request for better locator name
    static infoProfileUnselected: string = "//div[@aria-selected='false']"; //Request for better locator name
    static infoButton: string = "//button[@class='button button-info']"
    static editUsername: string = "//nz-input-group/span/div\n"; // request for better locator name: button Ubah in Nama User field
    static editPhonenumber: string = ""; // request for better locator name: button Ubah in No. Telepon
    static namaUser: string = "(//input[@id='fullName'])[2]";
    static cancelButton: string = "//button[@type='button']";
    static saveButton: string = "//button[normalize-space()='Simpan']";
    static buttonBack: string = "//button[@class='button back']";


}