import {test} from "@playwright/test";
import ReservationPage from "../../../src/modules/eso/pages/reservation/reservation.page";
import {Salutation} from "../../../src/modules/eso/objects/salutation";

test.describe.serial("Reservation Test", () => {
    const tag = '@smokeTest @eso @reservation @bookingReservation '
    let reservationPage: ReservationPage;

    test.beforeEach(async ({page}) => {
        reservationPage = new ReservationPage(page);
        await reservationPage.navigateHere();
        await reservationPage.setPax(2);
        await reservationPage.setDay(2);
        await reservationPage.setTime(0);
    })

    test("Verify user successfully made a reservation with 1 pax",
        {tag: tag + '@positive'}, async ({page}) => {
            await reservationPage.setPax(1);
            await reservationPage.setDay(0);
            await reservationPage.setTime(0);
            await reservationPage.confirmSchedule();
            await reservationPage.inputSalutation(Salutation.Mr);
            await reservationPage.inputName('Tester');
            await reservationPage.inputEmail('tester@qa.com');
            await reservationPage.inputPhoneNumber('081111111111');
            await reservationPage.inputPurpose('Birthday Party');
            await reservationPage.confirmFillData();
            await reservationPage.confirmReservation();

        })

    test("Verify user successfully made a reservation with 2 pax",
        {tag: tag + '@positive'}, async ({page}) => {
            await reservationPage.setDay(0);
            await reservationPage.setTime(0);
            await reservationPage.confirmSchedule();
            await reservationPage.inputSalutation(Salutation.Mr);
            await reservationPage.inputName('Tester');
            await reservationPage.inputEmail('tester@qa.com');
            await reservationPage.inputPhoneNumber('081111111111');
            await reservationPage.inputPurpose('Birthday Party');
            await reservationPage.confirmFillData();
            await reservationPage.confirmReservation();
        })

    test("Verify user successfully made a reservation with 10 pax",
        {tag: tag + '@positive'}, async ({page}) => {
            await reservationPage.setPax(10);
            await reservationPage.setDay(0);
            await reservationPage.setTime(0);
            await reservationPage.confirmSchedule();
            await reservationPage.inputSalutation(Salutation.Mr);
            await reservationPage.inputName('Tester');
            await reservationPage.inputEmail('tester@qa.com');
            await reservationPage.inputPhoneNumber('081111111111');
            await reservationPage.inputPurpose('Birthday Party');
            await reservationPage.confirmFillData();
            await reservationPage.confirmReservation();
        })

    test("Verify user successfully made a reservation with 20 pax",
        {tag: tag + '@positive'}, async ({page}) => {
            await reservationPage.setPax(20);
            await reservationPage.setDay(0);
            await reservationPage.setTime(0);
            await reservationPage.confirmSchedule();
            await reservationPage.inputSalutation(Salutation.Mr);
            await reservationPage.inputName('Tester');
            await reservationPage.inputEmail('tester@qa.com');
            await reservationPage.inputPhoneNumber('081111111111');
            await reservationPage.inputPurpose('Birthday Party');
            await reservationPage.confirmFillData();
            await reservationPage.confirmReservation();
        })

    test("Verify user unable to reserve for more than 20 pax",
        {tag: tag + '@negative'}, async ({page}) => {
            await reservationPage.setPax(21, true);
        })

    test("Verify user successfully made a reservation for today",
        {tag: tag + '@positive'}, async ({page}) => {
            await reservationPage.setDay(0);
            await reservationPage.setTime(0);
            await reservationPage.confirmSchedule();
            await reservationPage.inputSalutation(Salutation.Mr);
            await reservationPage.inputName('Tester');
            await reservationPage.inputEmail('tester@qa.com');
            await reservationPage.inputPhoneNumber('081111111111');
            await reservationPage.inputPurpose('Birthday Party');
            await reservationPage.confirmFillData();
            await reservationPage.confirmReservation();

        })

    test("Verify user successfully made a reservation for tomorrow",
        {tag: tag + '@positive'}, async ({page}) => {
            await reservationPage.setDay(1);
            await reservationPage.setTime(0);
            await reservationPage.confirmSchedule();
            await reservationPage.inputSalutation(Salutation.Mr);
            await reservationPage.inputName('Tester');
            await reservationPage.inputEmail('tester@qa.com');
            await reservationPage.inputPhoneNumber('081111111111');
            await reservationPage.inputPurpose('Birthday Party');
            await reservationPage.confirmFillData();
            await reservationPage.confirmReservation();
        })

    test("Verify user successfully made a reservation for the day after tomorrow",
        {tag: tag + '@positive'}, async ({page}) => {
            await reservationPage.confirmSchedule();
            await reservationPage.inputSalutation(Salutation.Mr);
            await reservationPage.inputName('Tester');
            await reservationPage.inputEmail('tester@qa.com');
            await reservationPage.inputPhoneNumber('081111111111');
            await reservationPage.inputPurpose('Birthday Party');
            await reservationPage.confirmFillData();
            await reservationPage.confirmReservation();
        })

    test("Verify user cannot select a date for yesterday",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO :
            // Reservation for yesterday (Cannot select a date for yesterday)
            //  2. Pilih tanggal kemarin

        })

    test("Verify user successfully made a reservation for the closest available time",
        {tag: tag + '@positive'}, async ({page}) => {
            await reservationPage.confirmSchedule();
            await reservationPage.inputSalutation(Salutation.Mr);
            await reservationPage.inputName('Tester');
            await reservationPage.inputEmail('tester@qa.com');
            await reservationPage.inputPhoneNumber('081111111111');
            await reservationPage.inputPurpose('Birthday Party');
            await reservationPage.confirmFillData();
            await reservationPage.confirmReservation();
        })

    test("Verify user successfully made a reservation for 2 hours from now",
        {tag: tag + '@positive'}, async ({page}) => {
            await reservationPage.setTime(120);
            await reservationPage.confirmSchedule();
            await reservationPage.inputSalutation(Salutation.Mr);
            await reservationPage.inputName('Tester');
            await reservationPage.inputEmail('tester@qa.com');
            await reservationPage.inputPhoneNumber('081111111111');
            await reservationPage.inputPurpose('Birthday Party');
            await reservationPage.confirmFillData();
            await reservationPage.confirmReservation();
        })

    test("Verify user successfully made a reservation for the latest available time",
        {tag: tag + '@positive'}, async ({page}) => {
            await reservationPage.setTime(-1);
            await reservationPage.confirmSchedule();
            await reservationPage.inputSalutation(Salutation.Mr);
            await reservationPage.inputName('Tester');
            await reservationPage.inputEmail('tester@qa.com');
            await reservationPage.inputPhoneNumber('081111111111');
            await reservationPage.inputPurpose('Birthday Party');
            await reservationPage.confirmFillData();
            await reservationPage.confirmReservation();
        })

    test("Verify user cannot select a time that has already passed",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO :
            // Reservation for a past time (Cannot select a past time)
            //  4. Pilih waktu yang sudah terlewat dari waktu sekarang
        })

    test("Verify user successfully made a reservation with the title Mr.",
        {tag: tag + '@positive'}, async ({page}) => {
            await reservationPage.confirmSchedule();
            await reservationPage.inputSalutation(Salutation.Mr);
            await reservationPage.inputName('Tester');
            await reservationPage.inputEmail('tester@qa.com');
            await reservationPage.inputPhoneNumber('081111111111');
            await reservationPage.inputPurpose('Birthday Party');
            await reservationPage.confirmFillData();
            await reservationPage.confirmReservation();
        })

    test("Verify user successfully made a reservation with the title Mrs.",
        {tag: tag + '@positive'}, async ({page}) => {
            await reservationPage.confirmSchedule();
            await reservationPage.inputSalutation(Salutation.Mrs);
            await reservationPage.inputName('Tester');
            await reservationPage.inputEmail('tester@qa.com');
            await reservationPage.inputPhoneNumber('081111111111');
            await reservationPage.inputPurpose('Birthday Party');
            await reservationPage.confirmFillData();
            await reservationPage.confirmReservation();
        })

    test("Verify user successfully made a reservation with the title Miss.",
        {tag: tag + '@positive'}, async ({page}) => {
            await reservationPage.confirmSchedule();
            await reservationPage.inputSalutation(Salutation.Ms);
            await reservationPage.inputName('Tester');
            await reservationPage.inputEmail('tester@qa.com');
            await reservationPage.inputPhoneNumber('081111111111');
            await reservationPage.inputPurpose('Birthday Party');
            await reservationPage.confirmFillData();
            await reservationPage.confirmReservation();
        })

    test("Verify user successfully made a reservation using alphabetic characters in the name",
        {tag: tag + '@positive'}, async ({page}) => {
            await reservationPage.confirmSchedule();
            await reservationPage.inputSalutation(Salutation.Mr);
            await reservationPage.inputName('Nadin SF');
            await reservationPage.inputEmail('tester@qa.com');
            await reservationPage.inputPhoneNumber('081111111111');
            await reservationPage.inputPurpose('Birthday Party');
            await reservationPage.confirmFillData();
            await reservationPage.confirmReservation();
        })

    test("Verify user successfully made a reservation using alphanumeric and special characters in the name",
        {tag: tag + '@positive'}, async ({page}) => {
            await reservationPage.confirmSchedule();
            await reservationPage.inputSalutation(Salutation.Mr);
            await reservationPage.inputName('Nadin SF123@');
            await reservationPage.inputEmail('tester@qa.com');
            await reservationPage.inputPhoneNumber('081111111111');
            await reservationPage.inputPurpose('Birthday Party');
            await reservationPage.confirmFillData();
            await reservationPage.confirmReservation();
        })

    test("Verify user button is disabled because the name contains an emoji",
        {tag: tag + '@negative'}, async ({page}) => {
            await reservationPage.confirmSchedule();
            await reservationPage.inputSalutation(Salutation.Mr);
            await reservationPage.inputName('SF❤️❤️❤️');
            await reservationPage.inputEmail('tester@qa.com');
            await reservationPage.inputPhoneNumber('081111111111');
            await reservationPage.inputPurpose('Birthday Party');
            await reservationPage.confirmFillData();
            await reservationPage.confirmReservation();
        })

    test("Verify user successfully made a reservation with a valid email",
        {tag: tag + '@positive'}, async ({page}) => {
            await reservationPage.confirmSchedule();
            await reservationPage.inputSalutation(Salutation.Mr);
            await reservationPage.inputName('Nadin');
            await reservationPage.inputEmail('safruddinsb99@gmail.com');
            await reservationPage.inputPhoneNumber('081111111111');
            await reservationPage.inputPurpose('Birthday Party');
            await reservationPage.confirmFillData();
            await reservationPage.confirmReservation();
        })

    test("Verify user email validation fails with an invalid email",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO :
            // Reservation with an invalid email (Email validation fails with an invalid email)
            //  6. Pilih titel Tn
            //  7. Inputkan nama ""Nadin""
            //  8. Inputkan email valid ex. safruddinsb99@com
            //  9. Inputkan Nomor Ponsel valid
            //  10. Pilih tujuan reservasi yang tersedia
            //  11. Klik Lanjutkan
            //  12. Klik Reservasi Sekarang
            await reservationPage.confirmSchedule();
            await reservationPage.inputSalutation(Salutation.Mr);
            await reservationPage.inputName('Nadin');
            await reservationPage.inputEmail('safruddinsb99@com');
            await reservationPage.inputPhoneNumber('081111111111');
            await reservationPage.inputPurpose('Birthday Party');
            await reservationPage.confirmFillData();
            await reservationPage.confirmReservation();
        })

    test("Verify user successfully made a reservation with a phone number starting with 08 and 13 characters",
        {tag: tag + '@positive'}, async ({page}) => {
            await reservationPage.confirmSchedule();
            await reservationPage.inputSalutation(Salutation.Mr);
            await reservationPage.inputName('Nadin');
            await reservationPage.inputEmail('tester@mail.com');
            await reservationPage.inputPhoneNumber('0812-8888-98282');
            await reservationPage.inputPurpose('Birthday Party');
            await reservationPage.confirmFillData();
            await reservationPage.confirmReservation();
        })

    test("Verify user successfully made a reservation with a phone number starting with 628 and 13 characters",
        {tag: tag + '@positive'}, async ({page}) => {
            await reservationPage.confirmSchedule();
            await reservationPage.inputSalutation(Salutation.Mr);
            await reservationPage.inputName('Nadin');
            await reservationPage.inputEmail('tester@mail.com');
            await reservationPage.inputPhoneNumber('0812-8888-98282');
            await reservationPage.inputPurpose('Birthday Party');
            await reservationPage.confirmFillData();
            await reservationPage.confirmReservation();
        })

    test("Verify user phone number validation fails with an invalid number (0000-0000-0000)",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO :
            // Reservation with an invalid phone number (Phone number validation fails)
            //  6. Pilih titel Tn
            //  7. Inputkan nama ""Nadin""
            //  8. Inputkan email valid
            //  9. Inputkan Nomor Ponsel tidak valid 0000-0000-0000
            //  10. Pilih tujuan reservasi yang tersedia
            //  11. Klik Lanjutkan
            //  12. Klik Reservasi Sekarang
            await reservationPage.confirmSchedule();
            await reservationPage.inputSalutation(Salutation.Mr);
            await reservationPage.inputName('Nadin');
            await reservationPage.inputEmail('tester@mail.com');
            await reservationPage.inputPhoneNumber('0000-0000-0000');
            await reservationPage.inputPurpose('Birthday Party');
            await reservationPage.confirmFillData();
            await reservationPage.confirmReservation();
        })

    test("Verify user successfully made a reservation for a birthday event",
        {tag: tag + '@positive'}, async ({page}) => {
            await reservationPage.confirmSchedule();
            await reservationPage.inputSalutation(Salutation.Mr);
            await reservationPage.inputName('Nadin');
            await reservationPage.inputEmail('tester@mail.com');
            await reservationPage.inputPhoneNumber('0812-8888-98282');
            await reservationPage.inputPurpose('Birthday Party');
            await reservationPage.confirmFillData();
            await reservationPage.confirmReservation();
        })

    test("Verify user successfully made a reservation for a greeting event",
        {tag: tag + '@positive'}, async ({page}) => {
            await reservationPage.confirmSchedule();
            await reservationPage.inputSalutation(Salutation.Mr);
            await reservationPage.inputName('Nadin');
            await reservationPage.inputEmail('tester@mail.com');
            await reservationPage.inputPhoneNumber('0812-8888-98282');
            await reservationPage.inputPurpose('Welcome/Farewell');
            await reservationPage.confirmFillData();
            await reservationPage.confirmReservation();
        })

    test("Verify user successfully made a reservation for a reunion event",
        {tag: tag + '@positive'}, async ({page}) => {
            await reservationPage.confirmSchedule();
            await reservationPage.inputSalutation(Salutation.Mr);
            await reservationPage.inputName('Nadin');
            await reservationPage.inputEmail('tester@mail.com');
            await reservationPage.inputPhoneNumber('0812-8888-98282');
            await reservationPage.inputPurpose('Reunion');
            await reservationPage.confirmFillData();
            await reservationPage.confirmReservation();
        })

    test("Verify user successfully made a reservation with additional notes",
        {tag: tag + '@positive'}, async ({page}) => {
            await reservationPage.confirmSchedule();
            await reservationPage.inputSalutation(Salutation.Mr);
            await reservationPage.inputName('Nadin');
            await reservationPage.inputEmail('tester@mail.com');
            await reservationPage.inputPhoneNumber('0812-8888-98282');
            await reservationPage.inputPurpose('Couple Date');
            await reservationPage.inputNotes('Meja Pojok');
            await reservationPage.confirmFillData();
            await reservationPage.confirmReservation();
        })

    test("Verify user successfully made a reservation without adding any notes",
        {tag: tag + '@positive'}, async ({page}) => {
            await reservationPage.confirmSchedule();
            await reservationPage.inputSalutation(Salutation.Mr);
            await reservationPage.inputName('Nadin');
            await reservationPage.inputEmail('tester@mail.com');
            await reservationPage.inputPhoneNumber('0812-8888-98282');
            await reservationPage.inputPurpose('Couple Date');
            await reservationPage.confirmFillData();
            await reservationPage.confirmReservation();
        })

    test("Verify user validation fails when entering notes with an emoji",
        {tag: tag + '@negative'}, async ({page}) => {
            await reservationPage.confirmSchedule();
            await reservationPage.confirmSchedule();
            await reservationPage.inputSalutation(Salutation.Mr);
            await reservationPage.inputName('Nadin');
            await reservationPage.inputEmail('tester@mail.com');
            await reservationPage.inputPhoneNumber('0812-8888-98282');
            await reservationPage.inputPurpose('Couple Date');
            await reservationPage.inputNotes('❤️❤️❤️🤣');
            await reservationPage.confirmFillData();
            await reservationPage.confirmReservation();
        })

})














