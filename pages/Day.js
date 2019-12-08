import React from "react";
import * as Animatable from "react-native-animatable";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import styled from "@emotion/native";
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
      mood_id: this.props.navigation.getParam("moodId", null),
      editable: false,
      showEditButton: false
    };
    this.addReason = this.addReason.bind(this);
    this.removeReason = this.removeReason.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.renderEditButton = this.renderEditButton.bind(this);
    this.updateReasons = this.updateReasons.bind(this);
    this.deleteReasons = this.deleteReasons.bind(this);
  }

  addReason() {
    this.props.navigation.push("Reasons", {
      moodId: this.state.mood_id,
      viewOnly: false,
      edit: true,
      selected: this.state.reasons,
      reasonsCallback: this.updateReasons
    });
  }

  deleteReasons() {
    
  }

  updateReasons() {
    this.toggleEdit()
    this.renderReasons(true)
  }

  toggleEdit() {
    this.setState({ editable: !this.state.editable });
  }

  removeReason = reasonId => {
    this.database.db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM mood_reasons WHERE mood_id = ? AND reason_id = (?);`,
        [this.state.mood_id, reasonId]
      );
    });

    this.state.reasons.filter(function(reason) {
        if (reason.reason_id == reasonId) {
          reason.selected = false;
        }
    });

    console.log(this.state.reasons)
  };

  componentDidMount() {
    this.database.db.transaction(tx => {
      tx.executeSql(
        `SELECT mood FROM moods WHERE id = ?;`,
        [this.state.mood_id],
        (_, { rows: { _array } }) =>
          this.setState({ mood: moodToColour(_array[0]["mood"]) })
      );
    });
  }

  renderReasons(endState) {
    if (endState) {
      this.database.db.transaction(tx => {
        tx.executeSql(
          `SELECT * FROM reasons INNER JOIN mood_reasons ON reasons.id = mood_reasons.reason_id WHERE mood_id = ?;`,
          [this.state.mood_id],
          (_, { rows: { _array } }) => {
            if (_array.length == 0) this.setState({ showEditButton: true });
            _array.map(function(reason) {
              reason.selected = true;
            })

            console.log(_array)
            this.setState({ reasons: _array });
          }
        );
      });
    }

  }

  renderEditButton() {
    this.setState({ showEditButton: true });
  }

  render() {
    const { navigation } = this.props;
    let addButton;
    let editButton;

    if (this.state.editable) {
      addButton = (
        <AddButton animation="fadeIn">
          <TouchableOpacity onPress={this.addReason}>
            <Feather name="plus-circle" size={36} color="#1B4751" />
          </TouchableOpacity>
        </AddButton>
      );
    }

    if (this.state.showEditButton) {
      editButton = (
        <ActionButton buttonText={"Edit"} onPress={this.toggleEdit} />
      );
    }

    return (
      <Screen>
        <ScrollView>
          <Header title={"Summary"} backButton={true} />

          <Animatable.Text
            style={[t.tc, t.fw5, t.f3, t.mb2, t.pa2]}
            animation="fadeInUp"
            easing="ease-out-quad"
            onAnimationEnd={endState => this.renderReasons(endState)}
          >
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
          </Animatable.Text>

          <Reasons>
            {this.state.reasons.map((reason, key) => (
              <ReasonsIcon
                reason={reason.label}
                reasonId={reason.reason_id}
                reasonCallback={this.removeReason}
                viewOnly={true}
                editable={this.state.editable}
                position={key}
                reasonsLength={this.state.reasons.length}
                buttonCallback={this.renderEditButton}
                key={key}
              />
            ))}
            {addButton}
          </Reasons>

          {editButton}
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

const AddButton = Animatable.createAnimatableComponent(styled.View`
  display: flex;
  width: 33%;
  padding-top: 50px;
  align-items: center;
`);
