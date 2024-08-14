import BasePosLitePage from "../../base-pos-lite-page";
import Urls from "../../../../configs/urls";
import Element from "../../../../base/objects/Element";
import BranchScenario from "./branch.scenario";
import BranchLocator from "./branch.locator";
import BasePosLitePage from "../../base-pos-lite-page";


export default class BranchPage extends BasePosLitePage implements BranchScenario {


    pageUrl = (): string => Urls.accbranch;

    shouldHave(): Element[] {
        return [
            Element.ofText("Daftar Cabang"),
            Element.ofSelector(BranchLocator.addBranchButton),
            Element.ofSelector(BranchLocator.accountSearchBranch),
            Element.ofSelector(BranchLocator.accountSearchExpired),
            Element.ofSelector(BranchLocator.accountBranchAmount),

        ];
    }


}