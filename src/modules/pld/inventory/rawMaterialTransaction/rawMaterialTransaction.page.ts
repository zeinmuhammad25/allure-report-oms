import BasePosLitePage from "../../base-pos-lite-page";
import Urls from "../../../../configs/urls";
import Element from "../../../../base/objects/Element";
import RawMaterialTransactionScenario from "./rawMaterialTransaction.scenario";
import RawMaterialTransactionLocator from "./rawMaterialTransaction.locator";


export default class RawMaterialTransactionPage extends BasePosLitePage implements RawMaterialTransactionScenario {


    pageUrl = (): string => Urls.rawmaterial;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(RawMaterialTransactionLocator.rawMaterialTransactionAdd),
            Element.ofSelector(RawMaterialTransactionLocator.rawMaterialTransactionDate),
            Element.ofSelector(RawMaterialTransactionLocator.rawMaterialTransactionBranch),
            Element.ofSelector(RawMaterialTransactionLocator.rawMaterialTransactionCount),
            Element.ofSelector(RawMaterialTransactionLocator.rawMaterialTransactionType),
        ];
    }


}