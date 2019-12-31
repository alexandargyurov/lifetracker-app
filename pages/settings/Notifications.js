import React from "react";
import { View, Switch } from "react-native";
import { AsyncStorage } from "react-native";
import Header from "../../components/Header";
import {
  Screen,
  MedHeading,
  SmallText,
  LineSeperator
} from "../../css/designSystem";

import Notification from "../../Notification";

export default class NotificationScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.notification = new Notification()
    this.state = {
      notifications: true
    };
  }

  async componentDidMount() {
    const value = await AsyncStorage.getItem("@notifications");
    if (value == "true") {
      this.setState({ notifications: true });
    } else if (value == "false") {
      this.setState({ notifications: false });
    } else {
      this.setState({ notifications: true });
    }
  }

  async setValue(value) {
    try {
      await AsyncStorage.setItem("@notifications", String(value));
      this.setState({ notifications: value });
    } catch (error) {
      Alert.alert(
        "Error",
        "There was an error updating that. Please send an email if it keeps happening",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  }

  render() {
    return (
      <Screen>
        <Header title="Notifications" backButton />
        <MedHeading style={{ textAlign: "left", margin: 10 }}>
          Reminder
        </MedHeading>

        <View style={{ flexDirection: "row", display: "flex", width: "100%" }}>
          <SmallText style={{ margin: 10, width: "65%" }}>
            Get daily reminders to write down how your day went.
          </SmallText>
          <Switch
            style={{ padding: 10, alignSelf: "center" }}
            value={this.state.notifications}
            onValueChange={v => {
              this.setValue(v);
            }}
          />
        </View>

        <LineSeperator />
      </Screen>
    );
  }
}
