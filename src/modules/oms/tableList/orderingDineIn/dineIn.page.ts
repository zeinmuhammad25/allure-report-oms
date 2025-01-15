import BaseOmsPage from "../../base-oms-page";
import Element from "../../../../base/objects/Element";
import DineInLocator from "./dineIn.locator";
import DineInScenario from "./dineIn.scenario";



export default class DineInPage extends BaseOmsPage implements DineInScenario {

    pageUrl = (): string => this.urls.get.tableList.orderDineIn;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(DineInLocator.sectionTableAcRoom),
            Element.ofSelector(DineInLocator.sectionTableSmokingRoom),
            Element.ofSelector(DineInLocator.tableAcRoom1),
            Element.ofSelector(DineInLocator.bookTablePopUp),
            Element.ofSelector(DineInLocator.buttonNumberOfPack(1)),
            Element.ofSelector(DineInLocator.buttonVisitPurpose),
            Element.ofSelector(DineInLocator.buttonBookTable),
            Element.ofSelector(DineInLocator.buttonBookOrder),
            Element.ofSelector(DineInLocator.customerDataPopUpLater),
            Element.ofSelector(DineInLocator.navbarTableList),

        ];
    }

    async bookTable():Promise<void> {
        await this.click(DineInLocator.tableAcRoom1);
        await this.expectVisible(DineInLocator.bookTablePopUp);
        await this.click(DineInLocator.buttonNumberOfPack(4));
        await this.click(DineInLocator.buttonVisitPurpose);
        await this.click(DineInLocator.buttonBookTable);
        await this.click(DineInLocator.customerDataPopUpLater);


    }

    async bookAndOrder():Promise<void>{
        await this.click(DineInLocator.tableAcRoom1);
        await this.click(DineInLocator.buttonNumberOfPack(2));
        await this.click(DineInLocator.buttonVisitPurpose);
        await this.click(DineInLocator.buttonBookOrder);
        await this.click(DineInLocator.customerDataPopUpLater);
        await this.expectVisible(DineInLocator.selectMenuList)

    }

}

