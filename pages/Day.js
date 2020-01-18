import React from "react";
import * as Animatable from "react-native-animatable";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import styled from "@emotion/native";
import t from "../assets/tachyons.css";

import Database from "../Database";
import moodToColour from "../functions/moodToColour";
import { Feather } from "@expo/vector-icons";
import { Screen, LineSeperator } from "../css/designSystem";

import Header from "../components/Header";
import NotesSection from "../components/NotesSection";
import PhotosSection from "../components/PhotosSection";
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
      showNoteSection: false,
      showPhotosSection: false,
      note: ""
    };
    this.editReasons = this.editReasons.bind(this);
    this.removeReason = this.removeReason.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.renderNoteSection = this.renderNoteSection.bind(this);
    this.updateReasons = this.updateReasons.bind(this);
  }

  editReasons() {
    this.props.navigation.push("Reasons", {
      moodId: this.state.mood_id,
      viewOnly: false,
      edit: true,
      selected: this.state.reasons,
      reasonsCallback: this.updateReasons
    });
  }

  updateReasons() {
    this.toggleEdit();
    this.renderReasons(true);
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
            if (_array.length == 0) this.setState({ showNoteSection: true, showPhotosSection: true });
            _array.map(function(reason) {
              reason.selected = true;
            });

            this.setState({ reasons: _array });
          }
        );
      });
    }
  }

  renderNoteSection() {
    this.setState({ showNoteSection: true, showPhotosSection: true });
  }

  render() {
    const { navigation } = this.props;
    let addButton;
    let noteSection;
    let photos;
    let editButton = (
      <TouchableOpacity onPress={this.toggleEdit} style={{ width: "20%" }}>
        <Feather
          name="edit"
          size={28}
          color="#1B4751"
          style={{ textAlign: "right", paddingRight: 10 }}
        />
      </TouchableOpacity>
    );

    if (this.state.editable) {
      addButton = (
        <AddButton animation="fadeIn">
          <TouchableOpacity onPress={this.editReasons}>
            <Feather name="plus-circle" size={36} color="#1B4751" />
          </TouchableOpacity>
        </AddButton>
      );
    }

    if (this.state.showNoteSection) {
      noteSection = (
        <Animatable.View animation="fadeInUp" easing="ease-out-quad">
          <LineSeperator />
          <NotesSection moodId={this.state.mood_id} />
        </Animatable.View>
      );
    }

    if (this.state.showPhotosSection) {
      photos = (
        <Animatable.View animation="fadeInUp" easing="ease-out-quad" delay={500} duration={1500}>
          <LineSeperator />
          <PhotosSection moodId={this.state.mood_id} />
        </Animatable.View>
      );
    }

    return (
      <Screen>
        <ScrollView>
          <Header title={"Summary"} backButton={true} rightSide={editButton} />

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
              {navigation.getParam("date", "")}.
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
                buttonCallback={this.renderNoteSection}
                key={key}
              />
            ))}
            {addButton}
          </Reasons>

          {noteSection}
          {photos}
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
`;

const AddButton = Animatable.createAnimatableComponent(styled.View`
  display: flex;
  width: 33%;
  padding-top: 50px;
  align-items: center;
`);
