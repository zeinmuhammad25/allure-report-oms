import BaseLocator from "../../../base/base-locator";

export default class RegisterLocator extends BaseLocator {
    static picNameField: string = "(//input[@placeholder='Contoh: Andi Firman'])[1]";
    static errorEmptyPicField: string = "(//div[contains(text(),'Nama Penanggung Jawab tidak boleh kosong.')])[1]";
    static emailFieldRegister: string = "(//input[@placeholder='emailanda@mail.com'])[1]";
    static phoneFieldRegister: string = "(//input[@placeholder='8xx xxxx xxxx'])[1]";
    static errorPhoneField: string = "(//div[contains(text(),'Format tidak valid.')])[1]"; //request dev for better ID
    static buttonRegister: string = "(//button[normalize-space()='Daftar'])[1]"; //request dev for better ID
    static signInNowButton: string = "(//a[normalize-space()='Masuk Sekarang'])[1]"; //request dev for better ID

}