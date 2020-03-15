import React from "react";
import Database from "../Database";

import { Screen } from "../css/designSystem";
import Header from "../components/Header";
import ActionButton from "../components/ActionButton";
import CalendarView from "../components/CalendarView";
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';

import { AsyncStorage } from "react-native";

export default class CommonScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.database = global.db;
    this.state = {
      drawerOpen: true
    };
  }

  async componentDidMount() {
    await this.database.fetchDatabase();
    // console.log(await AsyncStorage.getItem("@database"))

    // const selectedFile = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: true })
    // console.log(selectedFile)
    // await FileSystem.moveAsync({ from: selectedFile.uri, to: FileSystem.documentDirectory + 'SQLite/database.db' })
  }

  render() {
    return (
      <Screen>
        <Header title={"Overview"} />

        <CalendarView navigation={this.props.navigation} />
        <ActionButton buttonText={"New Record"} navigateTo={"Mood"} />
      </Screen>
    );
  }
}
