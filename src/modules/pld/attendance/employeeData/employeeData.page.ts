import BasePosLitePage from "../../base-pos-lite-page";
import Element from "../../../../base/objects/Element";
import EmployeeDataScenario from "./employeeData.scenario";
import EmployeeDataLocator from "./employeeData.locator";


export default class EmployeeDataPage extends BasePosLitePage implements EmployeeDataScenario {


    pageUrl = (): string => this.urls.get.attendance.employeeDataUrl;

    shouldHave(): Element[] {
        return [
            Element.ofText("Data Karyawan"),
            Element.ofSelector(EmployeeDataLocator.addEmployeeButton),
            Element.ofSelector(EmployeeDataLocator.employeeDataDropdown),
        ];
    }


}