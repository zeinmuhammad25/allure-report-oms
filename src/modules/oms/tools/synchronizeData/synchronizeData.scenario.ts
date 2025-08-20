import BaseScenario from "../../../../base/base-scenario";

export default interface SynchronizeDataScenario extends BaseScenario {

    synchronizeDataAutoSync(): Promise<void>;

    synchronizeDataAll(): Promise<void>;

    synchronizeDataBranchSetting(): Promise<void>;

    synchronizeDataMasterSetting(): Promise<void>;

    synchronizeDataMember(): Promise<void>;

    synchronizeDataPromotion(): Promise<void>;

    synchronizeDataTable(): Promise<void>;

    synchronizeDataMenu(): Promise<void>;

    synchronizeDataSales(): Promise<void>;

    synchronizeDataUser(): Promise<void>;

    closePopUpAfterSync(): Promise<void>;

}