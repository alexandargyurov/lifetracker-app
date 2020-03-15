import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Modal,
  ActivityIndicator,
  Alert,
  BackHandler,
  AsyncStorage
} from "react-native";
import Header from "../../components/Header";
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
} from "../../css/designSystem";

import Auth from "../../Authentication";
import Constants from "expo-constants";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';

import Database from "../../Database";


export default class ConnectedAccountsScreen extends React.Component {
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
      loaded: false,
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
    this.setState({ user: await this.auth.getUser(), loaded: true });
  }

  showWarningModal() {
    Alert.alert(
      'Warning',
      'This will delete all your data and replace it with the a new database you provide.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK', onPress: async () => {
            await this.replaceDatabase().then(async function (result) {
              const newDBName = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5) + '.db';
              await FileSystem.moveAsync({ from: result.uri, to: (FileSystem.documentDirectory + 'SQLite/' + newDBName) })
              await AsyncStorage.setItem("@database", newDBName);

              Alert.alert(
                'Success',
                'Please restart your app to see the new database changes.',
                [
                  { text: 'OK', onPress: () => BackHandler.exitApp() },
                ]
              )
            })
          }
        },
      ],
      { cancelable: false }
    )
  }

  showInfoModal() {

  }

  async replaceDatabase() {
    let selectedFile = await DocumentPicker.getDocumentAsync()

    await FileSystem.deleteAsync(FileSystem.documentDirectory + 'SQLite/' + global.dbName)
    return selectedFile
  }

  render() {
    let view;
    if (!this.state.loaded) {
      <ActivityIndicator size="large" color="#1b4751" />;
    } else {
      if (this.state.user && !Constants.platform.ios) {
        view = (
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <Image
              style={{
                width: 150,
                height: 150,
                margin: 10,
                borderRadius: 75
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
      } else if (Constants.platform.ios) {
        view = (
          <View style={{ margin: 10, marginTop: 0 }}>
            <SmallText>
              Soon you'll be able to connect a Google Account or an Apple
              Account to access photos and link them with a specific day! Watch this space!
            </SmallText>
          </View>
        );
      } else {
        view = (
          <View style={{ margin: 10, marginTop: 0 }}>
            <SmallText>
              By linking a Google account, you will be able to add photos for
              specific days and view them. Watch this space!
            </SmallText>

            <TouchableOpacity onPress={() => this.signIn()}>
              <Image
                style={{ width: 200, resizeMode: "contain" }}
                source={require("../../assets/google_signin_btn.png")}
              />
            </TouchableOpacity>
          </View>
        );
      }
    }



    return (
      <Screen>
        <Header title="Settings" customBack={this.customBack} />
        <MedHeading style={{ textAlign: "left", margin: 10 }}>
          Connected Accounts
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

        <TouchableOpacity
          onPress={() => {
            Sharing.shareAsync(FileSystem.documentDirectory + 'SQLite/database.db')
          }}>
          <View style={{ margin: 10, marginTop: 0 }}>
            <SmallText>Export Data</SmallText>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => { this.showWarningModal() }}>
          <View style={{ margin: 10, marginTop: 0 }}>
            <SmallText>Import Data</SmallText>
          </View>
        </TouchableOpacity>
      </Screen>
    );
  }
}

