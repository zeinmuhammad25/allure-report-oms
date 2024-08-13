import BaseLocator from "../../../../base/base-locator";

export default class PlatformIntegrationLocator extends BaseLocator {
    static integrateNow: string = "//button[@id='btn-integrasi-sekarang-grabfood']";
    static integrationSetting: string = "//button[@id='btn-pengaturan-integrasi-gofood']";
    static ruleOneImage: string = "//div[@class='ant-row']//div[1]//div[1]//img[1]";
    static ruleTwoImage: string = "//body//app-layout//div[@class='ant-col ant-col-xs-24 ant-col-md-24']//div[@class='ant-col ant-col-xs-24 ant-col-md-24']//div[2]//div[1]//img[1]";
    static ruleThreeImage: string = "//body//app-layout//div[@class='ant-col ant-col-xs-24 ant-col-md-24']//div[@class='ant-col ant-col-xs-24 ant-col-md-24']//div[2]//div[1]//img[1]";
    static ruleFourImage: string = "//body//app-layout//div[@class='ant-col ant-col-xs-24 ant-col-md-24']//div[@class='ant-col ant-col-xs-24 ant-col-md-24']//div[2]//div[1]//img[1]";


}