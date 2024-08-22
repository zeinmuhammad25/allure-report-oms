import BasePosLitePage from "../../../../base-pos-lite-page";
import Urls from "../../../../../../configs/urls";
import Element from "../../../../../../base/objects/Element";
import BranchTabTransactionScenario from "./branchTabTransaction.scenario";
import BranchTabTransactionLocator from "./branchTabTransaction.locator";


export default class BranchTabTransactionPage extends BasePosLitePage implements BranchTabTransactionScenario {


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
    }


    async makeSureOnlyCashChecked(): Promise<void> {

        const checkboxLocators = [
            BranchTabTransactionLocator.branchTabTransactionCashCheckBox,
            BranchTabTransactionLocator.branchTabTransactionDanaCheckBox,
            BranchTabTransactionLocator.branchTabTransactionOvoCheckBox,
            BranchTabTransactionLocator.branchTabTransactionGoPayCheckBox,
            BranchTabTransactionLocator.branchTabTransactionQRISCheckBox
        ];

        const isCashChecked = await this.isChecked(BranchTabTransactionLocator.branchTabTransactionCashCheckBox);


        if (!isCashChecked) {
            console.log("Cash checkbox is not checked. Checking it now...");
            await this.click(BranchTabTransactionLocator.branchTabTransactionCashCheckBox);
        }

        for (const locator of checkboxLocators) {
            if (locator !== BranchTabTransactionLocator.branchTabTransactionCashCheckBox) {
                const isChecked = await this.isChecked(locator);
                if (isChecked) {
                    console.log(`Unchecking: ${locator}`);
                    await this.click(locator);
                }
            }
        }

        await this.click(BranchTabTransactionLocator.branchTransactionSaveButton);
    }


}