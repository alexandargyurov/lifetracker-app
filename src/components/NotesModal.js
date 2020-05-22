import React from "react";
import { Modal, TextInput, Text, TouchableOpacity } from "react-native";
import styled from 'styled-components/native'

class NotesModal extends React.Component {
  constructor(props) {
    super(props);
    this.saveNote = this.saveNote.bind(this);
    this.state = {
      value: this.props.textPlaceholder
    };
  }

  saveNote() {
    console.log("save meee")
  }

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.showModal}
        onRequestClose={() => {
          this.props.closeModal('note');
        }}
      >
        <ModalView>
          <ModalMedium>
            <Text style={{ textAlign: "center" }}>Notes</Text>
            <TextInput
              style={{
                width: "100%",
                height: "70%",
                borderColor: "#1b4751",
                borderWidth: 0.5,
                borderRadius: 2,
                textAlignVertical: "top",
                padding: 10,
                marginBottom: 20
              }}
              onChangeText={text => this.setState({ value: text })}
              value={this.state.value}
              multiline
              numberOfLines={4}
              maxLength={1000}
            />

            <TouchableOpacity
              onPress={() => {
                this.props.closeModal('note');
              }}
              style={{ marginLeft: "50%" }}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.saveNote();
                this.props.updateNote(this.state.value);
                this.props.closeModal('note');
              }}
            >
              <Text>Save</Text>
            </TouchableOpacity>
          </ModalMedium>
        </ModalView>
      </Modal>
    );
  }
}

export default NotesModal;

export const ModalView = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #00000080;
`;

export const ModalMedium = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  width: 80%;
  height: 300;
`;