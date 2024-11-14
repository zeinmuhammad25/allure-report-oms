import {test} from "@playwright/test";

test.setTimeout(100000);
test.describe.serial("Start Day Test", () => {
    const tags = "@smokeTest @oms @moveTable ";

    test.beforeEach(async ({page}) => {
    });


    test("[TC_0204095] Validate Logic when User can Move Table from Quick Service to Dine-In",
        {tag: tags + "@positive"}, async ({page}) => {
            // TODO:
            //  Precondition:
            //     POS
            //     1. Open POS
            //  Steps:
            //     1. Create transaction Quick Service
            //     2. Choose Sales Mode
            //     3. Order menu
            //     4. Click Save Order
            //     5. Click transaction Quick Service again
            //     6. Click button Move Table
            //     7. Choose table
            //     8. Click button Apply
        }
    );

    test("[TC_0204096] Validate Logic when user cannot Move Table from Quick Service to Dine-In filled table",
        {tag: tags + "@negative"}, async ({page}) => {
            // TODO:
            //  Precondition:
            //     POS
            //     1. Open POS
            //     2. Open table 3 Dine In
            //  Steps:
            //     1. Create transaction Quick Service
            //     2. Choose Sales Mode
            //     3. Order menu
            //     4. Click Save Order
            //     5. Click transaction Quick Service again
            //     6. Click button Move Table
            //     7. Choose table 3
        }
    );

    test("[TC_0204097] Validate Logic when user cannot Move Table from Quick Service to Dine-In while table is not selected",
        {tag: tags + "@negative"}, async ({page}) => {
            // TODO:
            //  Precondition:
            //     POS
            //     1. Open POS
            //  Steps:
            //     1. Create transaction Quick Service
            //     2. Choose Sales Mode
            //     3. Order menu
            //     4. Click Save Order
            //     5. Click transaction Quick Service again
            //     6. Click button Move Table
            //     7. Not select table anything
        }
    );

    test("[TC_0204098] Validate Logic when user cannot Move Table while not having access",
        {tag: tags + "@negative"}, async ({page}) => {
            // TODO:
            //  Precondition:
            //     POS
            //     1. Open POS
            //     Master POS User Role
            //     1. Access Move Table = Not Active
            //  Steps:
            //     1. Create transaction Quick Service
            //     2. Choose Sales Mode
            //     3. Order menu
            //     4. Click Save Order
            //     5. Click transaction Quick Service again
        }
    );

    test("[TC_0204099] Validate Logic when User can cancel Move Table action with button Cancel",
        {tag: tags + "@positive"}, async ({page}) => {
            // TODO:
            //  Precondition:
            //     POS
            //     1. Open POS
            //  Steps:
            //     1. Create transaction Quick Service
            //     2. Choose Sales Mode
            //     3. Order menu
            //     4. Click Save Order
            //     5. Click transaction Quick Service again
            //     6. Click button Move Table
            //     7. Click button Cancel
        }
    );

    test("[TC_0204100] Validate Logic when User can Move Table from Quick Service to Dine-In while having no ordered items",
        {tag: tags + "@positive"}, async ({page}) => {
            // TODO:
            //  Precondition:
            //     POS
            //     1. Open POS
            //  Steps:
            //     1. Create transaction Quick Service
            //     2. Choose Sales Mode
            //     3. Order menu
            //     4. Click Save Order
            //     5. Click transaction Quick Service again
            //     6. Click button Move Table
            //     7. Choose table
            //     8. Click button Apply
        }
    );

    test("[TC_0204101] Validate Logic when User cannot Move Table from Quick Service to Dine-In while having no ordered items and not saving order first",
        {tag: tags + "@negative"}, async ({page}) => {
            // TODO:
            //  Precondition:
            //     POS
            //     1. Open POS
            //  Steps:
            //     1. Create transaction Quick Service
            //     2. Choose Sales Mode
            //     3. Order menu
        }
    );

});



