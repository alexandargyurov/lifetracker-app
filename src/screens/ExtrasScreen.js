import React from "react";
import { Image, View, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styled from 'styled-components/native'
import { DottedCard } from '../components/DottedCard'

import MoodsAPI from '../api/MoodsApi'
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
    this.state = {
      showModal: false,
      note: this.props.route.params.notes
    };
  }

  saveNote(notes) {
    if (this.props.route.params.notes !== null && this.props.route.params.edit) {
      MoodsAPI.updateNote(this.props.route.params.mood_id, notes)
    } else {
      MoodsAPI.createNote(this.props.route.params.mood_id, notes)
    }

    this.setState({ showModal: false, note: notes })
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

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: this.props.route.params.backgroundColor }}>
        <TouchableOpacity onPress={() => { this.setState({ showModal: true }) }}>
          <DottedCard style={{ height: 150 }}>
            {this.notesSection()}
          </DottedCard>
        </TouchableOpacity>

        <ButtonContainer>
          <ButtonWithIcon onPress={() => {
            this.props.route.params.updateCalendar()
            this.props.navigation.navigate('Home')
          }}
            title={'Done'}
            faIcon={'chevron-right'}
            faSize={16} />
        </ButtonContainer>

        <KeyboardAwareScrollView>
          <NotesModal
            toggle={this.state.showModal}
            notes={this.state.note}
            closeModal={() => this.setState({ showModal: false })}
            saveNote={(notes) => this.saveNote(notes)}
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
