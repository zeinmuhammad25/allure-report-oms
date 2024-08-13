import BasePage from "../../../../base/base-page";
import Urls from "../../../../configs/urls";
import Element from "../../../../base/objects/Element";
import KycProcessLocator from "./kycProcess.locator";
import KycProcessScenario from "./kycProcess.scenario";


export default class KycProcessPage extends BasePage implements KycProcessScenario {


    pageUrl = (): string => Urls.menu;

    // Real URL =
    shouldHave(): Element[] {
        return [
            Element.ofSelector(KycProcessLocator.fullNameField),
            Element.ofSelector(KycProcessLocator.identityField),
            Element.ofSelector(KycProcessLocator.placeOfBirthField),
            Element.ofSelector(KycProcessLocator.dateOfBirthField),
            Element.ofSelector(KycProcessLocator.identityCamButton),
            Element.ofSelector(KycProcessLocator.selfImageCamButton),
        ];
    }


}