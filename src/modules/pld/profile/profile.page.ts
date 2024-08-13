import BasePage from "../../../../base/base-page";
import Urls from "../../../../configs/urls";
import Element from "../../../../base/objects/Element";
import ProfileScenario from "./profile.scenario";
import DashboardLocator from "../dashboard/dashboard.locator";
import ProfileLocator from "./profile.locator";


export default class ProfilePage extends BasePage implements ProfileScenario {
    private testname = "test QA1";

    pageUrl = (): string => Urls.profile;

    shouldHave(): Element[] {
        return [];
    }

    async changeUsername(): Promise<void> {
        await this.expectVisible(DashboardLocator.dropdownProfile);
        await this.click(DashboardLocator.dropdownProfile);
        await this.expectTextVisible("Profil");
        await this.click(DashboardLocator.buttonProfile);
        await this.waitForUrl(`${process.env.BASE_URL}${Urls.profile}`);
        await this.expectTextVisible("Informasi Pengguna");
        await this.click(ProfileLocator.editUsername);
        await this.clear(ProfileLocator.namaUser);
        await this.fill(ProfileLocator.namaUser, this.testname);
        await this.click(ProfileLocator.saveButton);
    }


}