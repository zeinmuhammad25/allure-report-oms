import Element from "../../../../../base/objects/Element";
import BaseCorePage from "../../../base/base-core-page";

export default class BranchViewPage extends BaseCorePage {
    pageUrl = (): string => this.urls.get.master.branch.view;
    shouldHave = (): Element[] => [];

    public toBranchCreatePage() {

    }

}