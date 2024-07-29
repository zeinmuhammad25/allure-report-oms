import BasePage from "../../../base/base-page";
import Urls from "../../../configs/urls";
import Element from "../../../base/objects/Element";
import DatakaryawanScenario from "./datakaryawan.scenario";
import DatakaryawanLocator from "./datakaryawan.locator";


export default class DatakaryawanPage extends BasePage implements DatakaryawanScenario {


    pageUrl = (): string => Urls.employee;

    shouldHave(): Element[] {
        return [
            Element.ofText("Data Karyawan"),
            Element.ofSelector(DatakaryawanLocator.addemployeebtn),
            Element.ofSelector(DatakaryawanLocator.emplodatadropdown),
        ];
    }


}