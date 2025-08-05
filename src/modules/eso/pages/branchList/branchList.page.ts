import BaseEsoPage from "../../base/base-eso-page";
import BranchListScenario from "./branchList.scenario";
import BranchListLocator from "./branchList.locator";
import Element from "../../../../base/objects/Element";
import {Language} from "../../objects/language";
import ModePage from "../mode/mode.page";
import DeliveryAddressPage from "../location/deliveryAddress/deliveryAddress.page";
import HistoryPage from "../history/history.page";

export default class BranchListPage extends BaseEsoPage implements BranchListScenario {

    pageUrl = (): string => this.urls.get.branchList;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(BranchListLocator.languageButton),
            Element.ofSelector(BranchListLocator.historyButton),
            Element.ofSelector(BranchListLocator.companyInfo),
            Element.ofSelector(BranchListLocator.locationSection),
            Element.ofSelector(BranchListLocator.inputField),
        ]
    }

    async gotoLocationPage(): Promise<void> {
        await this.expectVisible(BranchListLocator.locationSection)
        await this.clickAndExpectGotoPage(BranchListLocator.locationSection, DeliveryAddressPage)
    }

    async changeLanguage(language: Language): Promise<void> {
        await this.setLanguage(language)
        await this.expectLanguage(language)
    }

    async searchBranch(branchName: string): Promise<void> {
        await this.expectVisible(BranchListLocator.inputField);
        await this.fill(BranchListLocator.inputField, branchName);
        await this.expectVisible(BranchListLocator.getBranchByName(branchName));
    }

    async searchEmptyBranch(branchName: string): Promise<void> {
        await this.expectVisible(BranchListLocator.inputField);
        await this.fill(BranchListLocator.inputField, branchName);
        await this.expectInvisible(BranchListLocator.getBranchByName(branchName));
    }

    async hasNearbyOutlet(): Promise<void> {
        await this.expectTextVisible('Find Outlets Around You');
    }

    async hasOutReachOutlet(): Promise<void> {
        await this.setGeoLocation(-68.169749, 92.133269)
        await this.expectTextVisible('Outlet is Out of Reach');
    }

    async selectBranch(branchName: string): Promise<void> {
        await this.expectVisible(BranchListLocator.getBranchByName(branchName));
        await this.clickAndExpectGotoPage(BranchListLocator.getBranchByName(branchName), ModePage);
    }

    async gotoHistoryPage(): Promise<void> {
        await this.expectVisible(BranchListLocator.historyButton);
        await this.clickAndExpectGotoPage(BranchListLocator.historyButton, HistoryPage);
        await Promise.all([
            this.waitForResponse('/v1/user/order'),
            this.waitForResponse('/v1/user/reservation')
        ])
    }

    private async setLanguage(language: Language) {
        await this.expectVisible(BranchListLocator.languageButton);
        await this.click(BranchListLocator.languageButton);

        if (language === Language.Indonesia) {
            await this.expectVisible(BranchListLocator.idLanguage);
            await this.click(BranchListLocator.idLanguage);
        } else {
            await this.expectVisible(BranchListLocator.enLanguage);
            await this.click(BranchListLocator.enLanguage);
        }
    }

    private async expectLanguage(language: Language) {
        if (language === Language.Indonesia) {
            await this.expectVisible(BranchListLocator.languageIconButton('id'))
        } else {
            await this.expectVisible(BranchListLocator.languageIconButton('en'))
        }
    }
}