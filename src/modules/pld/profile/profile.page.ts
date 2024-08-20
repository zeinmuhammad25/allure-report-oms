import Urls from "../../../configs/urls";
import Element from "../../../base/objects/Element";
import ProfileScenario from "./profile.scenario";
import DashboardLocator from "../dashboard/dashboard.locator";
import ProfileLocator from "./profile.locator";
import BasePosLitePage from "../base-pos-lite-page";


export default class ProfilePage extends BasePosLitePage implements ProfileScenario {
    private testName = "test QA1";
    private testName2 = "testQA2";

    pageUrl = (): string => Urls.profile;

    shouldHave(): Element[] {
        return [];
    }

    async userNameChange(): Promise<void> {
        await this.expectVisible(DashboardLocator.dropdownProfile);
        await this.click(DashboardLocator.dropdownProfile);
        await this.expectTextVisible("Profil");
        await this.click(DashboardLocator.buttonProfile);
        await this.waitForUrl(`${process.env.BASE_URL}${Urls.profile}`);
        await this.expectTextVisible("Informasi Pengguna");
        await this.click(ProfileLocator.userNameEditButton);
        await this.expectVisible(ProfileLocator.saveButton)
        await this.click(ProfileLocator.userNameEditFieldPopup);
        await this.clear(ProfileLocator.userNameEditFieldPopup);
        await this.fill(ProfileLocator.userNameEditFieldPopup, this.testName2);
        await this.click(ProfileLocator.saveButton);
        await this.click(ProfileLocator.userNameEditButton);
        await this.expectVisible(ProfileLocator.saveButton)
        await this.click(ProfileLocator.userNameEditFieldPopup);
        await this.clear(ProfileLocator.userNameEditFieldPopup);
        await this.fill(ProfileLocator.userNameEditFieldPopup, this.testName);
        await this.click(ProfileLocator.saveButton);
        await this.expectTextVisible(this.testName);


    }

    async userNameChangeDirect(): Promise<void> {
        await this.expectVisible(DashboardLocator.dropdownProfile);
        await this.click(DashboardLocator.dropdownProfile);
        await this.expectTextVisible("Profil");
        await this.click(DashboardLocator.buttonProfile);
        await this.waitForUrl(`${process.env.BASE_URL}${Urls.profile}`);
        await this.expectTextVisible("Informasi Pengguna");
        await this.click(ProfileLocator.userNameEditButton);
        await this.expectVisible(ProfileLocator.saveButton)
        await this.click(ProfileLocator.userNameEditFieldPopup);
        await this.clear(ProfileLocator.userNameEditFieldPopup);
        await this.fill(ProfileLocator.userNameEditFieldPopup, this.testName);
        await this.click(ProfileLocator.saveButton);
    }


}