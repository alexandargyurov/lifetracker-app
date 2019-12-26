import React from "react";
import { View, TouchableOpacity } from "react-native";
import { SmallHeading, SmallText } from "../css/designSystem";
import { Feather } from "@expo/vector-icons";
import NotesModal from "../components/NotesModal";
import Database from "../Database";

export default class NotesSection extends React.Component {
  constructor(props) {
    super(props);
    this.database = new Database();
    this.closeModal = this.closeModal.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.state = {
      modalVisible: false,
      note: "",
      loaded: false
    };
  }

  updateNote(note) {
    this.setState({ note: note });
  }

  closeModal() {
    this.setState({ modalVisible: false });
  }

  componentDidMount() {
    this.database.db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM extras WHERE mood_id = (?);`,
        [this.props.moodId],
        (_, { rows: { _array } }) => {
          if (_array.length != 0) {
            this.setState({ note: _array[0]["notes"], loaded: true });
          }
        }
      );
    });
  }

  render() {
    let modal;

    if (this.state.loaded) {
      modal = (
        <NotesModal
          moodId={this.props.moodId}
          showModal={this.state.modalVisible}
          textPlaceholder={this.state.note}
          closeModal={this.closeModal}
          updateNote={this.updateNote}
        />
      );
    }

    return (
      <View
        style={{
          width: "85%",
          alignSelf: "center",
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <View>
          <SmallHeading>Notes:</SmallHeading>
          <SmallText numberOfLines={10}>{this.state.note}</SmallText>
        </View>

        <TouchableOpacity
          onPress={() => {
            this.setState({ modalVisible: true });
          }}
        >
          <Feather name="edit" size={24} color="#1B4751" />
        </TouchableOpacity>

        {modal}
      </View>
    );
  }
}
