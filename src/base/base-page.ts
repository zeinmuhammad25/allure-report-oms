import {expect, Page} from "@playwright/test";

export default abstract class BasePage {
    private _page: Page;

    constructor(page: Page) {
        this._page = page;
    }

    abstract pageUrl: () => string;

    private _baseUrl: string = process.env.BASE_URL;
    protected get baseUrl(): string {
        return this._baseUrl;
    }

    async navigateHere(): Promise<void> {
        await this.navigateTo(this.pageUrl());
    }

    async navigateTo(url: string): Promise<void> {
        await this._page.goto(this._baseUrl + url);
    }

    getTitle(): Promise<String> {
        return this._page.title();
    }

    protected async fill(selector: string, value: string): Promise<void> {
        console.log(`fill ${selector} with ${value}`);
        await this._page.fill(selector, value);
        await expect(this._page.locator(selector)).toHaveValue(value);
    }

    protected click(selector: string): Promise<void> {
        console.log(`click ${selector}`);
        return this._page.click(selector);
    }

    protected expectEnabled(selector: string): Promise<void> {
        return expect(this._page.locator(selector)).toBeEnabled();
    }

    protected expectDisabled(selector: string): Promise<void> {
        return expect(this._page.locator(selector)).toBeDisabled();
    }

    protected expectVisible(selector: string): Promise<void> {
        return expect(this._page.locator(selector)).toBeVisible();
    }

    protected async perform(actions: Promise<any>[]) {
        return Promise.all(actions).then(value => {
            console.log(value.length)
        });
    }
}