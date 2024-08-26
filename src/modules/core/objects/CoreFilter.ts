import BasePage from "../../../base/base-page";
import {Keyboard} from "../../../base/constants/Keyboard";

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

    public abstract validate(page: BasePage<any, any>): Promise<void>;
}

export class CoreFilterInput extends CoreFilter {

    private regex: string;

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
        if (this.selectorTitle != null)
            await page.expectVisible(this.selectorTitle)
        return;
    }
}

