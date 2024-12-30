import {expect, Page} from "@playwright/test";
import Element from "./objects/Element";
import BaseScenario from "./base-scenario";
import BaseUrl from "./base-url";
import {Keyboard} from "./constants/Keyboard";
import BaseConfigs from "./base-configs";
import {ConnectionOptions, createConnection} from "mysql2/promise";

export default abstract class BasePage<T extends BaseUrl, U extends BaseConfigs> implements BaseScenario {
    protected readonly _page: Page;
    protected urls: T;
    protected configs: U;

    protected constructor(page: Page, urls: T, configs: U) {
        this._page = page;
        this.urls = urls;
        this.configs = configs;
    }

    abstract pageUrl: () => string;

    abstract shouldHave(): Element[];

    protected get baseUrl(): string {
        return this.urls.baseUrl();
    }

    async navigateHere(performInitialCheck: boolean = true): Promise<void> {
        await this.navigateTo(this.pageUrl());
        if (performInitialCheck) await this.performCheckInitialElements();
    }

    public async gotoPage<P extends BasePage<T, U>>(
        pageCreator: new(page: Page, urls: T, configs: U) => P,
        performInitialCheck: boolean = true,
    ): Promise<P> {
        let newPage: P = new pageCreator(this._page, this.urls, this.configs);
        await newPage.navigateHere(performInitialCheck);
        return newPage;
    }

    protected async clickAndExpectGotoPage<P extends BasePage<T, U>>(selector: string, pageCreator: new(page: Page, urls: T, configs: U) => P): Promise<P> {
        await this._page.click(selector);
        let newPage: P = new pageCreator(this._page, this.urls, this.configs);
        await this.waitForUrl(newPage.pageUrl());
        await newPage.performCheckInitialElements();
        return newPage;
    }

    public async goBackAndExpectGotoPage<P extends BasePage<T, U>>(pageCreator: new(page: Page, urls: T, configs: U) => P): Promise<P> {
        await this._page.goBack();
        let newPage: P = new pageCreator(this._page, this.urls, this.configs);
        await this.waitForUrl(newPage.pageUrl());
        await newPage.performCheckInitialElements();
        return newPage;
    }

