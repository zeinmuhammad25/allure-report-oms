import {Page} from "@playwright/test";

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

    protected fill(selector: string, value: string): Promise<void> {
        return this._page.fill(selector, value);
    }

    protected click(selector: string): Promise<void> {
        return this._page.click(selector);
    }
}