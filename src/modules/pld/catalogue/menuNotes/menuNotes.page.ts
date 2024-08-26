import BasePosLitePage from "../../base-pos-lite-page";
import Element from "../../../../base/objects/Element";
import MenuNotesLocator from "./menuNotes.locator";
import MenuNotesScenario from "./menuNotes.scenario";


export default class MenuNotesPage extends BasePosLitePage implements MenuNotesScenario {


    pageUrl = (): string => this.urls.get.catalogue.menuNotesUrl;


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