import React from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableNativeFeedback,
  TouchableOpacity
} from "react-native";

import Database from "../Database";

import { Screen, Header, HeadingMain, CardSquare } from "../css/designSystem";
import CalendarView from "../components/CalendarView";
import { Entypo } from "@expo/vector-icons";

export default class CommonScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.database = new Database();
    this.state = {
      drawerOpen: true
    };
  }

  componentDidMount() {
    this.database.fetchDatabase();
  }

  render() {
    return (
      <Screen>
        <Header>
          <Entypo
            name="menu"
            size={32}
            color="#1B4751"
            style={{ width: "20%" }}
          />
          <HeadingMain style={{ width: "60%" }}>Overview</HeadingMain>
          <Entypo
            name="menu"
            size={32}
            color="#FEF1E0"
            style={{ width: "20%" }}
          />
        </Header>

        <CalendarView navigation={this.props.navigation} />
      </Screen>
    );
  }
}
