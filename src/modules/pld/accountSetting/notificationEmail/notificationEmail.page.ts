import Element from "../../../../base/objects/Element";
import NotificationEmailScenario from "./notificationEmail.scenario";
import NotificationEmailLocator from "./notificationEmail.locator";
import BasePosLitePage from "../../base-pos-lite-page";


export default class NotificationEmailPage extends BasePosLitePage implements NotificationEmailScenario {


    pageUrl = (): string => this.urls.get.accountSetting.notificationEmailUrl;


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