import BasePage from "../../../base/base-page";
import Urls from "../../../configs/urls";
import Element from "../../../base/objects/Element";
import MenuNotesLocator from "./menuNotes.locator";
import MenuNotesScenario from "./menuNotes.scenario";


export default class MenuNotesPage extends BasePage implements MenuNotesScenario {


    pageUrl = (): string => Urls.menu;

    // Real URL = https://dev7.esb.co.id/esb-core-lite/catalog/notes-category/index
    shouldHave(): Element[] {
        return [
            Element.ofSelector(MenuNotesLocator.menuNotesTab),
            Element.ofSelector(MenuNotesLocator.notesNameColumn),
            Element.ofSelector(MenuNotesLocator.branchNameColumn),
            Element.ofSelector(MenuNotesLocator.statusNameColumn),
            Element.ofSelector(MenuNotesLocator.notesNameSearch),
            Element.ofSelector(MenuNotesLocator.notesNameSearch),
            Element.ofSelector(MenuNotesLocator.branchNameSearch),
            Element.ofSelector(MenuNotesLocator.statusSearch),
            Element.ofSelector(MenuNotesLocator.addMenuNotesButton),


        ];
    }


}