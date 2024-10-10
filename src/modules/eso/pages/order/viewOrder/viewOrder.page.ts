import Element from "../../../../../base/objects/Element";
import BaseEsoPage from "../../../base/base-eso-page";
import ViewOrderScenario from "./viewOrder.scenario";
import ViewOrderLocator from "./viewOrder.locator";

export default class ViewOrderPage extends BaseEsoPage implements ViewOrderScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(ViewOrderLocator.confirmButton),
            Element.ofSelector(ViewOrderLocator.backButton)
        ];
    }

    async goBack(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async continueToPayment(): Promise<void> {
        await this.expectVisible(ViewOrderLocator.confirmButton);
        await this.click(ViewOrderLocator.confirmButton);
    }

    async addNotes(notes: string): Promise<void> {
        await this.expectVisible(ViewOrderLocator.editButton);
        await this.click(ViewOrderLocator.editButton);
        await this.expectVisible(ViewOrderLocator.notesField);
        await this.fill(ViewOrderLocator.notesField, notes);
        await this.expectVisible(ViewOrderLocator.updateButton);
        await this.click(ViewOrderLocator.updateButton);
    }

}