    public async performCheckInitialElements(): Promise<void> {
        let promises: Promise<void>[] = this.shouldHave().map(element => element.validate(this));
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

    public async fill(selector: string, value: string): Promise<void> {
        console.log(`fill ${selector} with ${value}`);
        await this._page.fill(selector, value);
        await this.expectHasValue(selector, value);
    }

    public click(selector: string): Promise<void> {
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

    public expectEnabled(selector: string): Promise<void> {
        console.log(`expect enabled:  ${selector}`);
        return expect(this._page.locator(selector)).toBeEnabled();
    }

    public expectDisabled(selector: string): Promise<void> {
        console.log(`expect disabled:  ${selector}`);
        return expect(this._page.locator(selector)).toBeDisabled();
    }

    public expectVisible(selector: string): Promise<void> {
        console.log(`expect visible:  ${selector}`);
        return expect(this._page.locator(selector)).toBeVisible();
    }

    protected expectInvisible(selector: string): Promise<void> {
        console.log(`expect Invisible:  ${selector}`);
        return expect(this._page.locator(selector)).toBeHidden();
    }

    public expectTextVisible(text: string, exact: boolean = false): Promise<void> {
        console.log(`expect text visible:  ${text} | exact : ${exact}`);
        return expect(this._page.getByText(text, {exact: exact})).toBeVisible();
    }

    public async expectTextVisibleTimout(text: string, exact: boolean = false, timeout: number = 10000): Promise<void> {
        console.log(`Expecting text visible: '${text}' | exact: ${exact}`);
        const locator = this._page.getByText(text, {exact});
        await locator.waitFor({state: "visible", timeout});
        return expect(locator).toBeVisible();
    }

    protected expectTextInvisible(text: string, exact: boolean = false): Promise<void> {
        console.log(`check if text visible:  ${text} | exact : ${exact}`);
        return expect(this._page.getByText(text, {exact: exact})).toBeHidden();
    }

    public async expectHasValue(selector: string, value: string): Promise<void> {
        console.log(`check if : ${selector}  hasValue : ${value}`);
        return expect(this._page.locator(selector)).toHaveValue(value);
    }

    public async expectEmpty(selector: string): Promise<void> {
        console.log(`check if : ${selector}  empty`);
        return this.expectHasValue(selector, '');
    }

    public async expectHasElement(...elements: Element[]) {
        for (const element of elements) await element.validate(this);
    }

    public async expectHasButton(selector: string, value: string, enabled: boolean = true): Promise<void> {
        let e = expect(this._page.getByRole('button', {name: value}));
        if (enabled) return e.toBeEnabled();
        return e.toBeDisabled();
    }

    public async expectHasButtonWithID(selector: string, value: string, enabled: boolean = true): Promise<void> {
        let e = expect(this._page.locator(selector, {hasText: value}));
        if (enabled) return e.toBeEnabled();
        return e.toBeDisabled();
    }

    public async waitForResponse(urlOrPredicate: string) {
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

    public async waitForVisible(
        selector: string,
        onVisible: () => Promise<void>,
        duration: number = 200,
        retry: number = 5,
    ): Promise<void> {
        for (let i = 0; i < retry; i++) {
            console.log(`waitForVisible: ${selector}, for ${duration * (i + 1)}`);
            await this.wait(duration);
            if (await this.isVisible(selector)) {
                console.log(`waitForVisible: ${selector}, it's visible!`);
                await onVisible();
                return;
            }
        }
        console.log(`waitForVisible: ${selector}, it's not visible!`);
    }

    public async waitForInvisible(
        selector: string,
        onVisible: () => Promise<void>,
        duration: number = 100,
        retry: number = 15,
    ): Promise<void> {
        for (let i = 0; i < retry; i++) {
            console.log(`waitForInvisible: ${selector}, for ${duration * (i + 1)}`);
            await this.wait(duration);
            if (await this.isInvisible(selector)) {
                console.log(`waitForInvisible: ${selector}, it's invisible!`);
                await onVisible();
                return;
            }
        }
        console.log(`waitForInvisible: ${selector}, it's not invisible!`);
    }

    public pressKeyboard(...keys: Keyboard[]): Promise<void> {
        return this._page.keyboard.press(keys.map(key => `${key}`).join("+"));
    }

    protected typeKeyboard(text: string): Promise<void> {
        return this._page.keyboard.type(text);
    }

    protected waitForUrl(urlOrPredicate: string): Promise<void> {
        return this._page.waitForURL(new RegExp('\\b' + urlOrPredicate + '\\b'));
    }

    public wait(milliseconds: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }

    protected isEnabled(selector: string): Promise<boolean> {
        return this._page.locator(selector).isEnabled();
    }

    protected isChecked(selector: string): Promise<boolean> {
        console.log(`check if checked:  ${selector}`);
        return this._page.locator(selector).isChecked();
    }

    protected isVisible(selector: string): Promise<boolean> {
        console.log(`check if visible:  ${selector}`);
        return this._page.locator(selector).isVisible();
    }

    public isInvisible(selector: string): Promise<boolean> {
        console.log(`check if visible:  ${selector}`);
        return this._page.locator(selector).isHidden();
    }

    protected isTextVisible(text: string): Promise<boolean> {
        console.log(`check if text visible:  ${text}`);
        return this._page.getByText(text).isVisible();
    }

    protected async expectDownloadFile(filename: string, extension:string): Promise<void> {
        const download =  await this._page.waitForEvent('download');
        const downloadedFile = download.suggestedFilename()
        console.log(`check if file Downloaded: ${filename}%${extension}`);
        return expect(downloadedFile.startsWith(filename) && downloadedFile.endsWith(extension)).toBe(true);
    }

    public getLocator(selector: string) {
        return this._page.locator(selector);
    }

    public async makeApiRequest<T>(endpoint: string, options: {method?: string, headers?: Record<string, string>, body?: any, baseUrl?: string} = {}):
        Promise<{ status: number; statusText: string; data: T }> {
        console.log(`Making API request to: ${endpoint}`);
        const { method = "GET", headers = {}, body, baseUrl = this.baseUrl} = options;
        return this._page.evaluate(async ({ endpoint, method, headers, body }) => {
            try {
                const response = await fetch(endpoint, {
                    method,
                    headers,
                    body: body ? JSON.stringify(body) : undefined,
                });

                const contentType = response.headers.get("content-type");
                let data;

                if (contentType && contentType.includes("application/json")) {
                    data = await response.json();
                } else {
                    data = await response.text();
                }

                return {
                    status: response.status,
                    statusText: response.statusText,
                    data,
                };
            } catch (error) {
                console.error("Error during API request:", error);
                throw error;
            }
        }, { endpoint: baseUrl + endpoint, method, headers, body });
    }

    public async sqlExecute(dbConfig:ConnectionOptions, query:string):Promise<any> {
        const connection = await createConnection(dbConfig);
        try {
            console.log("Connected to the database");
            const result = await connection.execute(query);
            console.log("Query executed successfully");
            return result;
        } catch (error) {
            console.error("Error executing query:", error);
        } finally {
            await connection.end();
        }
    }

    public async setLocalStorage(key: string, value: string): Promise<void> {
        try {
            console.log(`Set local Storage "${key}" :"${value}"`);
            await this._page.evaluate(async ([key, value]) => localStorage.setItem(key, value), [key, value])
            console.log("Success set local Storage");
        } catch (error) {
            console.error("Error executing query:", error);
        }
    }

    public async getLocalStorage(key: string): Promise<string> {
        try {
            console.log(`Get local Storage of "${key}"`);
            const result = await this._page.evaluate((key) => localStorage.getItem(key), key);
            console.log(`Success Get local Storage "${key}" : "${result}"`);
            return result;
        } catch (error) {
            console.error("Error executing query:", error);
        }
    }

    public async removeLocalStorage(key: string): Promise<void> {
        try {
            console.log(`Remove local Storage of "${key}"`);
            await this._page.evaluate((key) => localStorage.removeItem(key), key);
            console.log(`Success remove local Storage of "${key}"`);
        } catch (error) {
            console.error("Error executing query:", error);
        }
    }

    public async clearLocalStorage(): Promise<void> {
        try {
            console.log(`Remove local Storage`);
            await this._page.evaluate(() => localStorage.clear());
            console.log(`Success clear all local Storage`);
        } catch (error) {
            console.error("Error executing query:", error);
        }
    }

    public async getAllLocalStorage(): Promise<object> {
        try {
            console.log(`Get All local Storage`);
            return await this._page.evaluate(() => {
                const allLocalStorage = {};
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    allLocalStorage[key] = localStorage.getItem(key);
                }
                return allLocalStorage;
            });
        } catch (error) {
            console.error("Error executing query:", error);
        }
    }

    public async getInputValue(locator: string): Promise<string> {
        return await this._page.locator(locator).inputValue();
    }

}