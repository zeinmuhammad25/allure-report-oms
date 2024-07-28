import BaseLocator from "../../base/base-locator";

export default class RegisterLocator extends BaseLocator {
    static picnamefield: string = "(//input[@placeholder='Contoh: Andi Firman'])[1]";
    static erroremptypicfield: string = "(//div[contains(text(),'Nama Penanggung Jawab tidak boleh kosong.')])[1]";
    static emailfield: string = "(//input[@placeholder='emailanda@mail.com'])[1]";
    static phonefield: string = "(//input[@placeholder='8xx xxxx xxxx'])[1]";
    static errorphonefield: string = "(//div[contains(text(),'Format tidak valid.')])[1]"; //request dev for better ID
    static buttonregister: string = "(//button[normalize-space()='Daftar'])[1]"; //request dev for better ID
    static signinnowbutton: string = "(//a[normalize-space()='Masuk Sekarang'])[1]"; //request dev for better ID

}