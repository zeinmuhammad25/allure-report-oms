import BasePosLitePage from "../../base-pos-lite-page";
import Element from "../../../../base/objects/Element";
import OnlinePaymentScenario from "./onlinePayment.scenario";
import OnlinePaymentLocator from "./onlinePayment.locator";
import SidebarLocator from "../sidebar.locator";
import {Keyboard} from "../../../../base/constants/Keyboard";

export default class OnlinePaymentPage extends BasePosLitePage implements OnlinePaymentScenario {
    private branch = 'Anugerah Food'
    private transactionNumber = '1010101010'
    private paymentMethod = 'QRIS'
    private paymentSource = 'POS'

    pageUrl = (): string => this.urls.get.dashboard.onlinePaymentUrl;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(OnlinePaymentLocator.dataReadGuideButton),
            Element.ofSelector(OnlinePaymentLocator.branchDropdown(this.branch)),
            Element.ofSelector(OnlinePaymentLocator.onlinePaymentFilter),
            Element.ofSelector(OnlinePaymentLocator.onlinePaymentDayTab),
            Element.ofSelector(OnlinePaymentLocator.onlinePaymentWeekTab),
            Element.ofSelector(OnlinePaymentLocator.onlinePaymentDateField),
            Element.ofSelector(OnlinePaymentLocator.onlinePaymentDownload),
        ];
    }

    async validateSummaryPaymentDataOnDashboardOnlinePayment(): Promise<void> {
        await this.navigateToOnlinePayment()
        await this.fillFilterAndShow()
        await this.expectVisible(OnlinePaymentLocator.summaryCard)
    }

    async validateDetailPaymentDataOnDashboardOnlinePayment(): Promise<void> {
        await this.navigateToOnlinePayment()
        await this.fillFilterAndShow()
        await this.expectVisible(OnlinePaymentLocator.detailCard)
    }

    async validateDailyPaymentDataOnDashboardOnlinePayment(): Promise<void> {
        await this.navigateToOnlinePayment()
        await this.fillFilterAndShow()
        await this.expectVisible(OnlinePaymentLocator.dailyCard)
    }

    async validateDownloadDataOnDashboardOnlinePayment(): Promise<void> {
        await this.navigateToOnlinePayment()
        await this.fillFilterAndShow()
        await this.downloadOnlinePayment()
    }


    private async navigateToOnlinePayment() {
        // await this.expectVisible(SidebarLocator.sidebarOnlinePayment);
        await this.click(SidebarLocator.sidebarOnlinePayment);
    }

    private async fillFilterAndShow() {
        await this.checkGuide()
        await this.inputBranch()
        await this.inputFilterDialog()
        await this.inputTransactionNumber()
    }

    private async checkGuide() {
        await this.expectVisible(OnlinePaymentLocator.guideDialogButton);
        await this.click(OnlinePaymentLocator.guideDialogButton);
        await this.expectVisible(OnlinePaymentLocator.guideDialog);
        await this.expectVisible(OnlinePaymentLocator.guideDialogCloseButton);
        await this.click(OnlinePaymentLocator.guideDialogCloseButton);
    }

    private async inputBranch() {
        await this.expectVisible(OnlinePaymentLocator.branchDropdown(this.branch));
        await this.click(OnlinePaymentLocator.branchDropdown(this.branch));
        await this.expectVisible(OnlinePaymentLocator.filterOptionItem(this.branch));
    }

    private async inputFilterDialog() {
        await this.expectVisible(OnlinePaymentLocator.onlinePaymentFilter)
        await this.click(OnlinePaymentLocator.onlinePaymentFilter)
        await this.inputPaymentMethod()
        await this.inputPaymentSource()
        await this.inputPaymentStatus()
        await this.expectVisible(OnlinePaymentLocator.filterReset)
        await this.click(OnlinePaymentLocator.filterReset)
        await this.expectVisible(OnlinePaymentLocator.filterApplyButton)
        await this.click(OnlinePaymentLocator.filterApplyButton)
    }

    private async inputTransactionNumber() {
        await this.expectVisible(OnlinePaymentLocator.onlinePaymentTransNo);
        await this.fill(OnlinePaymentLocator.onlinePaymentTransNo, this.transactionNumber);
        await this.pressKeyboard(Keyboard.ENTER);
        await this.fill(OnlinePaymentLocator.onlinePaymentTransNo, '');
        await this.pressKeyboard(Keyboard.ENTER);
    }

    private async inputPaymentMethod() {
        await this.expectVisible(OnlinePaymentLocator.filterPaymentMethod)
        await this.click(OnlinePaymentLocator.filterPaymentMethod)
        await this.expectVisible(OnlinePaymentLocator.filterOptionItem(this.paymentMethod))
        await this.click(OnlinePaymentLocator.filterOptionItem(this.paymentMethod))
    }

    private async inputPaymentSource() {
        await this.expectVisible(OnlinePaymentLocator.filterPaymentSource)
        await this.click(OnlinePaymentLocator.filterPaymentSource)
        await this.expectVisible(OnlinePaymentLocator.filterOptionItem(this.paymentSource))
        await this.click(OnlinePaymentLocator.filterOptionItem(this.paymentSource))
    }

    private async inputPaymentStatus() {
        await this.expectVisible(OnlinePaymentLocator.filterStatusFinish)
        await this.click(OnlinePaymentLocator.filterStatusFinish)
        await this.expectVisible(OnlinePaymentLocator.filterStatusPending)
        await this.click(OnlinePaymentLocator.filterStatusPending)
        await this.expectVisible(OnlinePaymentLocator.filterStatusExpired)
        await this.click(OnlinePaymentLocator.filterStatusExpired)
    }

    private async downloadOnlinePayment() {
        await this.click(OnlinePaymentLocator.onlinePaymentDownload)
        await this.expectVisible(OnlinePaymentLocator.onlinePaymentConfirmDownload)
        await this.click(OnlinePaymentLocator.onlinePaymentConfirmDownload)
        await this.expectDownloadFile('DASHBOARD_PEMBAYARAN_ONLINE', 'xlsx')
    }
}