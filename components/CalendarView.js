import React from "react";
import { CalendarList } from "react-native-calendars";
import { BoxShadow } from "react-native-shadow";
import { View } from "react-native";
import { style, theme } from "../css/calendarStyles";
import calendarPhaser from "../functions/calendarPhaser";
import Database from "../Database";
import moment from "moment";

const shadowStyle = {
  width: 350,
  height: 325,
  color: "#000000",
  radius: 10,
  border: 8,
  opacity: 0.15,
  x: -1,
  y: 5
};

export default class CalendarView extends React.Component {
  constructor(props) {
    super(props);
    this.database = new Database();
    this.state = {
        calendarDates: {}
    }
  }

  componentDidMount() {
    this.database.db.transaction(tx => {
      tx.executeSql(`SELECT * FROM moods;`, [], (_, { rows: { _array } }) =>
        this.setState({ calendarDates: calendarPhaser(_array) })
      );
    });
  }

  timestampPhaser(timestamp) {
    this.database.db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM moods WHERE timestamp = ? ORDER BY id DESC;`,
        [moment(timestamp).format("YYYY-MM-DD")],
        (_, { rows: { _array } }) => this.specificDay(_array, timestamp)
      );
    });
  }

  specificDay(data, timestamp) {
    if (data.length != 0) {
      this.props.navigation.push("Day", {
        moodId: data[0]["id"],
        date: moment(timestamp).format("dddd Do YYYY")
      });
    }
  }

  render() {
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "center"
        }}
      >
          <CalendarList
            style={style}
            theme={theme}
            current={Date()}
            markingType={"custom"}
            markedDates={this.state.calendarDates}
            onDayPress={day => {
              this.timestampPhaser(day["dateString"]);
            }}
            pagingEnabled={true}
            scrollEnabled={true}
            pastScrollRange={0}
            futureScrollRange={0}
            horizontal={true}
          />
      </View>
    );
  }
}
