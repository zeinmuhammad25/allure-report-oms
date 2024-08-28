export default class CurrencyViewLocator {

    public static actionClear: string = "//a[@id='btn-toolbar-clear-filter']";
    public static actionRefresh: string = "//a[@id='btn-toolbar-refresh']";

    public static inputFilterCurrencyNumber: string = "div.w0-container > table > thead > tr > th >> nth=0";
    public static inputFilterCurrencyName: string = "//input[@name='MsCurrencyForm[currencyName]' and @type='text']";
    public static inputFilterCurrencyRate: string = "#mscurrencyform-rate";//"//input[@name='MsCurrencyForm[rate]']";
    public static inputFilterCurrencySign: string = "//input[@name='MsCurrencyForm[currencySign]' and @type='text']";
    public static inputFilterCurrencyActions: string = "div.w0-container > table > thead > tr > th >> nth=-1";

    public static selectFilterCurrencyActive: string = "#select2-mscurrencyform-flagactive-container";
    public static selectFilterCurrencyActiveResultsContainer = "//ul[@id='select2-mscurrencyform-flagactive-results']";
    public static selectFilterCurrencyActiveResultPrefix = "select2-mscurrencyform-flagactive-results";

    public static getLocatorFilterCurrencyOptions(index: number): string {
        return `//li[@id$='-${index}']`;
    }

// ^wp.*php$
}