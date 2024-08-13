import BaseLocator from "../../../base/base-locator";

export default class AttendanceListLocator extends BaseLocator {

    static attendanceDateField: string = "(//input[@type='text'])[1]";
    static attendanceClockIN: string = "(//input[@class='ant-select-selection-search-input ng-untouched ng-pristine ng-valid'])[1]";
    static attendanceClockOut: string = "(//input[@class='ant-select-selection-search-input ng-pristine ng-valid ng-touched'])[2]";
    static attendanceEmployeeIdField: string = "//div[@class='ant-col ant-col-xs-24 ant-col-md-16']//input";
    static attendanceViewButton: string = "(//button[normalize-space()='Tampilkan'])[1]";
    static attendanceExportButton: string = "(//button[normalize-space()='Tampilkan'])[1]";

}