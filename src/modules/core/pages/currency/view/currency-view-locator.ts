export default class CurrencyViewLocator {
    public static inputFilterCurrencyName: string = "//input[@name='MsCurrencyForm[currencyName]']";
    public static inputFilterCurrencyRate: string = "#mscurrencyform-rate";//"//input[@name='MsCurrencyForm[rate]']";
    public static inputFilterCurrencySign: string = "//input[@name='MsCurrencyForm[currencySign]' and @type='text']";

    public static selectFilterCurrencyActive: string = "#select2-mscurrencyform-flagactive-container";
    public static selectFilterCurrencyActiveResultsContainer = "//ul[@id='select2-mscurrencyform-flagactive-results']";
    public static selectFilterCurrencyActiveResultPrefix = "select2-mscurrencyform-flagactive-results";

    public static getLocatorFilterCurrencyOptions(index: number): string {
        return `//li[@id$='-${index}']`;
    }

// ^wp.*php$
}