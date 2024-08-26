import Element from "../../../../base/objects/Element";
import GenerateOTPScenario from "./generateOTP.scenario";
import GenerateOTPLocator from "./generateOTP.locator";
import BasePosLitePage from "../../base-pos-lite-page";


export default class GenerateOTPPage extends BasePosLitePage implements GenerateOTPScenario {


    pageUrl = (): string => this.urls.get.accountSetting.generateOTPUrl;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(GenerateOTPLocator.transactionNumberField),
            Element.ofSelector(GenerateOTPLocator.otpTypeField),
            Element.ofSelector(GenerateOTPLocator.otpField),
            Element.ofSelector(GenerateOTPLocator.copyButton),
            Element.ofSelector(GenerateOTPLocator.generateOTPButton),
        ];
    }


}