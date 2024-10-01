import BaseScenario from "../../../../../base/base-scenario";

export default interface WhatsappScenario extends BaseScenario {
    requestOtpViaWhatsApp(phoneNumber: string): Promise<void>
}