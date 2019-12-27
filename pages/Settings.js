import React from "react";
import { View, TouchableOpacity, Image, Modal } from "react-native";
import Header from "../components/Header";
import {
  Screen,
  MedHeading,
  SmallHeading,
  SmallText,
  ModalView,
  ModalSmall,
  ButtonAccept,
  ButtonDecline,
  ButtonTextSmall,
  LineSeperator
} from "../css/designSystem";

import Auth from "../Authentication";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.auth = new Auth();
    this.customBack = this.customBack.bind(this);
    this.state = {
      view: null,
      user: null,
      modalVisible: false
    };
  }

  async signIn() {
    this.setState({ user: await this.auth.signIn() });
  }

  async signOut() {
    this.setState({ user: await this.auth.signOut() });
  }

  async customBack() {
    if (this.props.navigation.getParam("fromPhotos")) {
      await this.props.navigation.state.params.refreshOnBack(this.state.user);
      this.props.navigation.goBack();
    } else {
      this.props.navigation.goBack();
    }
  }

  async componentDidMount() {
    this.setState({ user: await this.auth.getUser() });
  }

  render() {
    let view;
    if (this.state.user) {
      view = (
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          <Image
            style={{
              width: 150,
              height: 150,
              margin: 10,
              borderRadius: 999
            }}
            source={{
              uri: this.state.user.info.photoUrl
            }}
          />
          <View stlye={{ margin: 10 }}>
            <SmallHeading>{this.state.user.info.name}</SmallHeading>

            <SmallHeading>{this.state.user.info.email}</SmallHeading>

            <TouchableOpacity
              onPress={() => this.setState({ modalVisible: true })}
            >
              <SmallHeading style={{ marginTop: 20, color: "#7e9cff" }}>
                Logout
              </SmallHeading>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      view = (
        <View style={{ margin: 10, marginTop: 0 }}>
          <SmallText>
            By linking a Google account, you will be able to add photos for
            specific days and view them.
          </SmallText>

          <TouchableOpacity onPress={() => this.signIn()}>
            <Image
              style={{ width: 200, resizeMode: "contain" }}
              source={require("../assets/google_signin_btn.png")}
            />
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <Screen>
        <Header title="Settings" customBack={this.customBack} />
        <MedHeading style={{ textAlign: "left", margin: 10 }}>
          Google Account
        </MedHeading>

        {view}

        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({ modalVisible: false });
          }}
        >
          <ModalView>
            <ModalSmall style={{ height: 180 }}>
              <SmallHeading style={{ paddingBottom: 30, textAlign: "left" }}>
                By removing your Google account you will not be able to access
                your photos, are you sure?
              </SmallHeading>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ modalVisible: false });
                }}
              >
                <ButtonDecline>
                  <ButtonTextSmall style={{ color: "#1B4751" }}>
                    Cancel
                  </ButtonTextSmall>
                </ButtonDecline>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.signOut();
                  this.setState({ modalVisible: false });
                }}
              >
                <ButtonAccept>
                  <ButtonTextSmall>Yes</ButtonTextSmall>
                </ButtonAccept>
              </TouchableOpacity>
            </ModalSmall>
          </ModalView>
        </Modal>

        <LineSeperator />

        <SmallText></SmallText>
      </Screen>
    );
  }
}
