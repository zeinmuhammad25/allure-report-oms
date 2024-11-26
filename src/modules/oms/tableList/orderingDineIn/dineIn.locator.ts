import BaseLocator from "../../../../base/base-locator";

export  default class DineInLocator extends BaseLocator {
    static sectionTableAcRoom: string = "//span[contains(text(),'AC ROOM')]";
    static sectionTableSmokingRoom: string = "//span[contains(text(),'SMOKING ROOM')]";
    static tableAcRoom1: string = "(//div[@id='wrap-btn-text-1611'])[1]";
    static bookTablePopUp: string ="//button[@class='btn-book-default mat-flat-button btn-active']//span[@class='mat-button-wrapper'][normalize-space()='Book Table']";
    static buttonNumberOfPack = (key:number): string => `//span[normalize-space()='${key}']`;
    static buttonVisitPurpose: string ="//span[normalize-space()='DINE IN (Inclusive)']";
    static buttonBookTable: string = "//button[@type='button']//span[@class='mat-button-wrapper'][normalize-space()='Book Table']";
    static buttonBookOrder: string = "//span[normalize-space()='Book & Order']"
    static customerDataPopUpLater: string = "//button[normalize-space()='Later']"
    static navbarTableList: string = "//a[normalize-space()='Table List']"
    static selectMenuList: string = "//span[@class='text-primary ng-star-inserted']"
}