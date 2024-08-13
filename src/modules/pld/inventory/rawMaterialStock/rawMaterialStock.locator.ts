import BaseLocator from "../../../../base/base-locator";

export default class RawMaterialStockLocator extends BaseLocator {

    static rawMaterialStockFilter: string = "//button[@class='button-mobile button-outline-blue w-100']";
    static rawMaterialStockDropdown: string = "//nz-select-item[@title='Ini Cabang 6 Bulan']";
    static rawMaterialStockSearch: string = "//nz-input-group[@class='ant-input-affix-wrapper ant-input-affix-wrapper-lg']";
    static rawMaterialStockDownloadButton: string = "//button[normalize-space()='Unduh']";

    static rawMaterialStockActive: string = "(//label[@class='radio-item ant-radio-button-wrapper ng-star-inserted'])[5]";
    static rawMaterialStockInactive: string = "(//label[@class='radio-item ant-radio-button-wrapper ng-star-inserted'])[6]";
    static rawMaterialStockSafe: string = "(//label[@class='radio-item ant-radio-button-wrapper ng-star-inserted'])[6]";
    static rawMaterialStockUnsafe: string = "(//label[@class='radio-item ant-radio-button-wrapper ng-star-inserted'])[8]";
    static rawMaterialStockResetButton: string = "(//button[@type='button'][normalize-space()='Reset'])[1]";
    static rawMaterialStockApplyButton: string = "//button[@type='button'][normalize-space()='Terapkan']";
    static rawMaterialStockCloseButton: string = "(//img[@alt='ic-times-black'])[1]";

}