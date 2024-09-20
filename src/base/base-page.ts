import {expect, Page} from "@playwright/test";
import Element, {ElementType} from "./objects/Element";
import BaseScenario from "./base-scenario";
import BaseUrl from "./base-url";
import {Keyboard} from "./constants/Keyboard";

export default abstract class BasePage<T extends BaseUrl> implements BaseScenario {
    private _page: Page;
    protected urls: T;

    protected constructor(page: Page, urls: T) {
        this._page = page;
        this.urls = urls;
    }

    abstract pageUrl: () => string;

    abstract shouldHave(): Element[];

    protected get baseUrl(): string {
        return this.urls.baseUrl();
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

    protected clickButtonByText(text: string): Promise<void> {
        console.log(`click button by text:  ${text}`);
        return this._page.getByRole('button', {name: text}).click();

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

    protected expectInvisible(selector: string): Promise<void> {
        console.log(`check if Invisible:  ${selector}`);
        return expect(this._page.locator(selector)).toBeHidden();
    }

    protected expectTextVisible(text: string, exact: boolean = false): Promise<void> {
        console.log(`check if text visible:  ${text} | exact : ${exact}`);
        return expect(this._page.getByText(text, {exact: exact})).toBeVisible();
    }

    protected expectTextInvisible(text: string, exact: boolean = false): Promise<void> {
        console.log(`check if text visible:  ${text} | exact : ${exact}`);
        return expect(this._page.getByText(text, {exact: exact})).toBeHidden();
    }

    protected async expectHasValue(selector: string, value: string): Promise<void> {
        console.log(`check if : ${selector}  hasValue : ${value}`);
        return expect(this._page.locator(selector)).toHaveValue(value);
    }

    protected async expectHasButton(selector: string, value: string, enabled: boolean = true): Promise<void> {
        let e = expect(this._page.getByRole('button', {name: value}));
        if (enabled) return e.toBeEnabled();
        return e.toBeDisabled();
    }

    protected async clickAndExpectDownloadedFile(locator: string, filename: string, extension:string): Promise<void> {
        console.log(`click : ${locator}`);
        const [ download ] = await Promise.all([
            this._page.waitForEvent('download'),
            this._page.locator(locator).click(),
        ]);
        const downloadedFile = download.suggestedFilename()
        console.log(`check if file Downloaded: ${filename}%${extension}`);
        return expect(downloadedFile.startsWith(filename) && downloadedFile.endsWith(extension)).toBe(true);
    }

    async wait(time: number) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    async waitForResponse(urlOrPredicate: string) {
        console.log(`waiting for response API contain ${urlOrPredicate}`);
        return this._page.waitForResponse(new RegExp('\\b' + urlOrPredicate + '\\b')).then(response => {
            console.log("Response Received");
            console.log(response.url());
            console.log(response.ok());
            console.log(response.status());
            console.log(response.statusText());
            return response;
        });
    }

    protected pressKeyboard(...keys: Keyboard[]): Promise<void> {
        return this._page.keyboard.type(keys.map(key => Keyboard[key]).join("+"));
    }

    protected typeKeyboard(text: string): Promise<void> {
        return this._page.keyboard.type(text);
    }

    protected waitForUrl(urlOrPredicate: string): Promise<void> {
        return this._page.waitForURL(new RegExp('\\b' + urlOrPredicate + '\\b'));
    }

    protected isEnabled(selector: string): Promise<boolean> {
        return this._page.locator(selector).isEnabled();
    }

}