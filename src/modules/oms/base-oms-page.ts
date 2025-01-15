import BasePage from "../../base/base-page";
import OmsUrls from "../../configs/oms/pos-oms-urls";
import OmsConfigs from "../../configs/oms/pos-oms-configs";
import {Page} from "@playwright/test";

export default abstract class BaseOmsPage extends BasePage<OmsUrls, OmsConfigs> {
    public constructor(page: Page) {
        super(page, OmsUrls.Instance, OmsConfigs.Instance);
    }
}