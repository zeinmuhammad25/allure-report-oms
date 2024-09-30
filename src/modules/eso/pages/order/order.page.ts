import Element from "../../../../base/objects/Element";
import BaseEsoPage from "../../base/base-eso-page";
import OrderScenario from "./order.scenario";
import {EsoMode} from "../../objects/esoMode";
import OrderLocator from "./order.locator";

export default class OrderPage extends BaseEsoPage implements OrderScenario {
    private branchCode: string = 'WYR';
    private mode: EsoMode = EsoMode.DineIn;
    private categoryID: number = 6

    pageUrl = (): string => this.urls.get.orderPage(this.branchCode, this.mode, this.categoryID);

    shouldHave(): Element[] {
        return [
            Element.ofSelector(OrderLocator.backButton),
            Element.ofSelector(OrderLocator.searchButton),
            Element.ofSelector(OrderLocator.sideBarButton),
        ]
    }

    async addMenu(menuID: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async increaseQty(menuID: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async decreaseQty(menuID: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async goToSearch(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async goToViewOrder(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async goToBranchDetail(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async goToOrderHistory(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async goToPrivacyPolicy(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async goToLoginPage(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async goBack(): Promise<void> {
        throw new Error("Method not implemented.");
    }

}