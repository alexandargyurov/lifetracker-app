import React from "react";
import { ScrollView, BackHandler } from "react-native";
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
    this.goBack = this.goBack.bind(this);
    this.state = {
      reasons: [],
      mood_id: this.props.navigation.getParam("moodId", null)
    };
  }

  buttonSubmit() {
    this.props.navigation.push("Extra", {
      moodId: this.state.mood_id
    });
  }

  reasonCallback = (reasonId, selected) => {
    if (selected === true) {
      this.database.db.transaction(tx => {
        tx.executeSql(
          `INSERT INTO mood_reasons (mood_id, reason_id) VALUES (?, ?);`,
          [this.state.mood_id, reasonId]
        );
      });
    } else if (selected === false) {
      this.database.db.transaction(tx => {
        tx.executeSql(
          `DELETE FROM mood_reasons WHERE mood_id = ? AND reason_id = ?;`,
          [this.state.mood_id, reasonId]
        );
      });
    }
  };

  findSelected() {
    let selectedReasons = this.props.navigation.getParam("selected", []);

    this.state.reasons.filter(function(reason) {
      selectedReasons.map(function(selectedReason) {
        if (reason.id == selectedReason.reason_id) {
          reason.selected = selectedReason.selected;
        }
      });
    });
  }

  componentDidMount() {
    this.database.db.transaction(tx => {
      tx.executeSql(`SELECT * FROM reasons;`, [], (_, { rows: { _array } }) =>
        this.setState({ reasons: _array })
      );
    });

    BackHandler.addEventListener("hardwareBackPress", this.goBack);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.goBack);
  }

  goBack() {
    const { navigation } = this.props;
    reasonsCallback = navigation.getParam("reasonsCallback", null);

    if (reasonsCallback) {
      reasonsCallback();
    }

    this.props.navigation.goBack();
    return true;
  }

  render() {
    let button;

    if (this.props.navigation.getParam("edit", false)) {
      button = <ActionButton buttonText={"Back"} onPress={this.goBack} />;
    } else {
      button = (
        <ActionButton buttonText={"Continue"} onPress={this.buttonSubmit} />
      );
    }

    this.findSelected();
    return (
      <Screen>
        <ScrollView>
          <Header title={"Why's that?"} customBack={this.goBack} />

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
