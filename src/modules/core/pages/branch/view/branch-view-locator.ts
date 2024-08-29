export default class BranchViewLocator {
    public static inputFilterBranchNumber: string = "div.w1-container > table > thead > tr > th >> nth=0";
    public static inputFilterBranchName: string = "//tr[@id='w1-filters']/td/input[@name='MsBranch[branchName]']";
    public static inputFilterBranchCodeName: string = "//tr[@id='w1-filters']/td/input[@name='MsBranch[branchCode]']";

    public static selectFilterBranchType: string = "#select2-msbranch-branchtypeid-container";
    public static selectFilterBranchTypeResultsContainer = "//ul[@id='select2-msbranch-branchtypeid-results']";

    public static selectFilterBranchBrand: string = "#select2-msbranch-brandid-container";
    public static selectFilterBranchBrandResultsContainer = "//ul[@id='select2-msbranch-brandid-results']";

    public static inputFilterBranchAddressName: string = "//tr[@id='w1-filters']/td/input[@name='MsBranch[address]']";
    public static inputFilterBranchPhoneName: string = "//tr[@id='w1-filters']/td/input[@name='MsBranch[phone]']";
    public static inputFilterBranchOMSVersionName: string = "//tr[@id='w1-filters']/td/input[@name='MsBranch[omsVersion]']";

    public static selectFilterBranchActive: string = "#select2-msbranch-flagactive-container";
    public static selectFilterBranchActiveResultsContainer = "//ul[@id='select2-msbranch-flagactive-results']";

    public static inputFilterBranchActions: string = "div.w1-container > table > thead > tr > th >> nth=-1";


}