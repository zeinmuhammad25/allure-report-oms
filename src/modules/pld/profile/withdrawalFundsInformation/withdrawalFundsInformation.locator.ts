import BaseLocator from "../../../base/base-locator";

export default class WithdrawalFundsInformationLocator extends BaseLocator {
    static bankNameField: string = "#bankCode";
    static bankAccountNumberField: string = "#accountNo";
    static bankAccountNameField: string = "#accountName";
    static dailyDisbursementOption: string = "//label[@id=1]";
    static weeklyDisbursementOption: string = "//label[@id=2]";
    static monthlyDisbursementOption: string = "//label[@id=3]";

    static submitButton: string = "//button[text()=' Ajukan Data ']";
    static cancelButton: string = "//button[@routerlink='/dashboard/index']";


}