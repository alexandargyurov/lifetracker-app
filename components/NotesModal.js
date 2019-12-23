import React from "react";
import { Modal, TextInput, TouchableOpacity } from "react-native";
import {
  SmallHeading,
  ModalView,
  ModalMedium,
  ButtonAccept,
  ButtonDecline,
  ButtonTextSmall
} from "../css/designSystem";
import Database from "../Database";

class NotesModal extends React.Component {
  constructor(props) {
    super(props);
    this.database = new Database();
    this.saveNote = this.saveNote.bind(this);
    this.state = {
      value: this.props.textPlaceholder
    };
  }

  saveNote() {
    this.database.db.transaction(tx => {
      tx.executeSql(`UPDATE extras SET notes = (?) WHERE mood_id = (?);`, [
        this.state.value,
        this.props.moodId
      ]);
    });
  }

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.showModal}
        onRequestClose={() => {
          this.props.closeModal();
        }}
      >
        <ModalView>
          <ModalMedium>
            <SmallHeading style={{ textAlign: "center" }}>Notes</SmallHeading>
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
                this.props.closeModal();
              }}
              style={{ marginLeft: "50%" }}
            >
              <ButtonDecline>
                <ButtonTextSmall style={{ color: "#1B4751" }}>
                  Cancel
                </ButtonTextSmall>
              </ButtonDecline>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.saveNote();
                this.props.updateNote(this.state.value);
                this.props.closeModal();
              }}
            >
              <ButtonAccept>
                <ButtonTextSmall>Save</ButtonTextSmall>
              </ButtonAccept>
            </TouchableOpacity>
          </ModalMedium>
        </ModalView>
      </Modal>
    );
  }
}

export default NotesModal;
