import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Modal from 'react-native-modal';
import styled from 'styled-components/native'
import { SubHeader, Small } from './patterns/Texts'
import Colours from './patterns/Colours'
import { SecondaryButton } from './patterns/Buttons'

class CustomModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: this.props.notes }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Modal isVisible={this.props.toggle} animationIn="pulse">
          <SubHeader lightColour bold style={{ textAlign: "center", marginBottom: 8 }}>Add an record?</SubHeader>
          <ModalView>
            <Small style={{ width: '100%' }}>You don't have a record for this day, would you like to add one?</Small>

            <ModalButtonContainer>
              <SecondaryButton title="Cancel" onPress={() => this.props.cancelResponse()} />
              <SecondaryButton bold title="Save" onPress={() => this.props.confirmResponse(this.state.value)} />
            </ModalButtonContainer>
          </ModalView>
        </Modal>
      </View >
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
  height: 20%;
  padding: 24px;
  padding-bottom: 2px;
`;

const ModalButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

export default CustomModal;