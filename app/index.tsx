import { Text, View, StyleSheet, SafeAreaView, Button } from "react-native";

import * as Notifications from "expo-notifications";
import { getAllDestinations, getAllProperties } from "@/helpers";
import Destinations from "@/components/Destinations";
import OpenNotification from "@/components/OpenNotification";

import PropertiesListing from "@/components/ProductListing";
import { OptIn } from "@/package/src";
import user from "@/datasets/user";
import { unsubscribeToNotifications } from "@/package/dist";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
export default function Index() {
  const properties = getAllProperties();
  const destinations = getAllDestinations();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Button title="Unsubscribe" onPress={unsubscribeToNotifications} />
      <View style={styles.container}>
        <OpenNotification />
        <Destinations destinations={destinations} navigator="expo-router" />
        <OptIn
          /** Parent component style example */
          containerStyle={{
            backgroundColor: "#ecf3fe",
            borderColor: "#4285f4",
            borderWidth: 1,
          }}
          /* Current user basic identity information to be identified in Pushbase Dashboard */
          externalIdentity={user}
          title="Stay Updated"
          subtitle="Subscribe to notifications to stay informed about important updates and announcements."
          titleStyle={{}}
          subtitleStyle={{}}
          /* Primary button label. Pressing this button trigger user device subscription*/
          primaryButtonLabel="Subscribe Now"
          /* Secondary button label. Pressing this button hide banner and schedule
           * subscription request in future.
           */
          secondaryButtonLabel="Maybe Later"
          /* Primary color -  used to style primary button background color */
          primaryColor="#4285f4"
          /* Secondary color -  used to style secondary button background color */
          secondaryColor="#F1F4FF"
          /** Primary button style */
          primaryButtonStyle={{}}
          primaryButtonLabelStyle={{}}
          secondaryButtonLabelStyle={{}}
          secondaryButtonStyle={{}}
          activityIndicator="#ffffff"
          enableNotificationLabel="Missed something? Enable notifications in settings and restart the app to stay in the loop."
          enableNotificationButtonLabel="Go to Settings"
          enableNotificationContainerStyle={{}}
          enableNotificationLabelStyle={{}}
          enableNotificationButtonStyle={{}}
          enableNotificationButtonLabelStyle={{}}
          /** When user press secondary button, subscription is postponed.
           * Set number of days  app should delay to ask user for subscription again.
           * Default set  to 7 days.
           * */
          retrySubscriptionIntervalDays={7}
        />
        <PropertiesListing properties={properties} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 16,
    rowGap: 16,
  },
});
