import BaseLocator from "../../../../base/base-locator";

export default class AttendanceListLocator extends BaseLocator {

    //attendanceList Index
    static attendanceDateField: string = "//div[@class='ant-col ant-col-xs-24 ant-col-md-8']//input[@type='text']";
    static attendanceClockIN: string = "//div[@class='ant-col ant-col-xs-24 ant-col-md-8']//nz-select[@nzplaceholder='Pilih Cabang Masuk']//nz-select-search//input[@class='ant-select-selection-search-input ng-untouched ng-pristine ng-valid']";
    static attendanceClockOut: string = "//div[@class='ant-col ant-col-xs-24 ant-col-md-8']//nz-select[@nzplaceholder='Pilih Cabang Pulang']//nz-select-top-control";
    static attendanceEmployeeIdField: string = "//div[@class='ant-col ant-col-xs-24 ant-col-md-16']//input";
    static attendanceViewButton: string = "//button[normalize-space()='Tampilkan']";
    static attendanceExportButton: string = "(//button[normalize-space()='Tampilkan'])[1]";

}