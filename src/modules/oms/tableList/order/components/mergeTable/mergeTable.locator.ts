import BaseLocator from "../../../../../../base/base-locator";

export default class MergeTableLocator extends BaseLocator {
    static tableButton = (tableName: string): string =>
        `//app-grid-table-merge//button//span[normalize-space()='${tableName}']`;
    static buttonCancel = "//app-table-merge//button[normalize-space()='Cancel']";
    static buttonApply = "//app-table-merge//button[normalize-space()='Apply']";
}