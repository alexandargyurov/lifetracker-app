import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Modal from 'react-native-modal';
import styled from 'styled-components/native'
import { SubHeader } from './patterns/Texts'
import Colours from './patterns/Colours'
import { PrimaryButton, SecondaryButton } from './patterns/Buttons'

class NotesModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: this.props.notes }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Modal isVisible={this.props.toggle} animationIn="pulse">
          <SubHeader lightColour bold style={{ textAlign: "center", marginBottom: 8 }}>Notes</SubHeader>
          <ModalView>
            <TextInput
              style={{
                width: "100%",
                height: "60%",
                borderRadius: 8,
                textAlignVertical: "top",
              }}
              onChangeText={text => this.setState({ value: text })}
              value={this.state.value}
              placeholder="Tap here to start writing..."
              multiline
              numberOfLines={4}
              maxLength={1000}
            />

            <ModalButtonContainer>
              <SecondaryButton title="Cancel" onPress={() => this.props.closeModal()} />
              <SecondaryButton bold title="Save" onPress={() => this.props.saveNote(this.state.value)} />
            </ModalButtonContainer>
          </ModalView>
        </Modal>
      </View>
    );
  }
}

const ModalView = styled.View`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-around;
  background-color: ${Colours.light()};
  border-radius: 12px;
  height: 40%;
  padding: 24px;
  padding-bottom: 2px;
`;

const ModalButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

export default NotesModal;