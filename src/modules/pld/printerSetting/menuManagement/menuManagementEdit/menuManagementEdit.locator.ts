import BaseLocator from "../../../../../base/base-locator";

export default class MenuManagementEditLocator extends BaseLocator {

    static menuManagementRadioBtn: string = "//tbody/tr[1]/td[4]/nz-switch[1]/button[1]/span[1]";
    static menuManagementSaveBtn: string = "//button[@id='c-branchmenu3']";
    static menuManagementCancelBtn: string = "//button[@class='btn btn-warning mr-2 ng-star-inserted']";
    static menuManagementRadioBtnActive: string = "//button[@class='ant-switch ant-switch-checked ant-switch-small']//span[@class='ant-switch-handle']";

}