import BaseLocator from "../../../base/base-locator";

export default class KycProcessLocator extends BaseLocator {
    static kycPopUp: string = "//app-modal-fill-self-data";
    static notNowButton: string = "//button[text()='Nanti Saja']";
    static completeNowButton: string = "//button[text()='Lengkapi ']";

    // Step 1
    static fullNameField: string = "#name";
    static identityField: string = "#identityNumber";
    static placeOfBirthField: string = "#placeOfBirth";
    static dateOfBirthField: string = "//input[@placeholder='DD-MM-YYYY']";
    static identityCamButton: string = "#identity-cam-desktop";
    static identityCamPopUp: string = "//app-modal-add-image";
    static selfImageCamButton: string = "#self-image-cam-desktop";
    static selfImageCamPopUp: string = "//app-modal-add-image";

    static continueButton: string = "//button[text()=' Lanjutkan ']";
    static understandButton: string = "//button[text()='Mengerti']";
    static iUnderstandButton: string = "//button[text()='Saya Mengerti']";
    static adjustButton: string = "//button[text()='Sesuaikan']";
    static saveButton: string = "//button[text()='Simpan']";
    static retakeButton: string = "//button[text()='Ambil Ulang']";
    static takeIdentityPictureButton: string = "//app-modal-add-image//button[text()='Ambil Gambar']";
    static takeSelfImagePictureButton: string = "//app-modal-add-image//button[text()='Ambil Foto']";
    static cancelButton: string = "#btn-cancel-plan-form";
    static submitButton: string = "#btn-accent-plan-form";
    static submitConfirmationButton: string = "#btn-submit-confirmation";
    static cancelConfirmationButton: string = "#btn-cancel-confirmation";


    // Step 2
    static bankNameField: string = "#bankCode";
    static bankAccountNumberField: string = "#bankAccountNumber";
    static bankAccountNameField: string = "#bankAccountName";
    static dailyDisbursementOption: string = "//label[@id=1]";
    static weeklyDisbursementOption: string = "//label[@id=2]";
    static monthlyDisbursementOption: string = "//label[@id=3]";

    // Step 3
    static tncCheckBox: string = "#isToggleTnc";
    static tncPopUp: string = "//app-modal-tnc-disbursement";
    static agreeTncCheckBox: string = "#isAgreeTnc";


}