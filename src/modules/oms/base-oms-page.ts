import BasePage from "../../base/base-page";
import OmsUrls from "../../configs/oms/pos-oms-urls";
import {Page} from "@playwright/test";
import OmsConfigs from "../../configs/oms/pos-oms-configs";

export default abstract class BaseOmsPage extends BasePage<OmsUrls, OmsConfigs> {

    protected variableBuatSemuaPosLitePage: string = this.urls.baseUrl();

    public constructor(page: Page) {
        super(page, OmsUrls.Instance, OmsConfigs.Instance);
    }
}