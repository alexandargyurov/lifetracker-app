import React from "react";
import { ScrollView } from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
import styled from "@emotion/native";

import Header from "../components/Header";
import ActionButton from "../components/ActionButton";
import ReasonsIcon from "../components/ReasonIcon";

import Database from "../Database";

import { Screen } from "../css/designSystem";

export default class ReasonsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.database = new Database();
    this.buttonSubmit = this.buttonSubmit.bind(this);
    this.findSelected = this.findSelected.bind(this);
    this.state = {
      reasons: [],
      selected: []
    };
  }

  buttonSubmit() {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Common" })]
    });

    this.props.navigation.dispatch(resetAction);
  }

  reasonCallback = (reasonId, selected) => {
    const { navigation } = this.props;
    mood_id = navigation.getParam("moodId", null);

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

  findSelected() {
    this.state.reasons.filter(function(reason) {
      selectedReasons.map(function(selectedReason) {
        if (reason.id == selectedReason.reason_id) {
          reason.selected = true;
        }
      });
    });
  }

  componentDidMount() {
    const { navigation } = this.props;
    selectedReasons = navigation.getParam("selected", []);

    this.database.db.transaction(tx => {
      tx.executeSql(`SELECT * FROM reasons;`, [], (_, { rows: { _array } }) =>
        this.setState({ reasons: _array })
      );
    });
  }

  render() {
    let button;

    if (this.props.navigation.getParam("edit", false)) {
      button = <ActionButton buttonText={"Back"} onPress={this.props.navigation.goBack}/>
    } else {
      button = <ActionButton buttonText={"Submit"} onPress={this.buttonSubmit} />
    }

    this.findSelected()
    return (
      <Screen>
        <ScrollView>
          <Header title={"Why's that?"} backButton={true} />

          <Reasons>
            {this.state.reasons.map((reason, key) => (
              <ReasonsIcon
                reason={reason.label}
                reasonId={reason.id}
                reasonCallback={this.reasonCallback}
                viewOnly={false}
                selected={reason.selected}
                key={key}
              />
            ))}
          </Reasons>

          {button}
        </ScrollView>
      </Screen>
    );
  }
}

const Reasons = styled.View`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
`;
