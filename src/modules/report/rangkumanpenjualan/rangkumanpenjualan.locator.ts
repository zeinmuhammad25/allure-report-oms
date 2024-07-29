import BaseLocator from "../../../base/base-locator";

export default class RangkumanpenjualanLocator extends BaseLocator {
    static salesdatefield: string = "(//input[@type='text'])[1]";
    static salescompfield: string = "(//input[@class='ant-select-selection-search-input ng-untouched ng-pristine ng-valid'])[1]";
    static salesbrandfield: string = "(//input[@class='ant-select-selection-search-input ng-untouched ng-pristine ng-valid'])[2]";
    static salesbranchfield: string = "(//input[@class='ant-select-selection-search-input ng-untouched ng-pristine ng-valid'])[3]";
    static salesviewbutton: string = "(//button[normalize-space()='Tampilkan'])[1]";
    static salesdownloadbutton: string = "(//button[normalize-space()='Unduh'])[1]";

    //Date picker locator

    static todayfilter: string = "(//button[normalize-space()='Hari ini'])[1]";
    static yesterdayfilter: string = "(//button[normalize-space()='Kemarin'])[1]";
    static lastweekfilter: string = "(//button[normalize-space()='7 Hari terakhir'])[1]";
    static thisweekfilter: string = "(//button[normalize-space()='Minggu ini'])[1]";
    static thirtydayfilter: string = "(//button[normalize-space()='30 Hari terakhir'])[1]";
    static thismonthfilter: string = "(//button[normalize-space()='Bulan ini'])[1]";
    static lastmonthfilter: string = "(//button[normalize-space()='Bulan ini'])[1]";
    static choosedatebtn: string = "(//button[normalize-space()='Pilih'])[1]";
    static canceldatebtn: string = "(//button[normalize-space()='Batal'])[1]";



}