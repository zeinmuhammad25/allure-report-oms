import BaseScenario from "../../../base/base-scenario";

export default interface BranchMenuScenario extends BaseScenario {

    filterCategoryBranchMenu(filterName: string): Promise<void>;

    searchMenuInCategory(value: string): Promise<void>;

    clearSearchMenuInCategory(): Promise<void>;

    selectMenuCategory(categoryName: string): Promise<void>;

    paginationMenuCategory(arrow: "left" | "right"): Promise<void>;

    butonCheckerStation(checker: string, index: number, closeButton?: boolean): Promise<void>;

    butonStation(station: string, index: number, closeButton?: boolean): Promise<void>;

    butonShowQty(qty: string, index: number, closeButton?: boolean): Promise<void>;

    showDropdown(index: number): Promise<void>;

    selectStationInDropDown(stationName: string): Promise<void>;

    closeAfterSelectOrInput(): Promise<void>;

    saveBranchMenu(): Promise<void>;

    inputQty(qtyValue: string, mode?: "replace" | "append"): Promise<void>;

    clickFlagSoldOut(index: number, times?: number): Promise<void>;

    branchMenuPagination(type: "first" | "previous" | "next" | "last"): Promise<void>;

    validationMenu(value: string, field: "name" | "short" | "sub", opts?: { maxProbe?: number }): Promise<number>;
}