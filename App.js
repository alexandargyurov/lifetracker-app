import * as React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MoodScreen from "./pages/Mood";
import ReasonsScreen from "./pages/Reasons";
import CommonScreen from "./pages/Common";

import { SQLite } from "expo-sqlite";
const db = SQLite.openDatabase("db.db");

class HomeScreen extends React.Component {
    componentDidMount() {
      db.transaction(tx => {
        tx.executeSql(
          "create table if not exists mood_reasons (id integer primary key not null, mood_id int, reason_id int);"
        );

        tx.executeSql(
          "create table if not exists reasons (id integer primary key not null, label text);"
        );

        tx.executeSql(
          "create table if not exists moods (id integer primary key not null, mood int, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL);"
        );

        tx.executeSql("select * from moods", [], (trans, result) => {
          console.log("hello")
          console.log(trans, result)
        })
      });
    }

    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Home Screen</Text>
          <Button
            title="Go to Mood"
            onPress={() => this.props.navigation.push('Mood')}
          />
        </View>
      );
    }
  }

const AppNavigator = createStackNavigator(
  {
    Mood: {
      screen: MoodScreen
    },
    Reasons: {
      screen: ReasonsScreen,
      header: null,
    },
    Common: {
      screen: CommonScreen
    }
  },
  {
    initialRouteName: 'Mood',
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
