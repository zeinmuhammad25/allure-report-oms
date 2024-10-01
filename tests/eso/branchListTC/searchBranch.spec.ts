import {test} from "@playwright/test";
import LoginPage from "../../../src/modules/pld/login/login.page";
import PaymentPage from "../../../src/modules/pld/report/payment/payment.page";

test.describe.serial("Branch List Test", () => {
    const tag = '@smokeTest @eso @branchList @searchBranch '

    test("Should display the branch with the name Denny's Kasablanka",
        {tag: tag + '@positive'}, async ({page}) => {
            // TODO :
            //  Cari Branch yang tersedia memakai nama branch lengkap "Denny's Kasablanka" (User bisa melihat 1 branch yang tersedia)
        })
    test("Should display several branches with the name BSD",
        {tag: tag + '@positive'}, async ({page}) => {
            // TODO :
            //  Cari Branch yang tersedia memakai sebagian nama branch "BSD" (User bisa melihat rekomendasi branch dengan nama BSD)
        })

    test("Should display information that the branch is not available",
        {tag: tag + '@negative'}, async ({page}) => {
            // TODO :
            //  Cari Branch yang tidak tersedia dengan nama branch "XXX" (User bisa melihat informasi bahwa branch yang dicari tidak ada)
        })
    test("Should display that there are several reachable branches",
        {tag: tag + '@positive'}, async ({page}) => {
            // TODO :
            //  Lihat branch pada area yang terjangkau delivery
        })

    test("Should display that there are several unreachable branches",
        {tag: tag + '@negative'}, async ({page}) => {
            // TODO :
            //  Lihat branch pada area yang tidak terjangkau delivery
        })
})






