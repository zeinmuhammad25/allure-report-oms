import Element from "../../../../base/objects/Element";
import AttendanceListScenario from "./attendanceList.scenario";
import AttendanceListLocator from "./attendanceList.locator";
import BasePosLitePage from "../../base-pos-lite-page";


export default class AttendanceListPage extends BasePosLitePage implements AttendanceListScenario {


    pageUrl = (): string => this.urls.get.attendance.attendanceListUrl;

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