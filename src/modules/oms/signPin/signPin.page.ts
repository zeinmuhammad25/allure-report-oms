import signPinScenario from "./signPin.scenario";
import BaseOmsPage from "../base-oms-page";
import Element from "../../../base/objects/Element";
import SignPinLocator from "./signPin.locator";

export  default class SignPinPage extends BaseOmsPage implements signPinScenario {

    pageUrl = (): string => this.urls.get.generalPos.loginPage;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(SignPinLocator.fieldPin),
            Element.ofSelector(SignPinLocator.buttonPin1),
            Element.ofSelector(SignPinLocator.buttonPin2),
            Element.ofSelector(SignPinLocator.buttonPin3),
            Element.ofSelector(SignPinLocator.buttonPin4),
            Element.ofSelector(SignPinLocator.buttonPin5),
            Element.ofSelector(SignPinLocator.buttonPin6),
            Element.ofSelector(SignPinLocator.buttonPin7),
            Element.ofSelector(SignPinLocator.buttonPin8),
            Element.ofSelector(SignPinLocator.buttonPin9),
            Element.ofSelector(SignPinLocator.buttonPin0),
            Element.ofSelector(SignPinLocator.buttonClr),
            Element.ofSelector(SignPinLocator.buttonSignIn),
            Element.ofSelector(SignPinLocator.quickServiceListBtn),
            Element.ofSelector(SignPinLocator.tableListSingIn1),
            Element.ofSelector(SignPinLocator.tableListSingIn2),
            Element.ofSelector(SignPinLocator.esbOrderReport),
            Element.ofSelector(SignPinLocator.errorReport),
            Element.ofSelector(SignPinLocator.refreshErrorReport),
            Element.ofSelector(SignPinLocator.syncUserSignPinLog),
            Element.ofSelector(SignPinLocator.closeLogSignPin),
        ];
    }

}

