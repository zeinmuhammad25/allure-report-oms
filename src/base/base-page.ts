import {expect, Page} from "@playwright/test";
import Element, {ElementType} from "./objects/Element";

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
        await this.checkInitialElements();
    }

    protected async checkInitialElements(): Promise<void> {
        for (const element of this.shouldHave()) {
            switch (element.type) {
                case ElementType.TEXT:
                    await this.expectTextVisible(element.value);
                    break;
                case ElementType.ELEMENT:
                    await this.expectVisible(element.selector);
                    break;
                case ElementType.KEY_VALUE:
                    await this.expectHaveValue(element.selector, element.value);
                    break;
                case ElementType.BUTTON:
                    await this.expectHaveButton(element.selector, element.value, element.enabled);
                    break;
                case ElementType.LINK:
                    break;
            }
        }
    }

    async navigateTo(url: string): Promise<void> {
        await this._page.goto(this.baseUrl + url);
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

    protected clickText(text: string): Promise<void> {
        return this._page.getByText(text).click();
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

    protected expectTextVisible(text: string, exact: boolean = false): Promise<void> {
        return expect(this._page.getByText(text, {exact: exact})).toBeVisible();
    }

    protected async expectHaveValue(selector: string, value: string): Promise<void> {
        await expect(this._page.locator(selector)).toHaveValue(value);
    }

    protected async expectHaveButton(selector: string, value: string, enabled: boolean = true): Promise<void> {
        let e = expect(this._page.getByRole('button', {name: value}));
        if (enabled) await e.toBeEnabled();
        else await e.toBeDisabled();
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