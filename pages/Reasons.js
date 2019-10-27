import React from "react";
import { ScrollView, Text, View, TouchableNativeFeedback } from "react-native";
import styled, { css } from "@emotion/native";
import ReasonsIcon from "../components/ReasonIcon";

import t from "../assets/tachyons.css";

import { SQLite } from "expo-sqlite";
const db = SQLite.openDatabase("database.db");

export default class ReasonsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      reasons: [],
      selected: []
    };
  }

  _buttonSubmit() {
    this.props.navigation.push("Common");
  }

  reasonCallback = (reasonId, selected) => {
    const { navigation } = this.props;
    if (selected === true) {
      db.transaction(tx => {
        tx.executeSql(
          `INSERT INTO mood_reasons (mood_id, reason_id) VALUES (?, ?);`,
          [JSON.stringify(navigation.getParam("moodId", null)), reasonId]
        );
      });
    } else if (selected === false) {
      db.transaction(tx => {
        tx.executeSql(
          `DELETE FROM mood_reasons WHERE mood_id = ? AND reason_id = ?;`,
          [JSON.stringify(navigation.getParam("moodId", null)), reasonId]
        );
      });
    }
  };

  componentDidMount() {
    db.transaction(tx => {
      tx.executeSql(`select * from reasons;`, [], (_, { rows: { _array } }) =>
        this.setState({ reasons: _array })
      );
    });
  }

  render() {
    const { navigation } = this.props;
    return (
      <ScrollView>
        <Container>
          <Text style={[t.tc, t.white, t.fw5, t.f2, t.mt4]}>Why's that?</Text>

          <Reasons>
            {this.state.reasons.map((reason, key) => (
              <ReasonsIcon
                reason={reason.label}
                reasonId={reason.id}
                reasonCallback={this.reasonCallback}
                key={key}
              />
            ))}
          </Reasons>

          <TouchableNativeFeedback
            style={t.pb3}
            onPress={() => this._buttonSubmit()}
            underlayColor="white"
          >
            <Next>
              <Text style={[t.b, t.tc, t.f5]}>NEXT</Text>
            </Next>
          </TouchableNativeFeedback>
        </Container>
      </ScrollView>
    );
  }
}

const Container = styled.View`
  flex: 1;
  background-color: #d97d54;
`;
const Reasons = styled.View`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
`;

const Icon = styled.View`
  display: flex;
  width: 33%;
  padding: 5px;
  align-items: center;
`;

const Next = styled.View`
  background-color: white;
  border-radius: 9999px;
  padding-top: 25px;
  padding-bottom: 25px;
  padding-left: 50px;
  padding-right: 50px;
  margin: 30px;
`;