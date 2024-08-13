import BasePage from "../../../../base/base-page";
import Urls from "../../../../configs/urls";
import Element from "../../../../base/objects/Element";
import WithdrawalFundsInformationScenario from "./withdrawalFundsInformation.scenario";
import WithdrawalFundsInformationLocator from "./withdrawalFundsInformation.locator";


export default class WithdrawalFundsInformationPage extends BasePage implements WithdrawalFundsInformationScenario {


    pageUrl = (): string => Urls.menu;

    // Real URL =
    shouldHave(): Element[] {
        return [
            Element.ofSelector(WithdrawalFundsInformationLocator.bankNameField),
            Element.ofSelector(WithdrawalFundsInformationLocator.bankAccountNumberField),
            Element.ofSelector(WithdrawalFundsInformationLocator.bankAccountNameField),
            Element.ofSelector(WithdrawalFundsInformationLocator.dailyDisbursementOption),
            Element.ofSelector(WithdrawalFundsInformationLocator.weeklyDisbursementOption),
            Element.ofSelector(WithdrawalFundsInformationLocator.monthlyDisbursementOption),
            Element.ofSelector(WithdrawalFundsInformationLocator.submitButton),
            Element.ofSelector(WithdrawalFundsInformationLocator.cancelButton),

        ];
    }


}