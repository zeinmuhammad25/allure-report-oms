import BaseLocator from "../../../../../base/base-locator";

export default class SupplierViewLocator extends BaseLocator {
    public static inputFilterSupplierNumber: string = "div.w0-container > table > thead > tr > th >> nth=0";
    public static inputFilterSupplierName: string = "//tr[@id='w0-filters']/td/input[@name='MsSupplierForm[supplierName]']";
    public static inputFilterSupplierCode: string = "//tr[@id='w0-filters']/td/input[@name='MsSupplierForm[supplierCode]']";
    public static inputFilterSupplierDueDate: string = "//tr[@id='w0-filters']/td/input[@name='MsSupplierForm[dueDate]']";
    public static inputFilterSupplierAddress: string = "//tr[@id='w0-filters']/td/input[@name='MsSupplierForm[address]']";
    public static inputFilterSupplierPICName: string = "//tr[@id='w0-filters']/td/input[@name='MsSupplierForm[picName]']";
    public static inputFilterSupplierPICPhone: string = "//tr[@id='w0-filters']/td/input[@name='MsSupplierForm[picPhone]']";
    public static inputFilterSupplierCategory: string = "//tr[@id='w0-filters']/td/input[@name='MsSupplierForm[supplierCategoryName]']";

    public static inputFilterSupplierActive: string = "span#select2-mssupplierform-flagactive-container";
    public static inputFilterSupplierActiveContainer: string = "//ul[@id='select2-mssupplierform-flagactive-results']";
    public static inputFilterSupplierActions: string = "div.w0-container > table > thead > tr > th >> nth=-1";
}