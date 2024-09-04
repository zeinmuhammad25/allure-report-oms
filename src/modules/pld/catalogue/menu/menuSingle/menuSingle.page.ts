import BasePosLitePage from "../../../base-pos-lite-page";
import Element from "../../../../../base/objects/Element";
import MenuSingleScenario from "./menuSingle.scenario";
import MenuSingleLocator from "./menuSingle.locator";
import MenuLocator from "../menu.locator";
import DateHelper from "../../../../../base/utils/DateHelper";


export default class MenuSinglePage extends BasePosLitePage implements MenuSingleScenario {
    private menuName = "Test menuName 01"
    private menuCode = DateHelper.getCurrentMillis().toString();
    private menuDesc = "Test Desc 01"

    pageUrl = (): string => this.urls.get.catalogue.menuSingleUrl;

    shouldHave(): Element[] {
        return [

            Element.ofSelector(MenuSingleLocator.menuNameField),
            Element.ofSelector(MenuSingleLocator.menuCodeField),
            Element.ofSelector(MenuSingleLocator.menuCategoryField),
            Element.ofSelector(MenuSingleLocator.menuDescriptionField),
            Element.ofSelector(MenuSingleLocator.menuAddBookButton),
            Element.ofSelector(MenuSingleLocator.menuCategoryButton),
            Element.ofSelector(MenuSingleLocator.scRadioButton),
            Element.ofSelector(MenuSingleLocator.TaxRadioButton),
            Element.ofSelector(MenuSingleLocator.focRadioButton),
            Element.ofSelector(MenuSingleLocator.replacementField),
            Element.ofSelector(MenuSingleLocator.menuCreateSaveButton),
            Element.ofSelector(MenuSingleLocator.menuCreateCancelButton),

        ];
    }

    async fillMenuInformation(): Promise<void> {

       await this.clear(MenuSingleLocator.menuNameField);
       await this.fill(MenuSingleLocator.menuNameField, this.menuName);
       await this.clear(MenuSingleLocator.menuCodeField);
       await this.fill(MenuSingleLocator.menuCodeField, this.menuCode);
       await this.click(MenuSingleLocator.menuCategoryButton);
       await this.click(MenuSingleLocator.menuCategoryOptionOne);
       await this.click(MenuSingleLocator.menuSubCategoryOptionOne);
       await this.click(MenuSingleLocator.menuCategorySaveButton);
       await this.click(MenuSingleLocator.menuDescriptionField);
       await this.typeKeyboard(this.menuDesc);

       await this.click(MenuSingleLocator.menuCreateSaveButton);


    }






}