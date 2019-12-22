import React from "react";
import { Modal, Image, Text, TextInput, TouchableOpacity } from "react-native";
import {
  Screen,
  SmallHeading,
  CardDotted,
  ModalView,
  ModalMedium,
  ButtonAccept,
  ButtonDecline,
  ButtonTextSmall,
  MediumText
} from "../css/designSystem";
import Header from "../components/Header";
import { Feather } from "@expo/vector-icons";

export default class RoadmapScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      value: "",
      modalVisible: false
    };
  }

  render() {
    let modal = (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          this.setState({ modalVisible: false });
        }}
      >
        <ModalView>
          <ModalMedium>
            <SmallHeading>Notes</SmallHeading>
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
                this.setState({ modalVisible: false });
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
                this.setState({ modalVisible: false });
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

    return (
      <Screen>
        <Header title="Anything else to add?" backButton={true} />
        <TouchableOpacity
          onPress={() => {
            this.setState({ modalVisible: true });
          }}
        >
          <CardDotted style={{ borderWidth: 1 }}>
            <Image
              style={{ width: 40, height: 40 }}
              source={{
                uri: "https://lifetracker.fra1.digitaloceanspaces.com/notes.png"
              }}
            />

            <MediumText>Notes</MediumText>
          </CardDotted>
        </TouchableOpacity>

        {modal}
      </Screen>
    );
  }
}
