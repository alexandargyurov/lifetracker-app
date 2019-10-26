import * as React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MoodScreen from "./pages/Mood";
import ReasonsScreen from "./pages/Reasons";
import CommonScreen from "./pages/Common";

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
