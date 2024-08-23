import BasePage from "../../base/base-page";
import CoreUrls from "../../configs/core/core-urls";
import {Page} from "@playwright/test";

export default abstract class BaseCorePage extends BasePage<CoreUrls> {
    public constructor(page: Page) {
        super(page, CoreUrls.Instance);
    }
}