import BasePosLitePage from "../../../../base-pos-lite-page";
import Urls from "../../../../../../configs/urls";
import Element from "../../../../../../base/objects/Element";
import BranchTabTransactionScenario from "./branchTabTransaction.scenario";
import BranchTabTransactionLocator from "./branchTabTransaction.locator";


export default class BranchTabTransactionPage extends BasePosLitePage implements BranchTabTransactionScenario {
    private branchMainTabName = "Test Cabang Edit";
    private branchMainTabOrigin = "Ini Cabang 6 Bulan";

    pageUrl = (): string => Urls.dashboard;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(BranchTabTransactionLocator.branchTransactionTab),
            Element.ofSelector(BranchTabTransactionLocator.paymentCashCheckBox),
            Element.ofSelector(BranchTabTransactionLocator.branchTransactionSaveButton),
        ];
    }

    async navigateToBranchTabTransaction(): Promise<void> {
        await this.click(BranchTabTransactionLocator.branchTransactionTab);
        await this.checkRadioButtonByLabel(BranchTabTransactionLocator.branchTabTransactionCashCheckBox);
        await this.click(BranchTabTransactionLocator.branchTransactionSaveButton);

    }

}