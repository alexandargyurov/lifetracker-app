import React from "react";
import { CalendarList } from "react-native-calendars";
import { Modal, View, Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { style, theme } from "../css/calendarStyles";
import calendarPhaser from "../functions/calendarPhaser";
import Database from "../Database";
import moment from "moment";
import {
  ModalView,
  ModalSmall,
  SmallHeading,
  ButtonAccept,
  ButtonDecline,
  ButtonTextSmall
} from "../css/designSystem";
import * as Animatable from "react-native-animatable";

export default class CalendarView extends React.Component {
  constructor(props) {
    super(props);
    this.database = new Database();
    this.state = {
      calendarDates: {},
      modalVisible: false,
      dateSelected: ""
    };
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
        date: moment(timestamp).format("dddd Do MMMM")
      });
    } else {
      this.setState({ modalVisible: true, dateSelected: timestamp });
    }
  }

  render() {
    let modal = (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          this.setState({ modalVisible: false });
        }}
      >
        <ModalView>
          <ModalSmall>
            <SmallHeading style={{ paddingBottom: 30, textAlign: 'center' }}>
              You don't have a record for this day, would you like to add one?
            </SmallHeading>
            <TouchableOpacity
              onPress={() => {
                this.setState({ modalVisible: false });
              }}
            >
              <ButtonDecline>
                <ButtonTextSmall style={{ color: "#1B4751" }}>
                  No
                </ButtonTextSmall>
              </ButtonDecline>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.setState({ modalVisible: false });
                this.props.navigation.push("Mood", {
                  date: this.state.dateSelected
                });
              }}
            >
              <ButtonAccept>
                <ButtonTextSmall>Yes</ButtonTextSmall>
              </ButtonAccept>
            </TouchableOpacity>
          </ModalSmall>
        </ModalView>
      </Modal>
    );

    return (
      <Animatable.View
        animation="fadeIn"
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "center",
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
          calendarWidth={350}
          pagingEnabled={true}
          scrollEnabled={true}
          pastScrollRange={12}
          futureScrollRange={1}
          horizontal={true}
        />

        {modal}
      </Animatable.View>
    );
  }
}
