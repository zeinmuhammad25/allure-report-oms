import BasePage from "../../../base/base-page";
import {Keyboard} from "../../../base/constants/Keyboard";
import Promises from "../../../base/utils/promises";
import Element from "../../../base/objects/Element";

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

    public abstract validate(page: BasePage<any, any>): Promise<void>;
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

    public async validate(page: BasePage<any, any>): Promise<void> {
        await page.expectVisible(this.selector);
        await page.click(this.selector);
        await page.fill(this.selector, "test abc");
        await page.pressKeyboard(Keyboard.ENTER);
        await page.waitForInvisible(CoreFilterInput.locatorLoading, () => Promises.empty());
        if (this.selectorTitle != null)
            await page.expectVisible(this.selectorTitle)
        return;
    }
}

export class CoreFilterSelect extends CoreFilter {

    private selectorContainer: string;
    private children: Element[] = [];

    public static of(selector: string, selectorContainer: string): CoreFilterSelect {
        let filter = new CoreFilterSelect();
        filter.selector = selector;
        filter.selectorContainer = selectorContainer;
        return filter;
    }

    public withChildren(...child: Element[]): CoreFilterSelect {
        this.children.push(...child);
        return this;
    }

    public async validate(page: BasePage<any, any>): Promise<void> {
        await page.expectVisible(this.selector);
        await page.click(this.selector);
        await page.expectVisible(this.selectorContainer);
    }
}

