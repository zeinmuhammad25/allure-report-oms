import BasePage from "../../../base/base-page";
import Urls from "../../../configs/urls";
import Element from "../../../base/objects/Element";
import BranchScenario from "./branch.scenario";
import BranchLocator from "./branch.locator";


export default class BranchPage extends BasePage implements BranchScenario {


    pageUrl = (): string => Urls.accbranch;

    shouldHave(): Element[] {
        return [
            Element.ofText("Daftar Cabang"),
            Element.ofSelector(BranchLocator.addbranchbtn),
            Element.ofSelector(BranchLocator.accsearchbranch),
            Element.ofSelector(BranchLocator.accsearchexpired),
            Element.ofSelector(BranchLocator.accbranchamount),

        ];
    }


}