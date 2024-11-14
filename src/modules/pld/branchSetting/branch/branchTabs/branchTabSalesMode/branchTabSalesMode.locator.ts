import BaseLocator from "../../../../../../base/base-locator";

export default class BranchTabSalesModeLocator extends BaseLocator {

    static branchTabSalesMode: string = "//div[@class='ng-star-inserted'][normalize-space()='Mode Penjualan']";
    static branchTabSalesModeAddButton: string = "//button[@class='btn btn-primary']";
    static branchTabSalesModeSaveButton: string = "//button[@class='button button-orange button-small ng-star-inserted']";
    static branchTabSalesModeDeleteButton: string = "//body[1]/app-layout[1]/nz-layout[1]/nz-layout[1]/nz-content[1]/div[2]/app-branch[1]/app-branch-update[1]/app-branch-form[1]/form[1]/div[1]/div[2]/div[1]/div[1]/nz-tabset[1]/div[1]/div[1]/div[3]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/div[1]/div[2]";
    static branchTabSalesModeDeletePopUpImg: string = "//img[@class='img-fluid ng-star-inserted']";
    static branchTabSalesModeDeleteConfirmButton: string = "//button[@id='btn-modal-confirm']";
    static branchSalesModeCardOnline: string = "//div[@class='sales-mode-name'][normalize-space()='Online']";


    //addSalesMode
    static branchSalesModeDropdown: string = "//nz-select-top-control[@ng-reflect-open='false']";
    static branchSalesModeDropdownOnline: string = "//div[normalize-space()='Online']";
    static branchSalesModeDropdownDineIn: string = "//div[@class='ant-select-item-option-content'][normalize-space()='Dine In']";
    static branchSalesModeDropdownTakeAway: string = "//div[normalize-space()='Take Away']";
    static branchSalesModeFormAddButton: string = "//button[@class='button button-small button-orange button-block']";
    static branchSalesModeFormCancelButton: string = "//button[@class='button button-small button-outline-red button-block']";

}