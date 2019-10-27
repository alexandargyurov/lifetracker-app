import * as React from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import MoodScreen from "./pages/Mood";
import ReasonsScreen from "./pages/Reasons";
import CommonScreen from "./pages/Common";

import { SQLite } from "expo-sqlite";
const db = SQLite.openDatabase("database.db");

const AppNavigator = createStackNavigator(
  {
    Mood: {
      screen: MoodScreen
    },
    Reasons: {
      screen: ReasonsScreen,
      header: null
    },
    Common: {
      screen: CommonScreen
    }
  },
  {
    initialRouteName: "Common"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  componentDidMount() {
    db.transaction(tx => {
      tx.executeSql(
        "create table if not exists mood_reasons (id integer primary key not null, mood_id int, reason_id int);"
      );

      tx.executeSql(
        "create table if not exists reasons (id integer primary key not null, label text, UNIQUE(label));"
      );

      tx.executeSql(
        "create table if not exists moods (id integer primary key not null, mood int, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL);"
      );

      tx.executeSql(
        `INSERT OR IGNORE INTO reasons (label) values 
        ('friends'),
        ('family'),
        ('walking'),
        ('exercise'),
        ('travel'),
        ('alcohol'),
        ('dancing'),
        ('work'),
        ('colleagues'),
        ('movies'),
        ('business'),
        ('reading'),
        ('music'),
        ('concert'),
        ('gig'),
        ('driving'),
        ('eating-out'),
        ('tea'),
        ('coffee'),
        ('home'),
        ('love'),
        ('meditation'),
        ('yoga'),
        ('video-games'),
        ('board-games');
        `
      );
    });
  }

  render() {
    return <AppContainer />;
  }
}
