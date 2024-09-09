import BasePosLitePage from "../../../base-pos-lite-page";
import Element from "../../../../../base/objects/Element";
import MenuPackageScenario from "./menuPackage.scenario";
import MenuPackageLocator from "./menuPackage.locator";
import DateHelper from "../../../../../base/utils/DateHelper";


export default class MenuPackagePage extends BasePosLitePage implements MenuPackageScenario {
    private menuPackageNameData = "Test Menu Package 01"
    private menuPackageCode = DateHelper.getCurrentMillis().toString();
    private menuPackageDesc = "Test Menu Package Desc 01";
    private menuPackageGroupName = "test menu package group";
    private menuMinQty = "1";
    private menuMaxQty = "4";

    pageUrl = (): string => this.urls.get.catalogue.menuPackageUrl;


    shouldHave(): Element[] {
        return [

            Element.ofSelector(MenuPackageLocator.menuPackageCreateCancelButton),
            Element.ofSelector(MenuPackageLocator.menuPackageCreateSaveButton),
            Element.ofSelector(MenuPackageLocator.menuPackageNewHeadRadioButton),
            Element.ofSelector(MenuPackageLocator.menuPackageExistingHeadRadioButton),
            Element.ofSelector(MenuPackageLocator.menuPackageCategoryField),
            Element.ofSelector(MenuPackageLocator.menuPackageNameField),
            Element.ofSelector(MenuPackageLocator.menuPackageCodeField),
            Element.ofSelector(MenuPackageLocator.menuPackageDescField),
            Element.ofSelector(MenuPackageLocator.menuPackageServiceChargeRadioButton),
            Element.ofSelector(MenuPackageLocator.menuPackageTaxRadioButton),
            Element.ofSelector(MenuPackageLocator.menuPackageFOCRadioButton),
            Element.ofSelector(MenuPackageLocator.menuPackageReplacementField)


        ];
    }

    async fillMenuPackageInformationForm(): Promise<void> {
        await this.clear(MenuPackageLocator.menuPackageNameField);
        await this.fill(MenuPackageLocator.menuPackageNameField, this.menuPackageNameData);
        await this.click(MenuPackageLocator.menuPackageCategoryField);
        await this.click(MenuPackageLocator.menuPackageCategoryOptionOne);
        await this.click(MenuPackageLocator.menuPackageSubCategoryOptionOne);
        await this.click(MenuPackageLocator.menuPackageCategorySaveButton);
        await this.clear(MenuPackageLocator.menuPackageCodeField);
        await this.fill(MenuPackageLocator.menuPackageCodeField, this.menuPackageCode);
    }

    async dismissTooltip(): Promise<void> {
        await this.click(MenuPackageLocator.menuPackageTooltipButton);
        await this.click(MenuPackageLocator.menuPackageTooltipButton);
        await this.click(MenuPackageLocator.menuPackageTooltipButton);
    }

    async fillMenuPackageGroupForm(): Promise<void> {
        await this.click(MenuPackageLocator.menuPackageGroupNameField);
        await this.fill(MenuPackageLocator.menuPackageGroupNameField, this.menuPackageGroupName);
        await this.fill(MenuPackageLocator.menuPackageGroupMinQty, this.menuMinQty);
        await this.fill(MenuPackageLocator.menuPackageGroupMaxQty, this.menuMaxQty);
        await this.click(MenuPackageLocator.menuPackageGroupSelectAllBtn);
        await this.click(MenuPackageLocator.menuPackageGroupSaveButton);
        await this.click(MenuPackageLocator.menuPackagePopUpZeroPriceLaterButton);
    }

    async saveMenuPackage(): Promise<void> {
        await this.click(MenuPackageLocator.menuPackageCreateSaveButton);
    }

}