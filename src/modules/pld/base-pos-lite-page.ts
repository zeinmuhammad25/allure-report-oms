import BasePage from "../../base/base-page";
import PosLiteUrls from "../../configs/pld/pos-lite-urls";
import {Page} from "@playwright/test";
import PosLiteConfigs from "../../configs/pld/pos-lite-configs";

export default abstract class BasePosLitePage extends BasePage<PosLiteUrls, PosLiteConfigs> {

    public constructor(page: Page) {
        super(page, PosLiteUrls.Instance, PosLiteConfigs.Instance);
    }

    protected variableBuatSemuaPosLitePage: string = this.urls.baseUrl();
}