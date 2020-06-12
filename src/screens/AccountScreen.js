import React from 'react';
import { TouchableOpacity, View, Alert } from 'react-native';
import styled from 'styled-components/native'
import Colours from '../components/patterns/Colours'

import { Asset } from 'expo-asset';
import { Divider } from 'react-native-paper';

import * as WebBrowser from 'expo-web-browser';

import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';

const feedback_link = "https://docs.google.com/forms/d/e/1FAIpQLScdIyRF2p-iA59fky9YxQvX_l1jLZea0Scji6GOPkrHH7cU-g/viewform"
const bug_link = "https://docs.google.com/forms/d/e/1FAIpQLSeKAXaZ5_98nh13m9bT3WvMmfABqvnj4zrAf7TnDYHLwabQnw/viewform"
const github_link = "https://github.com/alexandargyurov/lifetracker-app"

export default class AccountScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  sendNotification(e) {
    if (Constants.platform.android) {
      Notifications.createChannelAndroidAsync('life-tracker-reminder', {
        name: 'Life Tracker Reminder',
        sound: true,
      });
    }

    const imageURI = Asset.fromModule(require('../../assets/icon.png')).uri;

    const localNotification = {
      title: 'How did today go?',
      body: 'Write down how your day went so you can keep track of your feelings and moods.',
      ios: {
        sound: true
      },
      android: {
        channelId: 'life-tracker-reminder'
      }
    };

    const schedulingOptions = {
      time: (new Date()).getTime() + 5000
    }

    Notifications.scheduleLocalNotificationAsync(
      localNotification, schedulingOptions
    );
  }

  handleNotification() {
    console.warn('ok! got your notif');
  }

  async componentDidMount() {
    let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    if (Constants.isDevice && result.status === 'granted') {
      console.log('Notification permissions granted.')
    }

    // If we want to do something with the notification when the app
    // is active, we need to listen to notification events and 
    // handle them in a callback
    Notifications.addListener(this.handleNotification);
  }

  async replaceDatabase() {
    let selectedFile = await DocumentPicker.getDocumentAsync()

    await FileSystem.deleteAsync(FileSystem.documentDirectory + 'SQLite/' + global.dbName)
    return selectedFile
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
              await AsyncStorage.setItem("@database:name", newDBName);

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

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Colours.purple() }}>
        <TouchableOpacity style={{ width: '100%', padding: 20 }} onPress={() => this.sendNotification()}>
          <SubHeader>Notifications - (WIP)</SubHeader>
          <Description>Receive daily reminders to write how your day went. Currently in development.</Description>
        </TouchableOpacity>

        <Divider style={{ marginLeft: 20, marginRight: 20, backgroundColor: '#FFF1EA', height: 1.5 }} />

        <TouchableOpacity style={{ width: '70%', padding: 20 }} onPress={() => Sharing.shareAsync(FileSystem.documentDirectory + 'SQLite/database.db')}>
          <SubHeader>Export Data</SubHeader>
          <Description>Copy and save your data locally</Description>
        </TouchableOpacity>

        {/* <TouchableOpacity style={{ width: '70%', padding: 20 }} onPress={() => this.showWarningModal()}>
          <SubHeader>Import Data</SubHeader>
          <Description>Import previously exported data</Description>
        </TouchableOpacity> */}

        <Divider style={{ marginLeft: 20, marginRight: 20, backgroundColor: '#FFF1EA', height: 1.5 }} />

        <TouchableOpacity style={{ width: '80%', padding: 20 }} onPress={() => WebBrowser.openBrowserAsync(feedback_link)}>
          <SubHeader>Feedback</SubHeader>
          <Description>Send feedback on any aspects of the app</Description>
        </TouchableOpacity>

        <TouchableOpacity style={{ width: '80%', padding: 20 }} onPress={() => WebBrowser.openBrowserAsync(bug_link)}>
          <SubHeader>Report a bug</SubHeader>
          <Description>Any issues? Submit a bug report here</Description>
        </TouchableOpacity>

        <Divider style={{ marginLeft: 20, marginRight: 20, backgroundColor: '#FFF1EA', height: 1.5 }} />

        <TouchableOpacity style={{ width: '80%', padding: 20 }} onPress={() => WebBrowser.openBrowserAsync(github_link)}>
          <TinyText>Version: v1.0.1</TinyText>
          <TinyText>License: GPL v3.0</TinyText>
        </TouchableOpacity>

      </View >


    )
  }
}


const TinyText = styled.Text`
  font-family: Regular;
  font-size: 12px;
  color: #FFF1EA;

`

const SubHeader = styled.Text`
  font-family: Medium;
  color: #FFF1EA;
  font-size: 18px;
`

const Description = styled.Text`
  font-family: Regular;
  color: #FFF1EA;
  font-size: 14px;
`

const MoodWeekContainer = styled.View`
  display: flex;
  height: 150px;
  padding: 18px;
  background-color: #FFF1EA;
  border-radius: 12px;
  margin: 12px;
`