import BaseScenario from "../../../../../../base/base-scenario";

export default interface BranchTabSettingPOSScenario extends BaseScenario {

    navigateToTabSettingPOS(): Promise<void>;

    adjustStoreCloseNotification(): Promise<void>;

    adjustStoreCloseTime(): Promise<void>;

    adjustStoreCloseTimeManual(): Promise<void>;

    resetStoreCloseTime(): Promise<void>;


}
