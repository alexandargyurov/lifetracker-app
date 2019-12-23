import React from "react";
import { Image, View, TouchableOpacity } from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
import {
  Screen,
  CardDotted,
  MediumText,
  SmallHeading,
  SmallText
} from "../css/designSystem";

import Header from "../components/Header";
import NotesModal from "../components/NotesModal";
import ActionButton from "../components/ActionButton";
import Database from "../Database";

export default class RoadmapScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.database = new Database();
    this.closeModal = this.closeModal.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.buttonSubmit = this.buttonSubmit.bind(this);
    this.state = {
      value: "",
      modalVisible: false,
      mood_id: this.props.navigation.getParam("moodId", null),
      note: null
    };
  }

  updateNote(note) {
    this.setState({ note: note });
  }

  closeModal() {
    this.setState({ modalVisible: false });
  }

  buttonSubmit() {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Common" })]
    });

    this.props.navigation.dispatch(resetAction);
  }

  componentDidMount() {
    this.database.db.transaction(tx => {
      tx.executeSql(`INSERT INTO extras (mood_id, notes) VALUES (?, ?);`, [
        this.state.mood_id,
        null
      ]);
    });
  }

  render() {
    let notesIcon;

    if (this.state.note) {
      notesIcon = (
        <View style={{maxHeight: 150, padding: 15}}>
          <SmallHeading>
            Notes:
          </SmallHeading>
          <SmallText numberOfLines={4}>{this.state.note}</SmallText>
        </View>
      );
    } else {
      notesIcon = (
        <View>
          <Image
            style={{ width: 40, height: 40, alignSelf: "center" }}
            source={{
              uri: "https://lifetracker.fra1.digitaloceanspaces.com/notes.png"
            }}
          />

          <MediumText>Notes</MediumText>
        </View>
      );
    }
    return (
      <Screen>
        <Header title="Anything else to add?" backButton={true} />
        <TouchableOpacity
          onPress={() => {
            this.setState({ modalVisible: true });
          }}
        >
          <CardDotted style={{ borderWidth: 1 }}>{notesIcon}</CardDotted>
        </TouchableOpacity>

        <ActionButton buttonText={"Submit"} onPress={this.buttonSubmit} />

        <NotesModal
          moodId={this.state.mood_id}
          showModal={this.state.modalVisible}
          textPlaceholder={this.state.value}
          closeModal={this.closeModal}
          updateNote={this.updateNote}
        />
      </Screen>
    );
  }
}
