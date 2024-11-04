import BaseScenario from "../../../../base/base-scenario";
import {PaymentList} from "./PaymentList";

export default interface PaymentPosScenario extends BaseScenario {

    paymentType(paymentType: PaymentList): Promise<void>;

    paymentMethod(paymentMethod: PaymentList): Promise<void>;

}