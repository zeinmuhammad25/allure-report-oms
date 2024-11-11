import BaseScenario from "../../../../../../base/base-scenario";

export default interface AddOrderScenario extends BaseScenario {
    addOneMenuDetailPackage(menuName:string,qty:number): Promise<void>;

    addMultiMenuDetailPackage(): Promise<void>;

    addNotesMenuDetailPackage(menuName:string,qty:number): Promise<void>;

    minusQtyInDetailMenuPackage(menuName:string,qty:number): Promise<void>;

    addMaxQtyInOneMenuDetailPackage(menuName:string,qty:number): Promise<void>;

    cancelAddMenuDetailPackage(): Promise<void>;

    // inputNotes(notes: string): Promise<void>;

}
