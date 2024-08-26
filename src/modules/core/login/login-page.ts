import Element from "../../../base/objects/Element";
import BaseCorePage from "../base-core-page";
import LoginLocator from "./login-locator";

export default class LoginPage extends BaseCorePage {
    pageUrl = (): string => "site/login";

    shouldHave(): Element[] {
        return [
            Element.ofText(this.configs.get.appVersion),
            Element.ofText("Empowering Indonesia’s"),
            Element.ofText("F&B Industry"),
            Element.ofText("The integration you won't find elsewhere "),
            Element.ofInput(LoginLocator.inputUsername, ""),
            Element.ofInput(LoginLocator.inputPassword, ""),
            Element.ofButtonWithSelector(LoginLocator.loginButton, "Sign In", true)
        ]
    }

    public async performLogin() {
        await this.fill(LoginLocator.inputUsername, this.configs.get.username);
        await this.fill(LoginLocator.inputPassword, this.configs.get.password);
        await this.click(LoginLocator.loginButton);
        await this.waitForVisible(LoginLocator.loginConfirmDialog, () => this.click(LoginLocator.loginConfirmButtonCancel));

        await this.expectInvisible(LoginLocator.loginConfirmDialog);

        await this.click(LoginLocator.loginButton);
        await this.waitForVisible(LoginLocator.loginConfirmDialog, () => this.click(LoginLocator.loginConfirmButtonConfirm));
        await this.waitForUrl(this.urls.get.home);
    }

}