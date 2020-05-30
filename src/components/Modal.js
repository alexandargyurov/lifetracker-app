import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Modal from 'react-native-modal';
import styled from 'styled-components/native'
import { Normal } from './patterns/Texts'

class CustomModal extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Modal
          isVisible={this.props.toggle}
          animationIn="slideInLeft"
          animationOut="slideOutRight">
          <ModalView>
            <Normal>Update mood</Normal>
            <Normal>Update reasons</Normal>
            <Normal>Update note</Normal>


            <Button title="Hide modal" onPress={() => this.props.closeModal()} />

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
	justify-content: center;
  padding: 12px;
  background-color: white;
  border-radius: 12px;
`;

export default CustomModal;