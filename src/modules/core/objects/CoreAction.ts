import BasePage from "../../../base/base-page";
import BaseCorePaginationPage from "../base/base-core-pagination-page";

export abstract class CoreAction {
    protected selector: string;

    protected constructor() {
    }

    public abstract validate(page: BaseCorePaginationPage): Promise<void>;

}

export class CoreActionClear extends CoreAction {
    private constructor() {
        super();
    }

    public static of(selector: string): CoreActionClear {
        let action = new CoreActionClear();
        action.selector = selector;
        return action;
    }

    public async validate(page: BaseCorePaginationPage): Promise<void> {
        await page.click(this.selector);
        await page.waitForLoadingComplete();
    }

    public async click(page: BaseCorePaginationPage): Promise<void> {
        await page.click(this.selector);
    }
}

export class CoreActionRefresh extends CoreAction {

    public static of(selector: string): CoreActionRefresh {
        let action = new CoreActionRefresh();
        action.selector = selector;
        return action;
    }

    public async validate(page: BaseCorePaginationPage): Promise<void> {
        await page.click(this.selector);
        await page.waitForLoadingComplete();
    }

}