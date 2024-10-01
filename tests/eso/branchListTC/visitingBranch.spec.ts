import {test} from "@playwright/test";
import LoginPage from "../../../src/modules/pld/login/login.page";
import PaymentPage from "../../../src/modules/pld/report/payment/payment.page";

test.describe.serial("Branch List Test", () => {
    const tag = '@smokeTest @eso @branchList @visitingBranch '

    test("Should successfully visit the branch via the branch list",
        {tag: tag + '@positive'}, async ({page}) => {
            // TODO :
            //  Kunjungi Branch melalui halaman branchlist
        })

    test("Should successfully visit the branch via direct URL",
        {tag: tag + '@positive'}, async ({page}) => {
            // TODO :
            //  Kunjungi Branch melalui direct url
        })
})




