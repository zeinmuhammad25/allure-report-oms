import BaseScenario from "../../../base/base-scenario";

export default interface BranchMenuScenario extends BaseScenario {

    filterCategoryBranchMenu(filterName: string): Promise<void>;

    searchMenuInCategory(value: string): Promise<void>;

    clearSearchMenuInCategory(): Promise<void>;

    selectMenuCategory(categoryName: string): Promise<void>;

    paginationMenuCategory(categoryName: string): Promise<void>;

    butonCheckerStation(checker: string, index: number, closeButton?: boolean): Promise<void>;

    butonStation(station: string, index: number, closeButton?: boolean): Promise<void>;

    butonShowQty(station: string, index: number, closeButton?: boolean): Promise<void>;

    showDropdown(index: number): Promise<void>;

    selectStationInDropDown(stationName: string): Promise<void>;
}