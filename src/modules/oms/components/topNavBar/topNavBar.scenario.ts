import BaseScenario from "../../../../base/base-scenario";

export default interface TopNavBarScenario extends BaseScenario {

    userViewProfile(): Promise<void>;

    userSignOut(): Promise<void>;

    userViewProfileAndSignOut(): Promise<void>;

    userViewEsbOrderReportFullService(): Promise<void>;

    userViewEsbOrderReportQuickService(): Promise<void>;

    userViewErrorReport(): Promise<void>;

    userViewEsbOrderReportFullServiceIFManyData(): Promise<void>;

    userViewEsbOrderReportQuickServiceIFManyData(): Promise<void>;

    userViewErrorReportIFManyData(): Promise<void>;

    userSyncUserViaLog(): Promise<void>;

}
