import BaseLocator from "../../../../base/base-locator";
import {SynchronizeDataObject} from "./SynchronizeDataObject";

export default class SynchronizeDataLocator extends BaseLocator {

    static getLocatorSynchronize = (actionSync: SynchronizeDataObject): string => ` //div[normalize-space()='${actionSync}']`;
    static buttonUpdateSetting: string = "//span[normalize-space()='Update Setting']";
    static buttonSynchronize: string = "//span[normalize-space()='Synchronize']";
    static buttonSelectAll: string = "(//span[@class='mat-checkbox-label'])[2]";
    static buttonCloseSyncPopup: string = "//span[normalize-space()='Close']";
    static buttonIUnderstandCancelAuto: string = "//span[normalize-space()='I Understand']";
    static buttonCancelAutoCancel: string = "//span[normalize-space()='Cancel']";
    static buttonCloseAfterUpdate: string = "//span[normalize-space()='Ok']";

}