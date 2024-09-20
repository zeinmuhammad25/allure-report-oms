import BaseLocator from "../../../../base/base-locator";

export default class LoginLocator extends BaseLocator {
    static inputUsername: string = '#loginform-username';
    static inputPassword: string = '#loginform-password';
    static loginButton: string = `#btnLogin`;

    static loginConfirmDialog: string = `#modal-check-session`;
    static loginConfirmButtonConfirm: string = `//button[normalize-space()='Yes']`;
    static loginConfirmButtonCancel: string = `//button[@type='button' and contains(@class, 'swal2-cancel')]`;
}