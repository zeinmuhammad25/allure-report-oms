import {test} from "@playwright/test";
import LoginPage from "../../../src/modules/pld/login/login.page";
import PaymentPage from "../../../src/modules/pld/report/payment/payment.page";

test.describe.serial("Branch List Test", () => {
    const tag = '@smokeTest @eso @branchList @location '

    test("Should display the selected address according to the current location",
        {tag: tag + '@positive'}, async ({page}) => {
            // TODO :
            //  Pilih Lokasi Saat ini (Berhasil menerpakan lokasi saat ini sebagai lokasi)
        })

    test("Should display several address recommendations with the keyword BSD",
        {tag: tag + '@positive'}, async ({page}) => {
            // TODO :
            //  Cari Lokasi Tersedia Dengan kata kunci "BSD City" (Menampikan list lokasi terkait BSD City)
        })
    test("Should display a popup indicating the address is not available",
        {tag: tag + '@negative'}, async ({page}) => {
            // TODO :
            //  Cari Lokasi Yang Tidak Tersedia dengan kata kunci "@aww" (Memunculkan Pop Up Alamat Tidak ditemukan)
        })

    test("Should display that the home address has been successfully saved",
        {tag: tag + '@positive'}, async ({page}) => {
            // TODO :
            //  Tambahkan Alamat Rumah (Alamat Rumah Berhasil ditambahkan
        })

    test("Should display that the office address has been successfully saved",
        {tag: tag + '@positive'}, async ({page}) => {
            // TODO :
            //  Tambahkan Alamat Kantor (Alamat Kantor Berhasil ditambahkan)
        })

    test("Should display that the other address has been successfully saved",
        {tag: tag + '@positive'}, async ({page}) => {
            // TODO :
            //  Tambahkan Alamat Lainnya (Alamat lainnya berhasil ditambahkan
        })

    test("Should display that changing the home address location has been successfully saved",
        {tag: tag + '@positive'}, async ({page}) => {
            // TODO :
            //  Ubah Lokasi Alamat Rumah (Lokasi Alamat rumah berhasil diubah)
        })

    test("Should display that changing the office address location has been successfully saved",
        {tag: tag + '@positive'}, async ({page}) => {
            // TODO :
            //  Ubah Detail lokasi alamat kantor (Alamat kantor untuk detail lokasi berhasil diubah)
        })

    test("Should display that changing the other address location has been successfully saved",
        {tag: tag + '@positive'}, async ({page}) => {
            // TODO :
            //  Ubah Informasi Kontak pada alamat lainnya (Berhasil mengubah informasi kontak)
        })

    test("Should display that the home address has been successfully deleted",
        {tag: tag + '@negative'}, async ({page}) => {
            // TODO :
            //  Hapus Alamat rumah yang terdaftar (Alamat rumah berhasil dihapus
        })

    test("Should display that the office address has been successfully deleted",
        {tag: tag + '@negative'}, async ({page}) => {
            // TODO :
            //  Hapus Alamat Kantor yang terdaftar (Alamat kantor berhasil dihapus)
        })

    test("Should display that the other address has been successfully deleted",
        {tag: tag + '@negative'}, async ({page}) => {
            // TODO :
            //  Hapus Alamat lainnya yang terdaftar (Alamat lainnya berhasil dihapus)
        })

    test("Should display a popup to activate GPS",
        {tag: tag + '@negative'}, async ({page}) => {
            // TODO :
            //  Buka halaman branch list dengan kondisi tidak mengaktifkan gps
        })
})














