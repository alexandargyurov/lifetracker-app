import React from "react";
import { Image, View, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styled from 'styled-components/native'
import Colours from '../components/patterns/Colours'
import { DottedCard } from '../components/DottedCard'

import NotesModal from "../components/NotesModal";
import { ButtonWithIcon } from '../components/patterns/Buttons'
import { Small } from '../components/patterns/Texts'

const photosImage = (url) => {
  return (
    <Image style={imageStyles}
      source={{
        uri: url
      }}
    />
  )
}

const imageStyles = {
  width: 40,
  height: 40,
  alignSelf: "center",
  marginBottom: 10
}

export default class ExtrasScreen extends React.Component {
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
    this.props.navigation.setOptions({
      headerStyle: {
        backgroundColor: this.props.route.params.backgroundColor,
        shadowColor: 'transparent',
        shadowOpacity: 0,
        elevation: 0
      }
    })
  }

  addImageCount(numOfImages) {
    this.setState({ photosNumber: numOfImages });
  }

  notesSection() {
    if (this.state.note) {
      return (
        <View style={{ maxHeight: 150, padding: 15 }}>
          <Small lightColour bold>Notes:</Small>
          <Small lightColour numberOfLines={4}>{this.state.note}</Small>
        </View>
      );
    } else {
      return (
        <View>
          {photosImage("https://firebasestorage.googleapis.com/v0/b/life-tracker-app-c52bf.appspot.com/o/notes.png?alt=media")}
          <Small bold lightColour >Notes</Small>
        </View>
      );
    }
  }

  photoSection() {
    if (this.state.photosNumber) {
      return (
        <View>
          {photosImage("https://firebasestorage.googleapis.com/v0/b/life-tracker-app-c52bf.appspot.com/o/photos.png?alt=media")}
          <Small>Photos</Small>
          <Small style={{ textAlign: 'center' }}>{this.state.photosNumber} photos added</Small>
        </View>
      );
    } else {
      return (
        <View>
          {photosImage("https://firebasestorage.googleapis.com/v0/b/life-tracker-app-c52bf.appspot.com/o/photos.png?alt=media")}
          <Small bold lightColour>Photos</Small>
        </View>
      );
    }
  }

  render() {


    return (
      <View style={{ flex: 1, backgroundColor: this.props.route.params.backgroundColor }}>
        <TouchableOpacity onPress={() => { this.setState({ noteModalVisible: true }) }}>
          <DottedCard style={{ height: 150 }}>
            {this.notesSection()}
          </DottedCard>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { }}>
          <DottedCard style={{ height: 150 }}>
            {this.photoSection()}
          </DottedCard>
        </TouchableOpacity>

        <ButtonContainer>
          <ButtonWithIcon onPress={() => this.props.navigation.navigate('Home')} title={'Done'} faIcon={'chevron-right'} faSize={16} />
        </ButtonContainer>

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

const ButtonContainer = styled.View`
	align-self: flex-end;
	margin: 12px;
`
