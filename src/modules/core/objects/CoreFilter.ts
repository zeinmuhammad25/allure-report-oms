import BasePage from "../../../base/base-page";
import {Keyboard} from "../../../base/constants/Keyboard";
import Promises from "../../../base/utils/promises";
import BaseCorePaginationPage from "../base/base-core-pagination-page";

export abstract class CoreFilter {
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

    public abstract validate(page: BaseCorePaginationPage, data: string[], onValueChange?: (value: string) => Promise<void>): Promise<void>;

    public abstract cleanUp(page: BaseCorePaginationPage): Promise<void>;
}

export class CoreFilterNumber extends CoreFilter {

    private constructor() {
        super();
    }

    public static of(selector: string): CoreFilterNumber {
        let filter = new CoreFilterNumber();
        filter.selector = selector;
        return filter;
    }

    public validate(page: BaseCorePaginationPage, data: string[], onValueChange?: (value: string) => Promise<void>): Promise<void> {
        return;
    }

    public async cleanUp(page: BaseCorePaginationPage): Promise<void> {

    }
}

export class CoreFilterActions extends CoreFilter {

    private constructor() {
        super();
    }

    public static of(selector: string): CoreFilterActions {
        let filter = new CoreFilterActions();
        filter.selector = selector;
        return filter;
    }

    public validate(page: BaseCorePaginationPage, data: string[], onValueChange?: (value: string) => Promise<void>): Promise<void> {
        return;
    }

    public async cleanUp(page: BaseCorePaginationPage): Promise<void> {

    }
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

    public async validate(
        page: BaseCorePaginationPage,
        data: string[],
        onValueChange?: (value: string) => Promise<void>,
    ): Promise<void> {
        for (let i = 0; i < data.length; i++) {
            await page.expectVisible(this.selector);
            await page.click(this.selector);
            await page.fill(this.selector, data[i]);
            await page.pressKeyboard(Keyboard.ENTER);
            await page.waitForLoadingComplete(() => Promises.empty());
            if (onValueChange != null) await onValueChange(data[i]);

        }
        if (this.selectorTitle != null) await page.expectVisible(this.selectorTitle)
        return;
    }

    public async validateCleared(page: BaseCorePaginationPage): Promise<void> {
        await page.expectVisible(this.selector);
        await page.expectEmpty(this.selector)
    }

    public async cleanUp(page: BaseCorePaginationPage): Promise<void> {
        await page.expectVisible(this.selector);
        await page.click(this.selector);
        await page.fill(this.selector, '');
        await page.pressKeyboard(Keyboard.ENTER);
        await page.waitForLoadingComplete(() => Promises.empty());
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

    public async validate(page: BaseCorePaginationPage, data: string[], onValueChange?: (value: string) => Promise<void>): Promise<void> {
        await page.expectVisible(this.selector);
        await page.click(this.selector);
        await page.expectVisible(this.selectorContainer);
        const items = await page.getLocator(this.selectorContainer).locator('li').all();
        for (let i = 0; i < items.length; i++) {
            if (await page.isInvisible(this.selectorContainer)) await page.click(this.selector);
            await page.waitForLoadingComplete(() => items[i].click());
        }

        if (items.length > 0) {
            if (await page.isInvisible(this.selectorContainer)) await page.click(this.selector);
            await items[0].click();
        }
    }

    public async validateCleared(page: BaseCorePaginationPage): Promise<void> {
        await page.expectVisible(this.selector);
        const item = page.getLocator(this.selectorContainer).locator('li').first();
        await page.expectHasValue(this.selector, await item.textContent());
    }

    public async cleanUp(page: BaseCorePaginationPage): Promise<void> {

    }
}

