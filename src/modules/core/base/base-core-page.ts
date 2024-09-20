import BasePage from "../../../base/base-page";
import CoreUrls from "../../../configs/core/core-urls";
import {Page} from "@playwright/test";
import CoreConfigs from "../../../configs/core/core-configs";

export default abstract class BaseCorePage extends BasePage<CoreUrls, CoreConfigs> {
    public constructor(page: Page) {
        super(page, CoreUrls.Instance, CoreConfigs.Instance);
    }
}