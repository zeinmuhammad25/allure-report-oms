import {Page} from "@playwright/test";

export default class Helper {
    static async waitForSelector(page: Page, selector: string) {
        await page.waitForSelector(selector);
    }

    static async delay(time: number) {
        return new Promise(resolve => setTimeout(resolve, time));
    }
}
