import BaseLocator from "../../../base/base-locator";

export default class LoginLocator extends BaseLocator {
    static inputUsername: string = '#loginform-username';
    static inputPassword: string = '#loginform-password';
    static loginButton: string = `#btnLogin`;

    static loginConfirmDialog: string = `//div[@type='div' and contains(@class, 'swal2-popup swal2-modal swal2-show')]`;
    static loginConfirmButtonConfirm: string = `//button[@type='button' and contains(@class, 'swal2-confirm')]`;
    static loginConfirmButtonCancel: string = `//button[@type='button' and contains(@class, 'swal2-cancel')]`;
}