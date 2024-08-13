import BasePage from "../../../../base/base-page";
import Urls from "../../../../configs/urls";
import Element from "../../../../base/objects/Element";
import EmployeeDataScenario from "./employeeData.scenario";
import EmployeeDataLocator from "./employeeData.locator";


export default class EmployeeDataPage extends BasePage implements EmployeeDataScenario {


    pageUrl = (): string => Urls.employee;

    shouldHave(): Element[] {
        return [
            Element.ofText("Data Karyawan"),
            Element.ofSelector(EmployeeDataLocator.addEmployeeButton),
            Element.ofSelector(EmployeeDataLocator.employeeDataDropdown),
        ];
    }


}