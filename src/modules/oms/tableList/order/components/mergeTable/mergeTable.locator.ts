import BaseLocator from "../../../../../../base/base-locator";

export default class MergeTableLocator extends BaseLocator {
    static tableButton = (tableName: string): string =>
        `//app-grid-table-merge//button//span[normalize-space()='${tableName}']`;
    static cancelButton = "//app-table-merge//button[normalize-space()='Cancel']";
    static applyButton = "//app-table-merge//button[normalize-space()='Apply']";
}