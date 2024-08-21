import BaseLocator from "../../../../base/base-locator";

export default class BranchLocator extends BaseLocator {

    //branchSidebar


    static addBranchButton: string = "(//a[normalize-space()='Cabang'])[1]";
    static accountSearchBranch: string = "(//input[@placeholder='Cari Berdasarkan Nama Cabang'])[1]";
    static accountSearchExpired: string = "(//input[@class='ant-select-selection-search-input ng-untouched ng-pristine ng-valid'])[1]";
    static accountBranchAmount: string = "(//div[@class='page-total-container'])[1]";

    //branchDashboard
    static branchSearchBar: string = "//input[@placeholder='Cari Berdasarkan Nama Cabang']";
    static branchEditButton: string = "//tr[contains(@class, 'ant-table-row')]//button[contains(@class, 'button-blue')]";


}