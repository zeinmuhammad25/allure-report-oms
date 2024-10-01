import Element from "../../../../../base/objects/Element";
import BaseEsoPage from "../../../base/base-eso-page";
import WhatsappScenario from "./whatsapp.scenario";
import WhatsappLocator from "./whatsapp.locator";

export default class WhatsappPage extends BaseEsoPage implements WhatsappScenario {

    pageUrl = (): string => this.urls.get.loginWhatsapp;

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
}