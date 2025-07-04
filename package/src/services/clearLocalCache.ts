import deleteLastSubscriptionRetryTime from "./deleteLastSubscriptionRetryTime";
import deleteLocalNotificationReads from "./deleteLocalNotificationReads";
import deleteLocalNotifications from "./deleteLocalNotificications";
import deleteLocalSubscription from "./deleteLocalSubscription";

/** Clear  all Secure Storage cached data  */
export default async function clearLocalCache() {
  /** Clear device subscription data */
  await deleteLocalSubscription();

  /** Remove Inbox component cached notification data */
  await deleteLocalNotifications();

  /* Remove notification data  opened by user on this device*/

  await deleteLocalNotificationReads();

  /** Delete last time user scheduled subscription for  future */

  await deleteLastSubscriptionRetryTime();
}
