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
            Element.ofSelector(BranchTabTransactionLocator.branchRadioBtnAfterDisc),
            Element.ofSelector(BranchTabTransactionLocator.branchRadioBtnBeforeDisc),
            Element.ofSelector(BranchTabTransactionLocator.branchTransactionButtonCancel),
            Element.ofSelector(BranchTabTransactionLocator.branchMenuBookDropdown),
            Element.ofSelector(BranchTabTransactionLocator.branchTaxValueField),
            Element.ofSelector(BranchTabTransactionLocator.branchServiceChargeField),
            Element.ofSelector(BranchTabTransactionLocator.branchTransactionButtonAddPayment),
            Element.ofSelector(BranchTabTransactionLocator.branchTransactionButtonActivate),
            Element.ofSelector(BranchTabTransactionLocator.paymentCashCheckBox),
            Element.ofSelector(BranchTabTransactionLocator.branchTransactionButtonSave),
            Element.ofSelector(BranchTabTransactionLocator.branchRadioBtnRoundingNo),
            Element.ofSelector(BranchTabTransactionLocator.branchRadioBtnRoundingYes),
        ];
    }

    async navigateToBranchTab(): Promise<void> {
        await this.click(BranchTabTransactionLocator.branchTransactionTab);
    }


    async makeSureOnlyCashChecked(): Promise<void> {

        const checkboxLocators = [
            BranchTabTransactionLocator.branchTabTransactionCheckBoxCash,
            BranchTabTransactionLocator.branchTabTransactionCheckBoxDana,
            BranchTabTransactionLocator.branchTabTransactionCheckBoxOVO,
            BranchTabTransactionLocator.branchTabTransactionCheckBoxGoPay,
            BranchTabTransactionLocator.branchTabTransactionCheckBoxQRIS,
        ];

        const isCashChecked = await this.isChecked(BranchTabTransactionLocator.branchTabTransactionCheckBoxCash);


        if (!isCashChecked) {
            console.log("Cash checkbox is not checked. Checking it now...");
            await this.click(BranchTabTransactionLocator.branchTabTransactionCheckBoxCash);
        }

        for (const locator of checkboxLocators) {
            if (locator !== BranchTabTransactionLocator.branchTabTransactionCheckBoxCash) {
                const isChecked = await this.isChecked(locator);
                if (isChecked) {
                    console.log(`Unchecking: ${locator}`);
                    await this.click(locator);
                }
            }
        }

        await this.click(BranchTabTransactionLocator.branchTransactionButtonSave);
    }


}