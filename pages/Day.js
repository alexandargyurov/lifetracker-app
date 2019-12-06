import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import styled, { css } from "@emotion/native";
import t from "../assets/tachyons.css";

import Database from "../Database";
import moodToColour from "../functions/moodToColour";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

import { Screen } from "../css/designSystem";
import Header from "../components/Header";
import ActionButton from "../components/ActionButton";
import ReasonsIcon from "../components/ReasonIcon";

export default class DayScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.database = new Database();
    this.state = {
      reasons: [],
      mood: {},
      editable: false
    };
    this.addReason = this.addReason.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  addReason() {
    const { navigation } = this.props;
    mood_id = navigation.getParam("moodId", null);

    this.props.navigation.push("Reasons", {
      moodId: mood_id,
      viewOnly: false,
      edit: true,
      selected: this.state.reasons
    });
  }

  toggleEdit() {
    this.setState({ editable: !this.state.editable });
  }

  removeReason = reasonId => {
    console.log(reasonId);

    const { navigation } = this.props;
    mood_id = navigation.getParam("moodId", null);

    return new Promise((resolve, reject) => {
      this.database.db.transaction(tx => {
        tx.executeSql(
          `DELETE FROM mood_reasons WHERE mood_id = ? AND reason_id = ?;`,
          [mood_id, reasonId]
        );
      });
    });
  };

  componentDidMount() {
    const { navigation } = this.props;
    mood_id = navigation.getParam("moodId", null);

    this.database.db.transaction(
      tx => {
        tx.executeSql(
          `SELECT * FROM reasons INNER JOIN mood_reasons ON reasons.id = mood_reasons.reason_id WHERE mood_id = ?;`,
          [mood_id],
          (_, { rows: { _array } }) => this.setState({ reasons: _array })
        );

        tx.executeSql(
          `SELECT mood FROM moods WHERE id = ?;`,
          [mood_id],
          (_, { rows: { _array } }) =>
            this.setState({ mood: moodToColour(_array[0]["mood"]) })
        );
      },
      function(err) {
        console.log(err);
      }
    );
  }

  render() {
    const { navigation } = this.props;
    let addButton;

    if (this.state.editable) {
      addButton = (
        <AddButton>
          <TouchableOpacity onPress={this.addReason}>
            <Feather name="plus-circle" size={36} color="#1B4751" />
          </TouchableOpacity>
        </AddButton>
      );
    }

    return (
      <Screen>
        <ScrollView>
          <Header title={"Summary"} backButton={true}/>

          <Text style={[t.tc, t.fw5, t.f3, t.mb2, t.pa2]}>
            You were feeling
            <Text
              style={{
                color: this.state.mood["colour"],
                textShadowColor: "white",
                textShadowOffset: { width: 0, height: 0 },
                textShadowRadius: 10
              }}
            >
              {" "}
              {this.state.mood["feeling"]}{" "}
            </Text>
            <Text>
              on {"\n"}
              {navigation.getParam("date", null)}.
            </Text>
          </Text>

          <Reasons>
            {this.state.reasons.map((reason, key) => (
              <ReasonsIcon
                reason={reason.label}
                reasonId={reason.reason_id}
                reasonCallback={this.removeReason}
                viewOnly={true}
                editable={this.state.editable}
                key={key}
              />
            ))}
            {addButton}
          </Reasons>

          <ActionButton buttonText={"Edit"} onPress={this.toggleEdit}/>

        </ScrollView>
      </Screen>
    );
  }
}

const Reasons = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 50px;
`;

const AddButton = styled.View`
  display: flex;
  width: 33%;
  padding-top: 50px;
  align-items: center;
`;