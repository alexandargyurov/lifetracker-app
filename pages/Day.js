import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import styled, { css } from "@emotion/native";
import ReasonsIcon from "../components/ReasonIcon";

import t from "../assets/tachyons.css";
import Database from "../Database";
import moodToColour from "../functions/moodToColour";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

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
  }

  toggleEdit() {
    this.setState({ editable: !this.state.editable });
  }

  removeReason = reasonId => {
    const { navigation } = this.props;
    mood_id = navigation.getParam("moodId", null);

    this.database.db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM mood_reasons WHERE mood_id = ? AND reason_id = ?;`,
        [mood_id, reasonId]
      );
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
            <Feather name="plus-circle" size={36} color="white" />
          </TouchableOpacity>
        </AddButton>
      );
    }

    return (
      <ScrollView style={{ flex: 1, backgroundColor: "#7da3f2" }}>
        <Container>
          <Text style={[t.tc, t.white, t.fw5, t.f3, t.mt2, t.mb2, t.pa2]}>
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

          <EditButton>
            <TouchableOpacity style={t.ma3} onPress={() => this.toggleEdit()}>
              <MaterialCommunityIcons
                name="circle-edit-outline"
                size={30}
                color="white"
              />
            </TouchableOpacity>
          </EditButton>

          <Reasons>
            {this.state.reasons.map((reason, key) => (
              <ReasonsIcon
                reason={reason.label}
                reasonId={reason.id}
                reasonCallback={this.removeReason}
                viewOnly={true}
                editable={this.state.editable}
                key={key}
              />
            ))}
            {addButton}
          </Reasons>
        </Container>
      </ScrollView>
    );
  }
}

const Container = styled.View`
  flex: 1;
  background-color: #7da3f2;
  padding-top: 40px;
`;

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
  margin-right: 10px;
  margin-left: 10px;
  padding-top: 50px;
  align-items: center;
`;

const EditButton = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
` 