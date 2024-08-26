import BasePosLitePage from "../../base-pos-lite-page";
import Element from "../../../../base/objects/Element";
import CancelAndVoidLocator from "./cancelAndVoid.locator";


export default class CancelAndVoidPage extends BasePosLitePage implements CancelAndVoidLocator {


    pageUrl = (): string => this.urls.get.report.cancelAndVoidUrl;

    shouldHave(): Element[] {
        return [
            Element.ofText("Batal dan Void"),
            Element.ofSelector(CancelAndVoidLocator.orderDateField),
            Element.ofSelector(CancelAndVoidLocator.selectCompanyActiveField),
            Element.ofSelector(CancelAndVoidLocator.selectBrandActiveField),
            Element.ofSelector(CancelAndVoidLocator.selectBranchActiveField),
            Element.ofSelector(CancelAndVoidLocator.transactionNumberField),
            Element.ofSelector(CancelAndVoidLocator.cashierNameField),
            Element.ofSelector(CancelAndVoidLocator.salesTypeField),
            Element.ofSelector(CancelAndVoidLocator.paymentMethod),
            Element.ofSelector(CancelAndVoidLocator.viewButton),
            Element.ofSelector(CancelAndVoidLocator.downloadButton),
        ];
    }


}