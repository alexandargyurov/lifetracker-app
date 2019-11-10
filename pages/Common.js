import React from "react";
import {
  ScrollView,
  Text,
  Image,
  TouchableNativeFeedback,
  TouchableOpacity
} from "react-native";

import { createDrawerNavigator } from "react-navigation-drawer";

import styled, { css } from "@emotion/native";
import { CalendarList } from "react-native-calendars";

import { SQLite } from "expo-sqlite";
const db = SQLite.openDatabase("database.db");

import t from "../assets/tachyons.css";
import HamburgerMenu from "../components/SideMenu";
import calendarPhaser from "../functions/calendarPhaser";
import MoodScreen from "../pages/Mood";
import Database from "../Database";

export default class CommonScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: "Home",
    header: null
  };

  constructor(props) {
    super(props);
    this.database = new Database();
    this.state = {
      calendarDates: {},
      drawerOpen: true
    };
  }

  timestampPhaser(timestamp) {
    console.log(timestamp);
    console.log(timestamp.format("dd.mm.yyyy hh:MM:ss"));
  }

  componentDidMount() {
    this.database.db.transaction(tx => {
      tx.executeSql(`select * from moods;`, [], (_, { rows: { _array } }) =>
        this.setState({ calendarDates: calendarPhaser(_array) })
      );
    });

    this.database.fetchDatabase();
  }

  render() {
    return (
      <ScrollView>
        <Menu>
          <TouchableOpacity
            style={{ paddingLeft: 20 }}
            onPress={this.props.navigation.openDrawer}
          >
            <Image
              style={{ width: 30, height: 30 }}
              source={require("../assets/ui/hamburger.png")}
            />
          </TouchableOpacity>
        </Menu>

        <Container>
          <CalendarList
            horizontal={true}
            pagingEnabled={true}
            current={Date()}
            markingType={"custom"}
            markedDates={this.state.calendarDates}
            onDayPress={day => {
              this.timestampPhaser(day["timestamp"]);
            }}
          />
        </Container>

        <TouchableNativeFeedback
          style={t.pb3}
          onPress={() => this.props.navigation.push("Mood")}
          underlayColor="white"
        >
          <Next>
            <Text style={[t.b, t.tc, t.f5, t.white]}>Add entry</Text>
          </Next>
        </TouchableNativeFeedback>
      </ScrollView>
    );
  }
}

const Container = styled.View``;

const Menu = styled.View`
  margin-top: 50px;
`;

const Next = styled.View`
  background-color: #7da3f2;
  border-radius: 9999px;
  padding-top: 25px;
  padding-bottom: 25px;
  padding-left: 50px;
  padding-right: 50px;
  margin: 30px;
`;
