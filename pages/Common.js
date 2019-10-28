import React from "react";
import { ScrollView, Text, View, TouchableNativeFeedback } from "react-native";
import styled, { css } from "@emotion/native";
import { CalendarList } from "react-native-calendars";

import { SQLite } from "expo-sqlite";
const db = SQLite.openDatabase("database.db");

import t from "../assets/tachyons.css";

export default class CommonScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.calendarPhaser = this.calendarPhaser.bind(this);
    this.moodToColour = this.moodToColour.bind(this);
    this.state = {
      calendarDates: {},
      colour: ""
    };
  }

  moodToColour(mood) {
    if (mood <= 0.2) {
      return "#7E57C2";
    } else if (mood <= 0.4) {
      return "#5C6BC0";
    } else if (mood <= 0.6) {
      return "#00BCD4";
    } else if (mood <= 0.8) {
      return "#9CCC65";
    } else if (mood <= 1) {
      return "#4CAF50";
    }
  }

  calendarPhaser(data) {
    dates = {};

    data.forEach(function(element) {
      date = element.timestamp.split(" ")[0];
      mood = element.mood;

      dates[date] = {
        customStyles: {
          container: {
            backgroundColor: this.moodToColour(mood),
            borderRadius: 0
          },
          text: {
            color: "white"
          }
        },
        selected: true
      };
    }, this);

    this.setState({ calendarDates: dates });
  }

  componentDidMount() {
    db.transaction(tx => {
      tx.executeSql(`select * from moods;`, [], (_, { rows: { _array } }) =>
        this.calendarPhaser(_array)
      );
    });
  }

  render() {
    return (
      <ScrollView>
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
            <Text style={[t.b, t.tc, t.f5]}>Add entry</Text>
          </Next>
        </TouchableNativeFeedback>
      </ScrollView>
    );
  }
}

const Container = styled.View`
  padding-top: 50px;
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
