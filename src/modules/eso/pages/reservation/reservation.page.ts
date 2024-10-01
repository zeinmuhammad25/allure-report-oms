import Element from "../../../../base/objects/Element";
import BaseEsoPage from "../../base/base-eso-page";
import ReservationScenario from "./reservation.scenario";

export default class ReservationPage extends BaseEsoPage implements ReservationScenario {

    pageUrl: () => string;

    shouldHave(): Element[] {
        throw new Error("Method not implemented.");
    }

    setDay(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    setTime(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    goBack(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}