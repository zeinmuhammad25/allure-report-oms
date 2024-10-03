import Element from "../../../../../base/objects/Element";
import BaseEsoPage from "../../../base/base-eso-page";
import WhatsappScenario from "./whatsapp.scenario";
import WhatsappLocator from "./whatsapp.locator";

export default class WhatsappPage extends BaseEsoPage implements WhatsappScenario {
    private branch: string = 'SFF10';
    private phoneNumber: string = '82111111111';
    private otp: string = '000000';
    private apiProfile: string = '/web/v1/user/profile';

    pageUrl = (): string => this.urls.get.loginWhatsapp(this.branch);

    shouldHave(): Element[] {
        return [
            Element.ofSelector(WhatsappLocator.countryCode),
            Element.ofSelector(WhatsappLocator.phoneField),
            Element.ofSelector(WhatsappLocator.sendButton),
        ]
    }

    requestOtpViaWhatsApp(phoneNumber: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async performLoginWhatsAppSubs(): Promise<void> {
        await this.expectVisible(WhatsappLocator.phoneField)
        await this.fill(WhatsappLocator.phoneField, this.phoneNumber)
        await this.expectVisible(WhatsappLocator.sendButton)
        await this.click(WhatsappLocator.sendButton)
        await this.fillOtp()
        await this.waitForResponse(this.apiProfile)
    }

    private async fillOtp(): Promise<void> {
        const otpArray = this.otp.split('');
        for (let i = 0; i < otpArray.length; i++) {
            const locator = WhatsappLocator.otpFieldByIndex(i + 1);
            await this.expectVisible(locator)
            await this.fill(locator, otpArray[i])
        }
    }
}
