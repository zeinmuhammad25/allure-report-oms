import BasePage from "../../../base/base-page";
import Urls from "../../../configs/urls";
import Element from "../../../base/objects/Element";
import NotificationEmailScenario from "./notificationEmail.scenario";
import NotificationEmailLocator from "./notificationEmail.locator";


export default class NotificationEmailPage extends BasePage implements NotificationEmailScenario {


    pageUrl = (): string => Urls.accbranch;

    // Real URL = https://dev7.esb.co.id/esb-core-lite/account-setting/email-recipient/index
    shouldHave(): Element[] {
        return [
            Element.ofSelector(NotificationEmailLocator.notificationEmailTab),
            Element.ofSelector(NotificationEmailLocator.addNotificationEmailButton),
            Element.ofSelector(NotificationEmailLocator.recipientEmailSearch),
            Element.ofSelector(NotificationEmailLocator.branchSearch),
            Element.ofSelector(NotificationEmailLocator.activeFeatureSearch),
            Element.ofSelector(NotificationEmailLocator.statusSearch),
            Element.ofSelector(NotificationEmailLocator.recipientEmailColumn),
            Element.ofSelector(NotificationEmailLocator.branchColumn),
            Element.ofSelector(NotificationEmailLocator.activeFeatureColumn),
            Element.ofSelector(NotificationEmailLocator.statusNameColumn),
        ];
    }


}