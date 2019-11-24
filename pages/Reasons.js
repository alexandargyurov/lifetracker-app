import React from "react";
import { ScrollView, Text, TouchableNativeFeedback } from "react-native";
import styled from "@emotion/native";
import { NextButton } from "../css/designSystem"

import ReasonsIcon from "../components/ReasonIcon";
import { StackActions, NavigationActions } from 'react-navigation'

import t from "../assets/tachyons.css";
import Database from "../Database"

export default class ReasonsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.database = new Database()
    this.state = {
      reasons: [],
      selected: []
    };
  }
  
  _buttonSubmit() {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Common' })],
    });

    this.props.navigation.dispatch(resetAction)
  }

  reasonCallback = (reasonId, selected) => {
    const { navigation } = this.props;
    mood_id = navigation.getParam("moodId", null)

    if (selected === true) {
      this.database.db.transaction(tx => {
        tx.executeSql(
          `INSERT INTO mood_reasons (mood_id, reason_id) VALUES (?, ?);`,
          [JSON.stringify(navigation.getParam("moodId", null)), reasonId]
        );
      });
    } else if (selected === false) {
      this.database.db.transaction(tx => {
        tx.executeSql(
          `DELETE FROM mood_reasons WHERE mood_id = ? AND reason_id = ?;`,
          [JSON.stringify(navigation.getParam("moodId", null)), reasonId]
        );
      });
    }
  };

  componentDidMount() {
    this.database.db.transaction(tx => {
      tx.executeSql(`SELECT * FROM reasons;`, [], (_, { rows: { _array } }) =>
        this.setState({ reasons: _array })
      );
    });
  }

  render() {
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
                viewOnly={false}
                key={key}
              />
            ))}
          </Reasons>

          <TouchableNativeFeedback
            style={t.pb3}
            onPress={() => this._buttonSubmit()}
            underlayColor="white"
          >
            <NextButton>
              <Text style={[t.b, t.tc, t.f5]}>NEXT</Text>
            </NextButton>
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


