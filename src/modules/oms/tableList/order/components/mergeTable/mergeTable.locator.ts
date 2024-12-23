import BaseLocator from "../../../../../../base/base-locator";

export default class MergeTableLocator extends BaseLocator {
    static tableButton = (tableName: string, status: "active" | "disable" | "occupied" = "active"): string => {
        const buttonLocator = status == "disable" ? "button[@disabled]"
            : status == "occupied" ? "button[contains(@class,\"mat-danger\")]"
                : "button";
        return `(//app-grid-table-merge//button//span//div[normalize-space()='${tableName}'])[1]`;
    };
    static cancelButton = "//app-table-merge//button[normalize-space()='Cancel']";
    static applyButton = "//app-table-merge//button[normalize-space()='Apply']";
    static popUpOccupied = "//app-confirm-dialog";
    static yesOccupied = "//app-confirm-dialog//span[normalize-space()='Yes']";
    static noOccupied = "//app-confirm-dialog//span[normalize-space()='No']";
}