import Element from "../../../../base/objects/Element";
import BaseCorePage from "../../base-core-page";

export default class BranchCreatePage extends BaseCorePage {
    pageUrl = (): string => this.urls.get.master.branch.create;
    shouldHave = (): Element[] => [];

}