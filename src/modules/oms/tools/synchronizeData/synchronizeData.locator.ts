import BaseLocator from "../../../../base/base-locator";
import {SynchronizeDataObject} from "./SynchronizeDataObject";

export default class SynchronizeDataLocator extends BaseLocator {

    static getLocatorSynchronize = (actionSync: SynchronizeDataObject): string => ` //div[normalize-space()='${actionSync}']`;
    static buttonUpdateSetting: string = "//span[normalize-space()='Update Setting']";
    static buttonSynchronize: string = "//span[normalize-space()='Synchronize']";
    static buttonSelectAll: string = "//label[@for='mat-checkbox-6-input']//span[@class='mat-checkbox-label']";
    static buttonCloseSyncPopup: string = "//span[normalize-space()='Close']";
    static buttonIUnderstandCancelAuto: string = "//span[normalize-space()='I Understand']";
    static buttonCancelAutoCancel: string = "//span[normalize-space()='Cancel']";
    static closePopUp: string = "//span[normalize-space()='Ok']";

}