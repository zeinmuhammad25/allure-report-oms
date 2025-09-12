import BaseScenario from "../../../base/base-scenario";

export default interface BranchMenuScenario extends BaseScenario {

    filterCategoryBranchMenu(filterName: string): Promise<void>;

    searchMenuInCategory(value: string): Promise<void>;

    clearSearchMenuInCategory(): Promise<void>;

    selectMenuCategory(categoryName: string): Promise<void>;
}