import BasePage from "../../../base/base-page";
import EsoUrls from "../../../configs/eso/eso-urls";
import EsoConfigs from "../../../configs/eso/eso-configs";
import {Page} from "@playwright/test";

export default abstract class BaseEsoPage extends BasePage<EsoUrls, EsoConfigs> {
    public constructor(page: Page) {
        super(page, EsoUrls.Instance, EsoConfigs.Instance);
    }
}