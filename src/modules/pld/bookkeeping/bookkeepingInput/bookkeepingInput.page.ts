import BasePosLitePage from "../../base-pos-lite-page";
import Urls from "../../../../configs/urls";
import Element from "../../../../base/objects/Element";
import BookkeepingInputLocator from "./bookkeepingInput.locator"
import BookkeepingInputScenario from "./bookkeepingInput.scenario"

export default class BookkeepingInputPage extends BasePosLitePage implements BookkeepingInputScenario {


    pageUrl = (): string => Urls.menu;

    // Real URL = https://dev7.esb.co.id/esb-core-lite/finance/input-finance/index
    shouldHave(): Element[] {
        return [
            Element.ofSelector(BookkeepingInputLocator.guideButton),
            Element.ofSelector(BookkeepingInputLocator.addBookkeepingInputButton),
            Element.ofSelector(BookkeepingInputLocator.archiveBookkeepingInputButton),
            Element.ofSelector(BookkeepingInputLocator.bookkeepingDateSearch),
            Element.ofSelector(BookkeepingInputLocator.bookkeepingOptionSearch),
            Element.ofSelector(BookkeepingInputLocator.bookkeepingValueSearch),
            Element.ofSelector(BookkeepingInputLocator.bookkeepingNoColumn),
            Element.ofSelector(BookkeepingInputLocator.bookkeepingBranchColumn),
            Element.ofSelector(BookkeepingInputLocator.bookkeepingDateColumn),
            Element.ofSelector(BookkeepingInputLocator.bookkeepingNoteColumn),
            Element.ofSelector(BookkeepingInputLocator.bookkeepingDetailColumn),

        ];
    }


}