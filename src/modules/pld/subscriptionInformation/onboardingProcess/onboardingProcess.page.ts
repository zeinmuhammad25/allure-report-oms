import BasePage from "../../../../base/base-page";
import Urls from "../../../../configs/urls";
import Element from "../../../../base/objects/Element";
import OnboardingProcessScenario from "./onboardingProcess.scenario";
import OnboardingProcessLocator from "./onboardingProcess.locator";


export default class OnboardingProcessPage extends BasePage implements OnboardingProcessScenario {


    pageUrl = (): string => Urls.menu;

    // Real URL =
    shouldHave(): Element[] {
        return [
            Element.ofSelector(OnboardingProcessLocator.inputBusinessPopUp),
            Element.ofSelector(OnboardingProcessLocator.businessType),
            Element.ofSelector(OnboardingProcessLocator.businessNameInput),
            Element.ofSelector(OnboardingProcessLocator.productTypeInput),
            Element.ofSelector(OnboardingProcessLocator.continueButton),
        ];
    }


}