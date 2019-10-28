import React from "react";
import { ScrollView, Text, View, TouchableNativeFeedback } from "react-native";
import styled, { css } from "@emotion/native";
import { CalendarList } from "react-native-calendars";

import { SQLite } from "expo-sqlite";
const db = SQLite.openDatabase("database.db");

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
      </ScrollView>
    );
  }
}

const Container = styled.View`
  padding-top: 50px;
`;
