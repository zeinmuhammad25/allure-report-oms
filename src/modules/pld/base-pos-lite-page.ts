import BasePage from "../../base/base-page";
import PosLiteUrls from "../../configs/pld/pos-lite-urls";
import {Page} from "@playwright/test";

export default abstract class BasePosLitePage extends BasePage<PosLiteUrls> {

    public constructor(page: Page) {
        super(page, PosLiteUrls.Instance);
    }

    protected variableBuatSemuaPosLitePage: string = this.urls.baseUrl();
}