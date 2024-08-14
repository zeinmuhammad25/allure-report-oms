import BasePage from "../../../../base/base-page";
import Urls from "../../../../configs/urls";
import Element from "../../../../base/objects/Element";
import PlatformIntegrationScenario from "./platformIntegration.scenario";
import PlatformIntegrationLocator from "./platformIntegration.locator";


export default class PlatformIntegrationPage extends BasePosLitePage implements PlatformIntegrationScenario {


    pageUrl = (): string => Urls.menu;


    shouldHave(): Element[] {
        return [
            Element.ofText("Integrasi Platform"),
            Element.ofText("4 Keuntungan Integrasi Platform Anda:"),
            Element.ofSelector(PlatformIntegrationLocator.ruleOneImage),
            Element.ofText("Pengaturan 1 Platform"),
            Element.ofText("Atur menu dan harga secara bersamaan di POSLite Dashboard"),
            Element.ofSelector(PlatformIntegrationLocator.ruleTwoImage),
            Element.ofText("Input Data Mudah"),
            Element.ofText("Input transaksi otomatis dari GrabFood ke POSLite"),
            Element.ofSelector(PlatformIntegrationLocator.ruleThreeImage),
            Element.ofText("Rangkuman Laporan"),
            Element.ofText("Laporan harian & bulanan terangkum di POSLite dashboard"),
            Element.ofSelector(PlatformIntegrationLocator.ruleFourImage),
            Element.ofText("Integrasi Transaksi"),
            Element.ofText("Lihat pendapatan harian tanpa khawatir berbeda"),

        ];
    }


}