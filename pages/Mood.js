import React from "react";
import { StyleSheet, View } from "react-native";
import { Screen } from "../css/designSystem";

import Header from "../components/Header";
import SliderView from "../components/SliderView";

export default class MoodScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      value: 0.5,
      valueText: "OK",
      switchValue: true,
      date: null
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.setState({ date: navigation.getParam("date", null) });
  }

  render() {
    return (
      <Screen>
        <Header title={"How did today go?"} backButton={true} />

        <View
          animation="fadeIn"
          style={{ flex: 1, flexDirection: "column", marginTop: "40%" }}
        >
          <SliderView selectedDate={this.state.date} />
        </View>
      </Screen>
    );
  }
}
