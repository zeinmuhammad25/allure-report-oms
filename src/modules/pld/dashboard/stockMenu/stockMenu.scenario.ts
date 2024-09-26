import BaseScenario from "../../../../base/base-scenario";

export default interface StockMenuScenario extends BaseScenario {
    //TODO : Filter dan View Data Stok Menu Pada Menu Stok Menu
    validateDataOnDashboardStockMenu(): Promise<void>
}
