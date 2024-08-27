import BasePage from "../../../base/base-page";
import {Keyboard} from "../../../base/constants/Keyboard";
import Promises from "../../../base/utils/promises";
import BaseCorePaginationPage from "../base/base-core-pagination-page";

export abstract class CoreFilter {

    protected static locatorLoading = "//div[@class='kv-grid-loading' and @id='#w0-container']";

    protected selector: string;
    protected selectorTitle?: string;
    protected textTitle?: string;

    protected constructor() {
    }

    public withTitle(text?: string, selector?: string): CoreFilter {
        this.selectorTitle = selector;
        this.textTitle = text;
        return this;
    }

    public abstract validate(page: BaseCorePaginationPage): Promise<void>;
}

export class CoreFilterInput extends CoreFilter {

    private constructor() {
        super();
    }

    public static of(selector: string): CoreFilterInput {
        let filter = new CoreFilterInput();
        filter.selector = selector;
        return filter;
    }

    public async validate(page: BaseCorePaginationPage): Promise<void> {
        await page.expectVisible(this.selector);
        await page.click(this.selector);
        await page.fill(this.selector, "test abc");
        await page.pressKeyboard(Keyboard.ENTER);
        await page.waitForLoading(() => Promises.empty());
        if (this.selectorTitle != null) await page.expectVisible(this.selectorTitle)
        return;
    }

    public async validateCleared(page: BaseCorePaginationPage): Promise<void> {
        await page.expectVisible(this.selector);
        await page.expectEmpty(this.selector)
    }
}

export class CoreFilterSelect extends CoreFilter {

    private selectorContainer: string;

    public static of(selector: string, selectorContainer: string): CoreFilterSelect {
        let filter = new CoreFilterSelect();
        filter.selector = selector;
        filter.selectorContainer = selectorContainer;
        return filter;
    }

    public async validate(page: BaseCorePaginationPage): Promise<void> {
        await page.expectVisible(this.selector);
        await page.click(this.selector);
        await page.expectVisible(this.selectorContainer);
        const items = await page.getLocator(this.selectorContainer).locator('li').all();
        for (let i = 0; i < items.length; i++) {
            let x = items[i];
            if (await page.isInvisible(this.selectorContainer)) await page.click(this.selector);
            await page.waitForLoading(() => x.click());
        }
    }

    public async validateCleared(page: BaseCorePaginationPage): Promise<void> {
        await page.expectVisible(this.selector);
        const item = page.getLocator(this.selectorContainer).locator('li').first();
        await page.expectHasValue(this.selector, await item.textContent());
    }
}

