import {test} from "@playwright/test";
import LoginPage from "../../src/modules/pld/login/login.page";
import BranchPage from "../../src/modules/pld/accountSetting/branch/branch.page";
import PrinterPage from "../../src/modules/pld/printerSetting/printer/printer.page";
import PrinterCreatePage from "../../src/modules/pld/printerSetting/printer/printerCreate/printerCreate.page";
import BrandPage from "../../src/modules/pld/accountSetting/brand/brand.page";
import DashboardPage from "../../src/modules/pld/dashboard/dashboard.page";
import ProfilePage from "../../src/modules/pld/profile/profile.page";
import CompanyPage from "../../src/modules/pld/accountSetting/company/company.page";
import GenerateOTPPage from "../../src/modules/pld/accountSetting/generateOTP/generateOTP.page";
import NotificationEmailPage from "../../src/modules/pld/accountSetting/notificationEmail/notificationEmail.page";
import PaymentMethodPage from "../../src/modules/pld/accountSetting/paymentMethod/paymentMethod.page";
import TableSettingPage from "../../src/modules/pld/accountSetting/tableSetting/tableSetting.page";
import AttendanceListPage from "../../src/modules/pld/attendance/attendanceList/attendanceList.page";
import EmployeeDataPage from "../../src/modules/pld/attendance/employeeData/employeeData.page";
import BookKeepingPage from "../../src/modules/pld/dashboard/bookKeeping/bookKeeping.page";
import BookkeepingCategoryPage from "../../src/modules/pld/bookkeeping/bookkeepingCategory/bookkeepingCategory.page";
import BookkeepingInputPage from "../../src/modules/pld/bookkeeping/bookkeepingInput/bookkeepingInput.page";
import BookkeepingReportPage from "../../src/modules/pld/bookkeeping/bookkeepingReport/bookkeepingReport.page";
import CategoryPage from "../../src/modules/pld/catalogue/category/category.page";
import AddRecipePage from "../../src/modules/pld/catalogue/addRecipe/addRecipe.page";
import MenuPage from "../../src/modules/pld/catalogue/menu/menu.page";
import MenuBookPage from "../../src/modules/pld/catalogue/menuBook/menuBook.page";
import MenuNotesPage from "../../src/modules/pld/catalogue/menuNotes/menuNotes.page";
import ReasonCancelPage from "../../src/modules/pld/catalogue/reasonCancel/reasonCancel.page";
import SalesModePage from "../../src/modules/pld/catalogue/salesMode/salesMode.page";
import SpecialPricePage from "../../src/modules/pld/catalogue/specialPrice/specialPrice.page";


test.describe.serial('Demo Test Case', () => {
    let loginPage: LoginPage;


    test('aaaa', {tag: '@demoTest, @accountDemo'}, async ({page}) => {
        loginPage = new LoginPage(page);
        await loginPage.navigateHere();
        await loginPage.performLoginSubs();

        await loginPage.gotoPage(DashboardPage)
            //accountSetting
            .then(page => page.gotoPage(BranchPage))
            .then(page => page.gotoPage(BrandPage))
            .then(page => page.gotoPage(PrinterPage))
            .then(page => page.gotoPage(CompanyPage))
            .then(page => page.gotoPage(PrinterCreatePage))
            .then(page => page.gotoPage(ProfilePage))
            .then(page => page.gotoPage(GenerateOTPPage))
            .then(page => page.gotoPage(NotificationEmailPage))
            .then(page => page.gotoPage(PaymentMethodPage))
            .then(page => page.gotoPage(TableSettingPage))
            //attendance
            .then(page => page.gotoPage(AttendanceListPage))
            .then(page => page.gotoPage(EmployeeDataPage))
            //bookkeeping
            .then(page => page.gotoPage(BookkeepingCategoryPage))
            .then(page => page.gotoPage(BookkeepingInputPage))
            .then(page => page.gotoPage(BookkeepingReportPage))
            .then(page => page.gotoPage(BookKeepingPage))
            .then(page => page.gotoPage(AddRecipePage))
            .then(page => page.gotoPage(CategoryPage))
            .then(page => page.gotoPage(MenuPage))
            .then(page => page.gotoPage(MenuBookPage))
            .then(page => page.gotoPage(MenuNotesPage))
            .then(page => page.gotoPage(ReasonCancelPage))
            .then(page => page.gotoPage(SalesModePage))
            .then(page => page.gotoPage(SpecialPricePage))


    });

});
