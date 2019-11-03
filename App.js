import * as React from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";


import MoodScreen from "./pages/Mood";
import ReasonsScreen from "./pages/Reasons";
import CommonScreen from "./pages/Common";
import RoadmapScreen from "./pages/Roadmap";

import SideMenu from "./components/SideMenu"

import { SQLite } from "expo-sqlite";
import AboutScreen from "./pages/About";

const db = SQLite.openDatabase("database.db");

const StackNavigator = createStackNavigator(
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
    },
    Roadmap: {
      screen: RoadmapScreen
    },
    About: {
      screen: AboutScreen
    }
  },
  {
    initialRouteName: "About"
  }
);

const AppNavigator = createDrawerNavigator({
  Home: StackNavigator,
}, {
  contentComponent: SideMenu,
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
