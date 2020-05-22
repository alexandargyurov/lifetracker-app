import React from "react";
import { Image, View, TouchableOpacity, Button, Text } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styled from 'styled-components/native'

import NotesModal from "../components/NotesModal";
import Constants from "expo-constants";

export default class ExtrasScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.buttonSubmit = this.buttonSubmit.bind(this);
    this.state = {
      value: "",
      noteModalVisible: false,
      photosNumber: null,
      mood_id: 0,
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
    console.log("Submit")
  }

  componentDidMount() {

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
              uri: "https://firebasestorage.googleapis.com/v0/b/life-tracker-app-c52bf.appspot.com/o/notes.png?alt=media"
            }}
          />

          <Text style={{ color: '#FFF1EA' }}>Notes</Text>
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
              uri: "https://firebasestorage.googleapis.com/v0/b/life-tracker-app-c52bf.appspot.com/o/photos.png?alt=media"
            }}
          />
          <Text>Google Photos</Text>
          <SmallText style={{ textAlign: 'center' }}>{this.state.photosNumber} photos added</SmallText>
        </View>
      );
    } else {
      return (
        <View>
          <Image
            style={{ width: 40, height: 40, alignSelf: "center" }}
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/life-tracker-app-c52bf.appspot.com/o/photos.png?alt=media"
            }}
          />
          <Text style={{ color: '#FFF1EA' }}>Google Photos</Text>
        </View>
      );
    }
  }

  render() {
    let notesSection = this.notesSection();
    let photoSection = this.photoSection();

    let photoCard = <CardDotted style={{ borderWidth: 1 }}>{photoSection}</CardDotted>

    return (
      <View style={{ flex: 1, backgroundColor: '#585A79' }}>
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
              new: true,
              onGoBack: numOfImages => this.addImageCount(numOfImages)
            });
          }}
        >
          {photoCard}
        </TouchableOpacity>

        <Text style={{ color: '#FFF1EA' }}>Button</Text>

        <KeyboardAwareScrollView>
          <NotesModal
            moodId={this.state.mood_id}
            showModal={this.state.noteModalVisible}
            textPlaceholder={this.state.value}
            closeModal={this.closeModal}
            updateNote={this.updateNote}
          />
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export const CardDotted = styled.View`
  align-items: center;
  justify-content: center;
  width: 95%;
  height: 150px;
  align-self: center;
  border-radius: 1px;
  border-style: dashed;
  border-color: #FFF1EA;
  color: #FFF1EA;
  margin-bottom: 10px;
`;