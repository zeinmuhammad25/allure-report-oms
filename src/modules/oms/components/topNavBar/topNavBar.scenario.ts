import BaseScenario from "../../../../base/base-scenario";

export default interface topNavBarScenario extends BaseScenario {

    UserViewProfile(): Promise<void>;

    UserSignOut(): Promise<void>;

    UserViewProfileAndSignOut(): Promise<void>;

    UserViewEsbOrderReportFullService(): Promise<void>;

    UserViewEsbOrderReportQuickService(): Promise<void>;

    UserViewErrorReport(): Promise<void>;

    UserViewEsbOrderReportFullServiceIFManyData(): Promise<void>;

    UserViewEsbOrderReportQuickServiceIFManyData(): Promise<void>;

    UserViewErrorReportIFManyData(): Promise<void>;

    UserSyncUserViaLog(): Promise<void>;

}
