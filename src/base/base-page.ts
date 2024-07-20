import {expect, Page} from "@playwright/test";
import Element from "./objects/Element";

export default abstract class BasePage {
    private _page: Page;

    constructor(page: Page) {
        this._page = page;
    }

    abstract pageUrl: () => string;

    abstract shouldHave(): Element[];

    private _baseUrl: string = process.env.BASE_URL;
    protected get baseUrl(): string {
        return this._baseUrl;
    }

    async navigateHere(): Promise<void> {
        await this.navigateTo(this.pageUrl());
        for (const element of this.shouldHave()) {
            if (element.selector != undefined && element.value != undefined)
                await this.expectHaveValue(element.selector, element.value);
            else if (element.value != undefined)
                await this.expectTextVisible(element.value);
            else if (element.selector != undefined)
                await this.expectVisible(element.selector);
        }
    }

    async navigateTo(url: string): Promise<void> {
        await this._page.goto(this._baseUrl + url);
    }

    getTitle(): Promise<String> {
        return this._page.title();
    }

    protected async clear(fieldSelector: string): Promise<void> {
        await this.fill(fieldSelector, '');
        await expect(this._page.locator(fieldSelector)).toHaveValue('');
    }

    protected async fill(selector: string, value: string): Promise<void> {
        console.log(`fill ${selector} with ${value}`);
        await this._page.fill(selector, value);
        await this.expectHaveValue(selector, value);
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

    protected expectTextVisible(text: string): Promise<void> {
        return expect(this._page.getByText(text)).toBeVisible();
    }

    protected async expectHaveValue(selector: string, value: string): Promise<void> {
        await expect(this._page.locator(selector)).toHaveValue(value);
    }

    async wait(time: number) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    protected async perform(actions: Promise<any>[]) {
        return Promise.all(actions).then(value => {
            console.log(value.length)
        });
    }
}