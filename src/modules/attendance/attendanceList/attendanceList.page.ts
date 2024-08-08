import BasePage from "../../../base/base-page";
import Urls from "../../../configs/urls";
import Element from "../../../base/objects/Element";
import AttendanceListScenario from "./attendanceList.scenario";
import AttendanceListLocator from "./attendanceList.locator";


export default class AttendanceListPage extends BasePage implements AttendanceListScenario {


    pageUrl = (): string => Urls.accbranch;

    shouldHave(): Element[] {
        return [

            Element.ofSelector(AttendanceListLocator.attendanceDateField),
            Element.ofSelector(AttendanceListLocator.attendanceClockIN),
            Element.ofSelector(AttendanceListLocator.attendanceClockOut),
            Element.ofSelector(AttendanceListLocator.attendanceEmployeeIdField),
            Element.ofSelector(AttendanceListLocator.attendanceViewButton),


        ];
    }


}