import {test} from "@playwright/test";
import BranchListPage from "../../../src/modules/eso/pages/branchList/branchList.page";
import DeliveryAddressPage from "../../../src/modules/eso/pages/location/deliveryAddress/deliveryAddress.page";
import SearchAddressPage from "../../../src/modules/eso/pages/location/searchAddress/searchAddress.page";
import SaveAddressPage from "../../../src/modules/eso/pages/location/saveAddress/saveAddress.page";
import WhatsappPage from "../../../src/modules/eso/pages/login/whatsapp/whatsapp.page";

test.describe.serial("Branch List Test", () => {
    const tag = '@smokeTest @eso @branchList @location '


    const addressHome = 'BSD City';
    const addressOffice = 'Jakarta';
    const addressOther = 'Serpong';
    const label = 'Other location';
    const addressInfo = 'lantai 2';
    const name = 'Tester';
    const phoneNumber = '82111111111';

    let branchListPage: BranchListPage;

    test.beforeEach(async ({page}) => {
        branchListPage = new BranchListPage(page);
        let whatsappPage = new WhatsappPage(page);

        await whatsappPage.navigateHere();
        await whatsappPage.performLoginWhatsAppSubs();
        await branchListPage.navigateHere();
        await branchListPage.gotoLocationPage()
    })

    test("Verify user can display the selected address according to the current location",
        {tag: tag + '@positive'}, async ({page}) => {
            let deliveryAddressPage = new DeliveryAddressPage(page)
            let searchAddressPage = new SearchAddressPage(page)

            await deliveryAddressPage.gotoSearchAddress()
            await searchAddressPage.selectAddress()
        })

    test("Verify user can display several address recommendations with the keyword BSD",
        {tag: tag + '@positive'}, async ({page}) => {
            let deliveryAddressPage = new DeliveryAddressPage(page);
            let searchAddressPage = new SearchAddressPage(page);

            await deliveryAddressPage.gotoSearchAddress();
            await searchAddressPage.searchAddress('BSD');
            await searchAddressPage.hasSuggestions();
        })

    test("Verify user can display a popup indicating the address is not available",
        {tag: tag + '@negative'}, async ({page}) => {
            let deliveryAddressPage = new DeliveryAddressPage(page);
            let searchAddressPage = new SearchAddressPage(page);

            await deliveryAddressPage.gotoSearchAddress();
            await searchAddressPage.searchAddress('@aww');
            await searchAddressPage.hasEmptySuggestions();
        })

    test("Verify user can display that the home address has been successfully saved",
        {tag: tag + '@positive'}, async ({page}) => {
            let deliveryAddressPage = new DeliveryAddressPage(page);
            let searchAddressPage = new SearchAddressPage(page);
            let saveAddressPage = new SaveAddressPage(page);

            await deliveryAddressPage.addHomeAddress();
            await searchAddressPage.searchAddress(addressHome);
            await searchAddressPage.selectAddressToAdd();
            await saveAddressPage.inputAddressInfoField(addressInfo);
            await saveAddressPage.inputNameField(name);
            await saveAddressPage.inputPhoneField(phoneNumber);
            await saveAddressPage.saveAddress();
        })

    test("Verify user can display that the office address has been successfully saved",
        {tag: tag + '@positive'}, async ({page}) => {
            let deliveryAddressPage = new DeliveryAddressPage(page);
            let searchAddressPage = new SearchAddressPage(page);
            let saveAddressPage = new SaveAddressPage(page);

            await deliveryAddressPage.addOfficeAddress();
            await searchAddressPage.searchAddress(addressOffice);
            await searchAddressPage.selectAddressToAdd();
            await saveAddressPage.inputAddressInfoField(addressInfo);
            await saveAddressPage.inputNameField(name);
            await saveAddressPage.inputPhoneField(phoneNumber);
            await saveAddressPage.saveAddress();
        })

    test("Verify user can display that the other address has been successfully saved",
        {tag: tag + '@positive'}, async ({page}) => {
            let deliveryAddressPage = new DeliveryAddressPage(page);
            let searchAddressPage = new SearchAddressPage(page);
            let saveAddressPage = new SaveAddressPage(page);

            await deliveryAddressPage.addOtherAddress();
            await searchAddressPage.searchAddress(addressOther);
            await searchAddressPage.selectAddressToAdd();
            await saveAddressPage.inputLabelField(label);
            await saveAddressPage.inputAddressInfoField(addressInfo);
            await saveAddressPage.inputNameField(name);
            await saveAddressPage.inputPhoneField(phoneNumber);
            await saveAddressPage.saveAddress();
        })

    test("Verify user can display that changing the home address location has been successfully saved",
        {tag: tag + '@positive'}, async ({page}) => {
            // TODO :
            //  Ubah Lokasi Alamat Rumah (Lokasi Alamat rumah berhasil diubah)
            //  1. Klik section lokasi saat ini
            //  2. Klik icon pencil pada kolom Rumah
            //  3. Klik button ""Ubah Titik Peta""
            //  4. Input lokasi ""Gading serpong""
            //  5. Klik konfirmasi
            //  6. Input kolom detail lokasi
            //  7. Klik simpan alamat
        })

    test("Verify user can display that changing the office address location has been successfully saved",
        {tag: tag + '@positive'}, async ({page}) => {
            // TODO :
            //  Ubah Detail lokasi alamat kantor (Alamat kantor untuk detail lokasi berhasil diubah)
            //  1. Klik section lokasi saat ini
            //  2. Klik icon pencil pada kolom alamat kantor
            //  3. Klik button ""Ubah Titik Peta""
            //  4. Input lokasi ""Jakarta pusat""
            //  5. Klik konfirmasi
            //  6. Input kolom detail lokasi
            //  7. Klik simpan alamat
        })

    test("Verify user can display that changing the other address location has been successfully saved",
        {tag: tag + '@positive'}, async ({page}) => {
            // TODO :
            //  Ubah Informasi Kontak pada alamat lainnya (Berhasil mengubah informasi kontak)
            //  1. Klik section lokasi saat ini
            //  2. Klik icon pencil pada kolom alamat lainnya
            //  3. Klik button ""Ubah Titik Peta""
            //  4. Input lokasi ""Pamulang""
            //  5. Klik konfirmasi
            //  6. Input kolom detail lokasi
            //  7. Klik simpan alamat
        })

    test("Verify user can display that the home address has been successfully deleted",
        {tag: tag + '@negative'}, async ({page}) => {
            // TODO :
            //  Hapus Alamat rumah yang terdaftar (Alamat rumah berhasil dihapus
            //  1. Klik section lokasi saat ini
            //  2. Klik icon trash pada kolom alamat rumah
            //  3. Pada button pilihan "Ingin hapus alamatmu?" pilih "Hapus"
        })

    test("Verify user can display that the office address has been successfully deleted",
        {tag: tag + '@negative'}, async ({page}) => {
            // TODO :
            //  Hapus Alamat Kantor yang terdaftar (Alamat kantor berhasil dihapus)
            //  1. Klik section lokasi saat ini
            //  2. Klik icon trash pada kolom alamat kantor
            //  3. Pada button pilihan "Ingin hapus alamatmu?" pilih "Hapus"
        })

    test("Verify user can display that the other address has been successfully deleted",
        {tag: tag + '@negative'}, async ({page}) => {
            // TODO :
            //  Hapus Alamat lainnya yang terdaftar (Alamat lainnya berhasil dihapus)
            //  1. Klik section lokasi saat ini
            //  2. Klik icon trash pada kolom alamat lainnya
            //  3. Pada button pilihan ""Ingin hapus alamatmu? pilih "Hapus"
        })

    test("Verify user can display a popup to activate GPS",
        {tag: tag + '@negative'}, async ({page}) => {
            // TODO :
            //  Buka halaman branch list dengan kondisi tidak mengaktifkan gps
            //  1. Verifikasi muncul popup untuk mengkatifkan gps
        })
})









