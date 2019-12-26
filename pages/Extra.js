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
import PhotosView from "../components/PhotosView";
import Database from "../Database";
import GooglePhoto from "../components/GooglePhoto";

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
      noteModalVisible: false,
      photosNumber: null,
      mood_id: this.props.navigation.getParam("moodId", null),
      note: null
    };
  }

  updateNote(note) {
    this.setState({ note: note });
  }

  closeModal(modal) {
    if (modal == "note") {
      this.setState({ noteModalVisible: false });
    }
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

  addImageCount(numOfImages) {
    this.setState({ photosNumber: numOfImages });
  }

  notesSection() {
    if (this.state.note) {
      return (
        <View style={{ maxHeight: 150, padding: 15 }}>
          <SmallHeading>Notes:</SmallHeading>
          <SmallText numberOfLines={4}>{this.state.note}</SmallText>
        </View>
      );
    } else {
      return (
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
  }

  photoSection() {
    if (this.state.photosNumber) {
      return (
        <View>
          <Image
            style={{ width: 40, height: 40, alignSelf: "center" }}
            source={{
              uri: "https://lifetracker.fra1.digitaloceanspaces.com/photos.png"
            }}
          />
          <MediumText>Google Photos</MediumText>
          <SmallText style={{textAlign: 'center'}}>{this.state.photosNumber} photos added</SmallText>
        </View>
      );
    } else {
      return (
        <View>
          <Image
            style={{ width: 40, height: 40, alignSelf: "center" }}
            source={{
              uri: "https://lifetracker.fra1.digitaloceanspaces.com/photos.png"
            }}
          />
          <MediumText>Google Photos</MediumText>
        </View>
      );
    }
  }

  render() {
    let notesSection = this.notesSection();
    let photoSection = this.photoSection();

    return (
      <Screen>
        <Header title="Anything else to add?" backButton={true} />
        <TouchableOpacity
          onPress={() => {
            this.setState({ noteModalVisible: true });
          }}
        >
          <CardDotted style={{ borderWidth: 1 }}>{notesSection}</CardDotted>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            this.props.navigation.push("PhotosSelect", {
              moodId: this.state.mood_id,
              onGoBack: numOfImages => this.addImageCount(numOfImages)
            });
          }}
        >
          <CardDotted style={{ borderWidth: 1 }}>{photoSection}</CardDotted>
        </TouchableOpacity>

        <ActionButton buttonText={"Submit"} onPress={this.buttonSubmit} />

        <NotesModal
          moodId={this.state.mood_id}
          showModal={this.state.noteModalVisible}
          textPlaceholder={this.state.value}
          closeModal={this.closeModal}
          updateNote={this.updateNote}
        />
      </Screen>
    );
  }
}
