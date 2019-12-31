import * as Permissions from "expo-permissions";
import { AsyncStorage } from "react-native";
import { Notifications } from "expo";
import Constants from "expo-constants";

const localNotification = {
  title: "How did today go?",
  body:
    "Keep track of your day to day mood to see how your feeling throughout the month!", // (string) — body text of the notification.
  ios: {
    sound: true
  },
  android: {
    sound: true,
    priority: "high",
    sticky: false,
    vibrate: true
  }
};

const schedulingOptions = {
  time: new Date().setHours(19),
  repeat: "day"
};

export default class Notification {
  async checkSettings() {
    const value = await AsyncStorage.getItem("@notifications");
    if (value == "true") {
      return true;
    } else if (value == "false") {
      return false;
    } else {
      return true;
    }
  }

  async setNotification() {
    if (await this.checkSettings()) {
      await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (Constants.lisDevice && resut.status === "granted") {
        Notifications.scheduleLocalNotificationAsync(
          localNotification,
          schedulingOptions
        );
      }

      if (Constants.platform.android) {
        Notifications.scheduleLocalNotificationAsync(
          localNotification,
          schedulingOptions
        );
      }
    } else {
      Notifications.cancelAllScheduledNotificationsAsync();
    }
  }
}
