import {expect, Page} from "@playwright/test";
import Element, {ElementType} from "./objects/Element";
import BaseScenario from "./base-scenario";

export default abstract class BasePage implements BaseScenario {
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
        await this.performCheckInitialElements();
    }

    public async performCheckInitialElements(): Promise<void> {
        let promises: Promise<any>[] = this.shouldHave().map(element => {
            switch (element.type) {
                case ElementType.TEXT:
                    return this.expectTextVisible(element.value);
                case ElementType.ELEMENT:
                    return this.expectVisible(element.selector);
                case ElementType.KEY_VALUE:
                    return this.expectHasValue(element.selector, element.value);
                case ElementType.BUTTON:
                    return this.expectHasButton(element.selector, element.value, element.enabled);
                case ElementType.LINK:
                case ElementType.INPUT:
                default:
                    return new Promise<void>(resolve => resolve());
            }
        });
        await Promise.all(promises);
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
        await this.expectHasValue(selector, value);
    }

    protected click(selector: string): Promise<void> {
        console.log(`click : ${selector}`);
        return this._page.click(selector);
    }

    protected clickText(text: string): Promise<void> {
        console.log(`click text:  ${text}`);
        return this._page.getByText(text).click();
    }

    protected expectEnabled(selector: string): Promise<void> {
        console.log(`check if enabled:  ${selector}`);
        return expect(this._page.locator(selector)).toBeEnabled();
    }

    protected expectDisabled(selector: string): Promise<void> {
        console.log(`check if disabled:  ${selector}`);
        return expect(this._page.locator(selector)).toBeDisabled();
    }

    protected expectVisible(selector: string): Promise<void> {
        console.log(`check if visible:  ${selector}`);
        return expect(this._page.locator(selector)).toBeVisible();
    }

    protected expectTextVisible(text: string, exact: boolean = false): Promise<void> {
        console.log(`check if text visible:  ${text} | exact : ${exact}`);
        return expect(this._page.getByText(text, {exact: exact})).toBeVisible();
    }

    protected async expectHasValue(selector: string, value: string): Promise<void> {
        console.log(`check if : ${selector}  hasValue : ${value}`);
        return expect(this._page.locator(selector)).toHaveValue(value);
    }

    protected async expectHasButton(selector: string, value: string, enabled: boolean = true): Promise<void> {
        let e = expect(this._page.getByRole('button', {name: value}));
        if (enabled) await e.toBeEnabled();
        return e.toBeDisabled();
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