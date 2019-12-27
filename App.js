import * as React from "react";
import * as Font from "expo-font";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";

import MoodScreen from "./pages/Mood";
import ReasonsScreen from "./pages/Reasons";
import CommonScreen from "./pages/Common";
import RoadmapScreen from "./pages/Roadmap";
import AboutScreen from "./pages/About";
import DayScreen from "./pages/Day";
import ExtraScreen from "./pages/Extra";
import PhotosSelect from "./pages/PhotosSelect"
import SettingsScreen from "./pages/Settings"

import SideMenu from "./components/SideMenu";
import Header from "./components/Header";

import Database from "./Database";

const StackNavigator = createStackNavigator(
  {
    Mood: {
      screen: MoodScreen
    },
    Reasons: {
      screen: ReasonsScreen
    },
    Extra: {
      screen: ExtraScreen
    },
    Common: {
      screen: CommonScreen
    },
    Roadmap: {
      screen: RoadmapScreen
    },
    About: {
      screen: AboutScreen
    },
    Day: {
      screen: DayScreen
    },
    Header: {
      screen: Header
    },
    PhotosSelect: {
      screen: PhotosSelect
    },
    Settings: {
      screen: SettingsScreen
    }
  },
  {
    initialRouteName: "Common"
  }
);

const AppNavigator = createDrawerNavigator(
  {
    Home: StackNavigator
  },
  {
    contentComponent: SideMenu
  }
);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fontLoaded: false };
  }

  async componentDidMount() {
    new Database().fetchDatabase();

    await Font.loadAsync({
      europaBold: require("./assets/fonts/europa-bold-webfont.ttf"),
      europaLight: require("./assets/fonts/europa-light-webfont.ttf"),
      europaRegular: require("./assets/fonts/europa-regular-webfont.ttf")
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    const AppContainer = createAppContainer(AppNavigator);
    return this.state.fontLoaded ? <AppContainer /> : null;
  }
}
