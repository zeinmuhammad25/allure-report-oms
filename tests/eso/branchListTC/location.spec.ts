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
            let deliveryAddressPage = new DeliveryAddressPage(page);
            let saveAddressPage = new SaveAddressPage(page);
            let searchAddressPage = new SearchAddressPage(page);

            await deliveryAddressPage.editAddress('home');
            await saveAddressPage.changePoint();
            await searchAddressPage.searchAddress('Gading serpong');
            await searchAddressPage.selectAddressToAdd();
            await saveAddressPage.inputAddressInfoField('Another Home');
            await saveAddressPage.saveAddress();
        })

    test("Verify user can display that changing the office address location has been successfully saved",
        {tag: tag + '@positive'}, async ({page}) => {
            let deliveryAddressPage = new DeliveryAddressPage(page);
            let saveAddressPage = new SaveAddressPage(page);
            let searchAddressPage = new SearchAddressPage(page);

            await deliveryAddressPage.editAddress('office');
            await saveAddressPage.changePoint();
            await searchAddressPage.searchAddress('Jakarta pusat');
            await searchAddressPage.selectAddressToAdd();
            await saveAddressPage.inputAddressInfoField('Another Office');
            await saveAddressPage.saveAddress();
        })

    test("Verify user can display that changing the other address location has been successfully saved",
        {tag: tag + '@positive'}, async ({page}) => {

            let deliveryAddressPage = new DeliveryAddressPage(page);
            let saveAddressPage = new SaveAddressPage(page);
            let searchAddressPage = new SearchAddressPage(page);

            await deliveryAddressPage.editAddress(label);
            await saveAddressPage.changePoint();
            await searchAddressPage.searchAddress('Pamulang');
            await searchAddressPage.selectAddressToAdd();
            await saveAddressPage.inputAddressInfoField('My Other Place');
            await saveAddressPage.saveAddress();
        })

    test("Verify user can display that the home address has been successfully deleted",
        {tag: tag + '@negative'}, async ({page}) => {
            let deliveryAddressPage = new DeliveryAddressPage(page);
            await deliveryAddressPage.deleteAddress('home');
            await deliveryAddressPage.confirmDelete();
        })

    test("Verify user can display that the office address has been successfully deleted",
        {tag: tag + '@negative'}, async ({page}) => {
            let deliveryAddressPage = new DeliveryAddressPage(page);
            await deliveryAddressPage.deleteAddress('office');
            await deliveryAddressPage.confirmDelete();
        })

    test("Verify user can display that the other address has been successfully deleted",
        {tag: tag + '@negative'}, async ({page}) => {
            let deliveryAddressPage = new DeliveryAddressPage(page);
            await deliveryAddressPage.deleteAddress(label);
            await deliveryAddressPage.confirmDelete();
        })

    test("Verify user can display a popup to activate GPS",
        {tag: tag + '@negative'}, async ({page}) => {
            // TODO :
            //  Buka halaman branch list dengan kondisi tidak mengaktifkan gps
            //  1. Verifikasi muncul popup untuk mengkatifkan gps
            //  Notes: cannot simulate click allow location
        })
})