import BaseLocator from "../../../base/base-locator";

export default class IntegrationSettingLocator extends BaseLocator {

    static activeTab: string = "//h2[@ng-reflect-ng-style='[object Object]']";
    static inactiveTab: string = "//h2[normalize-space()='Belum Aktif (0)']";
    static applicationProcessTab: string = "//div[@class='tabs ng-star-inserted']//div[3]//div[1]";
    static applicationProcessFailedTab: string = "//h2[normalize-space()='Pengajuan Gagal (2)']";
    static listBranchOnlineSetting: string = "//input[@placeholder='Cari di sini']";
    static addBranchIntegration: string = "//i[@class='anticon anticon-plus']//*[name()='svg']";

}