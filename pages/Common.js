import React from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableNativeFeedback,
  TouchableOpacity
} from "react-native";

import styled, { css } from "@emotion/native";
import { CalendarList } from "react-native-calendars";
import Drawer from "react-native-drawer";

import { SQLite } from "expo-sqlite";
const db = SQLite.openDatabase("database.db");

import t from "../assets/tachyons.css";
import HamburgerMenu from "../components/HamburgerMenu"
import createDatabase from "../functions/createDatabase";
import calendarPhaser from "../functions/calendarPhaser";

export default class CommonScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.onHamburgerClick = this.onHamburgerClick.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.state = {
      calendarDates: {},
      drawerOpen: false
    };
  }

  onHamburgerClick() {
    this.toggleDrawer();
  }

  toggleDrawer() {
    this.setState({drawerOpen: ! this.state.drawerOpen })
  }

  componentDidMount() {
    db.transaction(tx => {
      tx.executeSql(`select * from moods;`, [], (_, { rows: { _array } }) =>
        this.setState({ calendarDates: calendarPhaser(_array) })
      );
    });

    createDatabase();
  }

  render() {
    return (
      <ScrollView>

        <Drawer 
            open={this.state.drawerOpen}
            type='static'
            tapToClose={true}
            openDrawerOffset={0.5}
            content={<HamburgerMenu/>}
            tweenHandler={Drawer.tweenPresets.parallax}
            tweenEasing={"easeInQuad"}
            tweenDuration={400}
            onClose={this.closeDrawer}
            >

        </Drawer>

        <Menu>
          <TouchableOpacity onPress={this.onHamburgerClick}>
            <Text>Hamburger</Text>
          </TouchableOpacity>
        </Menu>

        <Container>
          <CalendarList
            horizontal={true}
            pagingEnabled={true}
            current={Date()}
            markingType={"custom"}
            markedDates={this.state.calendarDates}
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

const Container = styled.View`
  padding-top: 50px;
`;

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
