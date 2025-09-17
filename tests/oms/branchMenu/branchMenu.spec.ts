import {test} from "../injection";
import {safeTest} from "../../../src/base/utils/safeTest";

test.setTimeout(100000);
test.describe.serial("Branch Menu", () => {
    const tags = "@smokeTest @oms @BranchMenu";

    test.beforeEach(async ({terminalID, signPin, sideNavBar, tableList}) => {
        const testWithAuthentication = [
            "[TC_0205634] Validate tampilan halaman branch menu yang memiliki penambahan button filter"
        ];

        if (testWithAuthentication.includes(test.info().title)) {
            await terminalID.goHere();
            await terminalID.performTerminalID();
            await signPin.inputPinByTouch("22");
            await signPin.validateShowStarCash("20.000");
            await signPin.storeAuthState();
        }
        await tableList.goHere();
        await signPin.closePopUpAlert();
        await sideNavBar.gotoPageBranchMenu();
    });

    test.afterEach(async ({}) => {

    });

    test("[TC_0205634] Validate tampilan halaman branch menu yang memiliki penambahan button filter",
        {tag: tags + "@positive"}, async ({branchMenu}, testInfo) => {
            await safeTest(async ({}) => {
                await branchMenu.filterCategoryBranchMenu("All Menu");
                await branchMenu.selectMenuCategory("Anggur");
                await branchMenu.validationMenu("[21+] Anggur Ketan Hitam OT 620ml", "name");
                await branchMenu.filterCategoryBranchMenu("Sold Out Menu");
                await branchMenu.selectMenuCategory("A1 Ready To Sell");
                await branchMenu.validationMenu("New York Cheese Cake Dus", "short");
                await branchMenu.filterCategoryBranchMenu("Limit Quantity Menu");
                await branchMenu.selectMenuCategory("Makanan Apri");
                await branchMenu.validationMenu("For Testing", "sub");
            }, {branchMenu}, testInfo);
        });

    test("[TC_0205635] Validate tampilan halaman branch menu pada setiap tab category menu memiliki filtering button",
        {tag: tags + "@positive"}, async ({branchMenu}, testInfo) => {
            await safeTest(async ({}) => {
                await branchMenu.filterCategoryBranchMenu("All Menu");
                await branchMenu.selectMenuCategory("Anggur");
                await branchMenu.validationMenu("[21+] Anggur Ketan Hitam OT 620ml", "name");
                await branchMenu.filterCategoryBranchMenu("Sold Out Menu");
                await branchMenu.selectMenuCategory("A1 Ready To Sell");
                await branchMenu.validationMenu("New York Cheese Cake Dus", "short");
                await branchMenu.filterCategoryBranchMenu("Limit Quantity Menu");
                await branchMenu.selectMenuCategory("Makanan Apri");
                await branchMenu.validationMenu("For Testing", "sub");
            }, {branchMenu}, testInfo);
        });

    test("[TC_0205636] Validate filtering button pada halaman branch menu memiliki tiga opsi dengan 3 button yang berbeda",
        {tag: tags + "@positive"}, async ({branchMenu}, testInfo) => {
            await safeTest(async ({}) => {
                await branchMenu.filterCategoryBranchMenu("All Menu");
                await branchMenu.filterCategoryBranchMenu("Sold Out Menu");
                await branchMenu.filterCategoryBranchMenu("Limit Quantity Menu");
            }, {branchMenu}, testInfo);
        });

    test("[TC_0205637] Validate default state filtering pada halaman branch menu adalah opsi All",
        {tag: tags + "@positive"}, async ({branchMenu, sideNavBar}, testInfo) => {
            await safeTest(async ({}) => {
                await sideNavBar.gotoPageTools();
                await sideNavBar.gotoPageBranchMenu();
                await branchMenu.selectMenuCategory("Anggur");
                await branchMenu.validationMenu("[21+] Anggur Ketan Hitam OT 620ml", "name");
            }, {branchMenu, sideNavBar}, testInfo);
        });

    test("[TC_0205638] Validate fungsi filtering button 'All' akan menunjukkan semua item yang ada pada branch menu",
        {tag: tags + "@positive"}, async ({branchMenu}, testInfo) => {
            await safeTest(async ({}) => {
                await branchMenu.filterCategoryBranchMenu("All Menu");
                await branchMenu.validationMenu("TES - Air Mineral 330ml", "name");
                await branchMenu.validationMenu("ASIAN DOLCE LATTE", "name");
                await branchMenu.validationMenu("Almond Hazelnut Latte", "name");
                await branchMenu.validationMenu("Almondmilk Hazelnut Latte", "name");
                await branchMenu.validationMenu("BETAWI LATTE", "name");
                await branchMenu.validationMenu("BUTTERSCOTCH LATTE", "name");
            }, {branchMenu}, testInfo);
        });

    test("[TC_0205639] Validate fungsi filtering button 'All' dapat dipilih ketika state filtering berada pada opsi 'Sold Out'",
        {tag: tags + "@positive"}, async ({branchMenu}, testInfo) => {
            await safeTest(async ({}) => {
                await branchMenu.filterCategoryBranchMenu("All Menu");
                await branchMenu.selectMenuCategory("Makanan Apri");
                await branchMenu.validationMenu("Nasi Ayam Dada", "short");
            }, {branchMenu}, testInfo);
        });

    test("[TC_0205640] Validate fungsi filtering button 'Allt' dapat dipilih ketika state filtering berada pada opsi 'Limited Qty'",
        {tag: tags + "@positive"}, async ({branchMenu}, testInfo) => {
            await safeTest(async ({}) => {
                await branchMenu.filterCategoryBranchMenu("Limit Quantity Menu");
                await branchMenu.searchMenuInCategory("Nasi Ayam Dada");
                await branchMenu.validationMenu("Nasi Ayam Dada", "short");
                await branchMenu.filterCategoryBranchMenu("Sold Out Menu");
                await branchMenu.validationMenu("Nasi Ayam Dada", "short");
                await branchMenu.filterCategoryBranchMenu("All Menu");
                await branchMenu.selectMenuCategory("Makanan Apri");
                await branchMenu.validationMenu("Nasi Ayam Dada", "short");
            }, {branchMenu}, testInfo);
        });

    test("[TC_0205641] Validate fungsi filtering button 'Sold Out' dapat dipilih ketika state filtering berada pada opsi 'All'",
        {tag: tags + "@positive"}, async ({branchMenu}, testInfo) => {
            await safeTest(async ({}) => {
                await branchMenu.filterCategoryBranchMenu("Limit Quantity Menu");
                await branchMenu.selectMenuCategory("Anggur");
                await branchMenu.clickFlagSoldOut(1);
                await branchMenu.saveBranchMenu();
                await branchMenu.filterCategoryBranchMenu("All Menu");
                await branchMenu.selectMenuCategory("Anggur");
                await branchMenu.validationMenu("[21+] Anggur Hijau Kawa Kawa", "short");
            }, {branchMenu}, testInfo);
        });

    test("[TC_0205642] Validate fungsi filtering button 'Sold Out' dapat dipilih ketika state filtering berada pada opsi 'Limited Qty'",
        {tag: tags + "@positive"}, async ({branchMenu}, testInfo) => {
            await safeTest(async ({}) => {
                await branchMenu.filterCategoryBranchMenu("Limit Quantity Menu");
                await branchMenu.selectMenuCategory("ESO Automation Menu");
                await branchMenu.clickFlagSoldOut(1);
                await branchMenu.saveBranchMenu();
                await branchMenu.filterCategoryBranchMenu("All Menu");
                await branchMenu.selectMenuCategory("ESO Automation Menu");
                await branchMenu.validationMenu("Anggur AT ESO", "short");
                await branchMenu.filterCategoryBranchMenu("Sold Out Menu");
                await branchMenu.selectMenuCategory("ESO Automation Menu");
                await branchMenu.validationMenu("Anggur AT ESO", "short");
            }, {branchMenu}, testInfo);
        });

    test("[TC_0205643] Validate hasil filter 'Sold Out' akan menampilkan menu category dengan menu sold out",
        {tag: tags + "@positive"}, async ({branchMenu}, testInfo) => {
            await safeTest(async ({}) => {
                await branchMenu.filterCategoryBranchMenu("Limit Quantity Menu");
                await branchMenu.selectMenuCategory("Makanan Apri");
                await branchMenu.clickFlagSoldOut(1);
                await branchMenu.saveBranchMenu();
                await branchMenu.filterCategoryBranchMenu("All Menu");
                await branchMenu.selectMenuCategory("Makanan Apri");
                await branchMenu.validationMenu("Bebek Madu Pedas Bakar", "short");
                await branchMenu.filterCategoryBranchMenu("Sold Out Menu");
                await branchMenu.selectMenuCategory("Makanan Apri");
                await branchMenu.validationMenu("Bebek Madu Pedas Bakar", "short");
            }, {branchMenu}, testInfo);
        });

    test("[TC_0205644] Validate hasil filter 'Sold Out' akan menghilangkan menu dengan Limited Qty",
        {tag: tags + "@positive"}, async ({branchMenu}, testInfo) => {
            await safeTest(async ({}) => {
                await branchMenu.filterCategoryBranchMenu("Limit Quantity Menu");
                await branchMenu.selectMenuCategory("Anggur");
                await branchMenu.clickFlagSoldOut(2);
                await branchMenu.saveBranchMenu();
                await branchMenu.filterCategoryBranchMenu("All Menu");
                await branchMenu.selectMenuCategory("Anggur");
                await branchMenu.validationMenu("[21+] Anggur Ketan Hitam OT 62", "short");
                await branchMenu.filterCategoryBranchMenu("Sold Out Menu");
                await branchMenu.selectMenuCategory("Anggur");
                await branchMenu.validationMenu("[21+] Anggur Ketan Hitam OT 62", "short");
            }, {branchMenu}, testInfo);
        });

    test("[TC_0205645] Validate hasil filter 'Sold Out' akan menghilangkan menu dengan Limited Qty",
        {tag: tags + "@positive"}, async ({branchMenu}, testInfo) => {
            await safeTest(async ({}) => {
                await branchMenu.filterCategoryBranchMenu("Limit Quantity Menu");
                await branchMenu.selectMenuCategory("Anggur");
                await branchMenu.clickFlagSoldOut(3);
                await branchMenu.saveBranchMenu();
                await branchMenu.filterCategoryBranchMenu("All Menu");
                await branchMenu.selectMenuCategory("Anggur");
                await branchMenu.validationMenu("[21+] Anggur Merah Kawa Kawa", "short");
                await branchMenu.filterCategoryBranchMenu("Sold Out Menu");
                await branchMenu.selectMenuCategory("Anggur");
                await branchMenu.validationMenu("[21+] Anggur Merah Kawa Kawa", "short");
            }, {branchMenu}, testInfo);
        });

    test("[TC_0205646] Validate fungsi filtering button 'Limited Qty dapat dipilih ketika state filtering berada pada opsi 'Sold Out'",
        {tag: tags + "@positive"}, async ({branchMenu}, testInfo) => {
            await safeTest(async ({}) => {
                await branchMenu.filterCategoryBranchMenu("Limit Quantity Menu");
                await branchMenu.selectMenuCategory("Anggur");
                await branchMenu.clickFlagSoldOut(4);
                await branchMenu.saveBranchMenu();
                await branchMenu.filterCategoryBranchMenu("All Menu");
                await branchMenu.selectMenuCategory("Anggur");
                await branchMenu.validationMenu("[21+] Anggur Merah OT 620ml", "short");
                await branchMenu.filterCategoryBranchMenu("Sold Out Menu");
                await branchMenu.selectMenuCategory("Anggur");
                await branchMenu.validationMenu("[21+] Anggur Merah OT 620ml", "short");
            }, {branchMenu}, testInfo);
        });

    test("[TC_0205647] Validate hasil filter 'Limited Qty' akan menampilkan menu category dengan menu Limited Qty",
        {tag: tags + "@positive"}, async ({branchMenu}, testInfo) => {
            await safeTest(async ({}) => {
                await branchMenu.filterCategoryBranchMenu("Limit Quantity Menu");
                await branchMenu.selectMenuCategory("Anggur");
                await branchMenu.clickFlagSoldOut(5);
                await branchMenu.saveBranchMenu();
                await branchMenu.filterCategoryBranchMenu("All Menu");
                await branchMenu.selectMenuCategory("Anggur");
                await branchMenu.validationMenu("[21+] Anggur Merah OT Gold 620", "short");
                await branchMenu.filterCategoryBranchMenu("Sold Out Menu");
                await branchMenu.selectMenuCategory("Anggur");
                await branchMenu.validationMenu("[21+] Anggur Merah OT Gold 620", "short");
            }, {branchMenu}, testInfo);
        });

    test("[TC_0205648] Validate hasil filter 'Limited Qty' akan menghilangkan menu dengan status Sold Out",
        {tag: tags + "@positive"}, async ({branchMenu}, testInfo) => {
            await safeTest(async ({}) => {
                await branchMenu.filterCategoryBranchMenu("Limit Quantity Menu");
                await branchMenu.selectMenuCategory("Anggur");
                await branchMenu.clickFlagSoldOut(6);
                await branchMenu.saveBranchMenu();
                await branchMenu.filterCategoryBranchMenu("All Menu");
                await branchMenu.selectMenuCategory("Anggur");
                await branchMenu.validationMenu("[21+] Anggur Putih OT 620ml", "short");
                await branchMenu.filterCategoryBranchMenu("Sold Out Menu");
                await branchMenu.selectMenuCategory("Anggur");
                await branchMenu.validationMenu("[21+] Anggur Putih OT 620ml", "short");
            }, {branchMenu}, testInfo);
        });

    test("[TC_0205649] Validate fungsi halaman branch Menu dapat melakukan update status terhadap setiap menu",
        {tag: tags + "@positive"}, async ({branchMenu, sideNavBar}, testInfo) => {
            await safeTest(async ({}) => {
                await branchMenu.selectMenuCategory("Makanan Apri");
                await branchMenu.clickFlagSoldOut(1);
                await sideNavBar.gotoPageTools();
                await sideNavBar.gotoPageBranchMenu();
                await branchMenu.selectMenuCategory("Makanan Apri");
                await branchMenu.validationMenu("Bebek Madu Pedas Bakar", "short");
            }, {branchMenu, sideNavBar}, testInfo);
        });

    test("[TC_0205650] Validate fungsi halaman branch Menu dapat melakukan update status terhadap setiap menu",
        {tag: tags + "@positive"}, async ({branchMenu, sideNavBar}, testInfo) => {
            await safeTest(async ({}) => {
                await branchMenu.selectMenuCategory("Makanan Apri");
                await branchMenu.butonCheckerStation("None selected", 3);
                await branchMenu.showDropdown(1);
                await branchMenu.selectStationInDropDown("KASIR");
                await branchMenu.closeAfterSelectOrInput();
                await sideNavBar.gotoPageTools();
                await sideNavBar.gotoPageBranchMenu();
                await branchMenu.selectMenuCategory("Makanan Apri");
                await branchMenu.validationMenu("Nasi Ayam Paha", "short");
            }, {branchMenu, sideNavBar}, testInfo);
        });

    test("[TC_0205651] Validate perubahan station menu tidak Sold Out tanpa melakukan 'Save' ketika filtering sedang berjalan",
        {tag: tags + "@positive"}, async ({branchMenu, sideNavBar}, testInfo) => {
            await safeTest(async ({}) => {
                await branchMenu.selectMenuCategory("Makanan Apri");
                await branchMenu.butonCheckerStation("None selected", 3);
                await branchMenu.showDropdown(1);
                await branchMenu.selectStationInDropDown("KASIR");
                await branchMenu.closeAfterSelectOrInput();
                await branchMenu.showDropdown(2);
                await branchMenu.selectStationInDropDown("KASIR");
                await branchMenu.closeAfterSelectOrInput();
                await sideNavBar.gotoPageTools();
                await sideNavBar.gotoPageBranchMenu();
                await branchMenu.selectMenuCategory("Makanan Apri");
                await branchMenu.validationMenu("Nasi Ayam Paha", "short");
            }, {branchMenu, sideNavBar}, testInfo);
        });

    test("[TC_0205652] Validate perubahan station menu Limited Qty tanpa melakukan 'Save' ketika filtering sedang berjalan",
        {tag: tags + "@positive"}, async ({branchMenu, sideNavBar}, testInfo) => {
            await safeTest(async ({}) => {
                await branchMenu.filterCategoryBranchMenu("Limit Quantity Menu");
                await branchMenu.selectMenuCategory("Makanan Apri");
                await branchMenu.butonStation("None selected", 2);
                await branchMenu.showDropdown(2);
                await branchMenu.selectStationInDropDown("KASIR");
                await branchMenu.closeAfterSelectOrInput();
                await sideNavBar.gotoPageTools();
                await sideNavBar.gotoPageBranchMenu();
                await branchMenu.filterCategoryBranchMenu("Limit Quantity Menu");
                await branchMenu.selectMenuCategory("Makanan Apri");
                await branchMenu.validationMenu("Nasi Ayam Dada", "short");
            }, {branchMenu, sideNavBar}, testInfo);
        });

    test("[TC_0205653] Validate perubahan station menu tidak Sold Out tanpa melakukan 'Save' ketika filtering sedang berjalan",
        {tag: tags + "@positive"}, async ({branchMenu, sideNavBar}, testInfo) => {
            await safeTest(async ({}) => {
                await branchMenu.selectMenuCategory("Makanan Apri");
                await branchMenu.clickFlagSoldOut(1);
                await branchMenu.clickFlagSoldOut(2);
                await sideNavBar.gotoPageTools();
                await sideNavBar.gotoPageBranchMenu();
                await branchMenu.selectMenuCategory("Makanan Apri");
                await branchMenu.validationMenu("Bebek Madu Pedas Bakar", "short");
                await branchMenu.validationMenu("Nasi Ayam Dada", "short");
            }, {branchMenu, sideNavBar}, testInfo);
        });

    test("[TC_0205654] Validate perubahan status menu dari Tidak Sold Out menjadi Sold Out tanpa melakukan 'Save' ketika filtering sedang berjalan",
        {tag: tags + "@positive"}, async ({branchMenu, sideNavBar}, testInfo) => {
            await safeTest(async ({}) => {
                await branchMenu.selectMenuCategory("Makanan Apri");
                await branchMenu.clickFlagSoldOut(3);
                await branchMenu.clickFlagSoldOut(4);
                await sideNavBar.gotoPageTools();
                await sideNavBar.gotoPageBranchMenu();
                await branchMenu.selectMenuCategory("Makanan Apri");
                await branchMenu.validationMenu("Nasi Ayam Paha", "short");
                await branchMenu.validationMenu("Paket Happy Hour 1", "short");
            }, {branchMenu, sideNavBar}, testInfo);
        });

    test("[TC_0205655] Validate perubahan status menu dari Limited Qty menjadi tidak Limited Qty tanpa melakukan 'Save' ketika filtering sedang berjalan",
        {tag: tags + "@positive"}, async ({branchMenu, sideNavBar}, testInfo) => {
            await safeTest(async ({}) => {
                await branchMenu.selectMenuCategory("Makanan Apri");
                await branchMenu.butonShowQty("2",1,);
                await branchMenu.inputQty("0");
                await sideNavBar.gotoPageTools();
                await sideNavBar.gotoPageBranchMenu();
                await branchMenu.selectMenuCategory("Makanan Apri");
                await branchMenu.validationMenu("Bebek Madu Pedas Bakar", "short");
            }, {branchMenu, sideNavBar}, testInfo);
        });

    test("[TC_0205656] Validate perubahan status menu dari Limited Qty menjadi tidak Limited Qty tanpa melakukan 'Save' ketika filtering sedang berjalan",
        {tag: tags + "@positive"}, async ({branchMenu, sideNavBar}, testInfo) => {
            await safeTest(async ({}) => {
                await branchMenu.selectMenuCategory("Makanan Apri");
                await branchMenu.butonShowQty("2",1,);
                await branchMenu.inputQty("0");
                await sideNavBar.gotoPageTools();
                await sideNavBar.gotoPageBranchMenu();
                await branchMenu.selectMenuCategory("Makanan Apri");
                await branchMenu.validationMenu("Bebek Madu Pedas Bakar", "short");
            }, {branchMenu, sideNavBar}, testInfo);
        });

    test("[TC_0205656] Validate perubahan status menu dari Tidak Limited Qty menjadi Limited Qty tanpa melakukan 'Save' ketika filtering sedang berjalan",
        {tag: tags + "@positive"}, async ({branchMenu, sideNavBar}, testInfo) => {
            await safeTest(async ({}) => {
                await branchMenu.selectMenuCategory("Makanan Apri");
                await branchMenu.butonShowQty("0",1,);
                await branchMenu.inputQty("10");
                await sideNavBar.gotoPageTools();
                await sideNavBar.gotoPageBranchMenu();
                await branchMenu.selectMenuCategory("Makanan Apri");
                await branchMenu.validationMenu("Nasi Ayam Paha", "short");
            }, {branchMenu, sideNavBar}, testInfo);
        });

    test("[TC_0205657] Validate perubahan status menu dari Limited Qty menjadi Sold Out tanpa melakukan 'Save' ketika filtering sedang berjalan",
        {tag: tags + "@positive"}, async ({branchMenu, sideNavBar}, testInfo) => {
            await safeTest(async ({}) => {
                await branchMenu.selectMenuCategory("Makanan Apri");
                await branchMenu.butonShowQty("0",1,);
                await branchMenu.inputQty("10");
                await branchMenu.clickFlagSoldOut(3);
                await sideNavBar.gotoPageTools();
                await sideNavBar.gotoPageBranchMenu();
                await branchMenu.selectMenuCategory("Makanan Apri");
                await branchMenu.validationMenu("Nasi Ayam Paha", "short");
            }, {branchMenu, sideNavBar}, testInfo);
        });

    test("[TC_0205658] Validate perubahan status menu dari Sold Out menjadi Limited Qty tanpa melakukan 'Save' ketika filtering sedang berjalan",
        {tag: tags + "@positive"}, async ({branchMenu, sideNavBar}, testInfo) => {
            await safeTest(async ({}) => {
                await branchMenu.selectMenuCategory("Makanan Apri");
                await branchMenu.clickFlagSoldOut(1);
                await branchMenu.butonShowQty("2",1,);
                await branchMenu.inputQty("10");
                await sideNavBar.gotoPageTools();
                await sideNavBar.gotoPageBranchMenu();
                await branchMenu.selectMenuCategory("Makanan Apri");
                await branchMenu.validationMenu("Bebek Madu Pedas Bakar", "short");
            }, {branchMenu, sideNavBar}, testInfo);
        });

    test("[TC_0205659] Validate perubahan station menu tidak Sold Out setelah melakukan 'Save' ketika filtering sedang berjalan",
        {tag: tags + "@positive"}, async ({branchMenu}, testInfo) => {
            await safeTest(async ({}) => {
                await branchMenu.selectMenuCategory("Makanan Apri");
                await branchMenu.butonStation("None selected", 3);
                await branchMenu.showDropdown(2);
                await branchMenu.selectStationInDropDown("KASIR");
                await branchMenu.closeAfterSelectOrInput();
                await branchMenu.saveBranchMenu();
                await branchMenu.validationMenu("Nasi Ayam Paha", "short");
            }, {branchMenu}, testInfo);
        });

    test("[TC_0205660] Validate perubahan station menu Limited Qty setelah melakukan 'Save' ketika filtering sedang berjalan",
        {tag: tags + "@positive"}, async ({branchMenu}, testInfo) => {
            await safeTest(async ({}) => {
                await branchMenu.filterCategoryBranchMenu("Limit Quantity Menu");
                await branchMenu.selectMenuCategory("Makanan Apri");
                await branchMenu.butonStation("None selected", 1);
                await branchMenu.showDropdown(2);
                await branchMenu.selectStationInDropDown("KASIR");
                await branchMenu.closeAfterSelectOrInput();
                await branchMenu.saveBranchMenu();
                await branchMenu.validationMenu("Bebek Madu Pedas Bakar", "short");
            }, {branchMenu}, testInfo);
        });

    test("[TC_0205661] Validate perubahan status menu dari Sold Out menjadi tidak Sold Out setelah melakukan 'Save' ketika filtering sedang berjalan",
        {tag: tags + "@positive"}, async ({branchMenu}, testInfo) => {
            await safeTest(async ({}) => {
                await branchMenu.selectMenuCategory("Makanan Apri");
                await branchMenu.clickFlagSoldOut(1);
                await branchMenu.saveBranchMenu();
                await branchMenu.validationMenu("Bebek Madu Pedas Bakar", "short");
            }, {branchMenu}, testInfo);
        });

    test("[TC_0205662] Validate perubahan status menu dari Tidak Sold Out menjadi Sold Out setelah melakukan 'Save' ketika filtering sedang berjalan",
        {tag: tags + "@positive"}, async ({branchMenu}, testInfo) => {
            await safeTest(async ({}) => {
                await branchMenu.selectMenuCategory("Makanan Apri");
                await branchMenu.clickFlagSoldOut(3);
                await branchMenu.clickFlagSoldOut(4);
                await branchMenu.saveBranchMenu();
                await branchMenu.validationMenu("Nasi Ayam Paha", "short");
                await branchMenu.validationMenu("Paket Happy Hour 1", "short");
            }, {branchMenu}, testInfo);
        });

    test("[TC_0205663] Validate perubahan status menu dari Limited Qty menjadi tidak Limited Qty setelah melakukan 'Save' ketika filtering sedang berjalan",
        {tag: tags + "@positive"}, async ({branchMenu}, testInfo) => {
            await safeTest(async ({}) => {
                await branchMenu.selectMenuCategory("Makanan Apri");
                await branchMenu.butonShowQty("2", 1);
                await branchMenu.inputQty("0");
                await branchMenu.saveBranchMenu();
                await branchMenu.selectMenuCategory("Makanan Apri");
                await branchMenu.validationMenu("Bebek Madu Pedas Bakar", "short");
            }, {branchMenu}, testInfo);
        });

    test("[TC_0205664] Validate perubahan status menu dari Tidak Limited Qty menjadi Limited Qty setelah melakukan 'Save' ketika filtering sedang berjalan",
        {tag: tags + "@positive"}, async ({branchMenu}, testInfo) => {
            await safeTest(async ({}) => {
                await branchMenu.selectMenuCategory("Makanan Apri");
                await branchMenu.butonShowQty("0", 1);
                await branchMenu.inputQty("10");
                await branchMenu.saveBranchMenu();
                await branchMenu.selectMenuCategory("Makanan Apri");
                await branchMenu.validationMenu("Nasi Ayam Paha", "short");
            }, {branchMenu}, testInfo);
        });

    test("[TC_0205665] Validate perubahan status menu dari Limited Qty menjadi Sold Out setelah melakukan 'Save' ketika filtering sedang berjalan",
        {tag: tags + "@positive"}, async ({branchMenu}, testInfo) => {
            await safeTest(async ({}) => {
                await branchMenu.selectMenuCategory("Anggur");
                await branchMenu.clickFlagSoldOut(7);
                await branchMenu.saveBranchMenu();
                await branchMenu.selectMenuCategory("Anggur");
            }, {branchMenu}, testInfo);
        });

    test("[TC_0205666] Validate perubahan status menu dari Sold Out menjadi Limited Qty setelah melakukan 'Save' ketika filtering sedang berjalan",
        {tag: tags + "@positive"}, async ({branchMenu}, testInfo) => {
            await safeTest(async ({}) => {
                await branchMenu.selectMenuCategory("Makanan Apri");
                await branchMenu.butonShowQty("0", 1);
                await branchMenu.inputQty("10");
                await branchMenu.saveBranchMenu();
                await branchMenu.selectMenuCategory("Makanan Apri");
            }, {branchMenu}, testInfo);
        });

    test("[TC_0205667] Validate fungsi search button pada halaman branch menu ketika filtering denga Opsi All diaktifkan  dan search menu Sold Out",
        {tag: tags + "@positive"}, async ({branchMenu}, testInfo) => {
            await safeTest(async ({}) => {
                await branchMenu.selectMenuCategory("Anggur");
                await branchMenu.searchMenuInCategory("Anggur Merah");
                await branchMenu.validationMenu("[21+] Anggur Merah Kawa Kawa","short");
                await branchMenu.validationMenu("[21+] Anggur Merah OT 620ml","short");
                await branchMenu.validationMenu("[21+] Anggur Merah OT Gold 620","short");
            }, {branchMenu}, testInfo);
        });

    test("[TC_0205668] Validate fungsi search button pada halaman branch menu ketika filtering denga Opsi All diaktifkan  dan search menu Limited Qty",
        {tag: tags + "@positive"}, async ({branchMenu}, testInfo) => {
            await safeTest(async ({}) => {
                await branchMenu.selectMenuCategory("Anggur");
                await branchMenu.searchMenuInCategory("Sababay");
                await branchMenu.validationMenu("[21+] Sababay Black Velvet 750","short");
                await branchMenu.validationMenu("[21+] Sababay Ludisia 750ml","short");
                await branchMenu.validationMenu("[21+] Sababay Mistelle 750ml","short");
            }, {branchMenu}, testInfo);
        });

    test("[TC_0205669] Validate fungsi search button pada halaman branch menu ketika filtering denga Opsi All diaktifkan  dan search menu tanpa Sold Out dan Limited Qty",
        {tag: tags + "@positive"}, async ({branchMenu}, testInfo) => {
            await safeTest(async ({}) => {
                await branchMenu.selectMenuCategory("AT MENU CATEGORY");
                await branchMenu.searchMenuInCategory("AT MENU BIASA BAKAR");
                await branchMenu.validationMenu("AT MENU BIASA BAKAR","short");
            }, {branchMenu}, testInfo);
        });

    test("[TC_0205670] Validate fungsi search button pada halaman branch menu ketika filtering dengan Opsi Sold Out diaktifkan dan search menu sold out",
        {tag: tags + "@positive"}, async ({branchMenu}, testInfo) => {
            await safeTest(async ({}) => {
                await branchMenu.filterCategoryBranchMenu("Sold Out Menu");
                await branchMenu.selectMenuCategory("Makanan Apri");
                await branchMenu.searchMenuInCategory("Paket Happy Hour 1");
                await branchMenu.validationMenu("Paket Happy Hour 1","short");
            }, {branchMenu}, testInfo);
        });

    test("[TC_0205671] Validate fungsi search button pada halaman branch menu ketika filtering dengan Opsi Sold Out diaktifkan dan search menu tidak sold out",
        {tag: tags + "@positive"}, async ({branchMenu}, testInfo) => {
            await safeTest(async ({}) => {
                await branchMenu.selectMenuCategory("Makanan Apri");
                await branchMenu.clickFlagSoldOut(1);
                await branchMenu.saveBranchMenu();
                await branchMenu.searchMenuInCategory("Bebek Madu Pedas Bakar");
                await branchMenu.validationMenu("Bebek Madu Pedas Bakar","short");
            }, {branchMenu}, testInfo);
        });

});