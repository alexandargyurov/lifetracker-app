import React from 'react';
import { TouchableOpacity, StatusBar } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FontAwesome5 } from '@expo/vector-icons';

import { AppLoading } from 'expo';
import * as Font from 'expo-font'

import API from './src/api/Api';

import HomeScreen from './src/screens/HomeScreen'
import IntroductionScreen from './src/screens/IntroductionScreen'
import SpecificDaySreen from './src/screens/SpecificDayScreen';
import MoodScreen from './src/screens/MoodScreen';
import ReasonsSelectorScreen from './src/screens/ReasonsSelectorScreen';
import StatisticsScreen from './src/screens/StatisticsScreen';
import AccountScreen from './src/screens/AccountScreen';
import ExtrasScreen from './src/screens/ExtrasScreen';
import Colours from './src/components/Colours'

import {
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold
} from '@expo-google-fonts/roboto';

const Stack = createStackNavigator()
const Tab = createMaterialTopTabNavigator();

const screenOptions = {
  headerTitleAlign: 'center',
  headerTitleStyle: {
    color: '#FFF1EA',
    fontWeight: 'bold',
    fontSize: 22
  },
  headerStyle: {
    backgroundColor: Colours.purple(),
    shadowColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0
  }
}

const accountScreenButton = (navigation) => {
  return (
    <TouchableOpacity onPress={() => navigation.push('Account')} style={{ padding: 10, marginRight: 8 }} >
      <FontAwesome5 name="user-circle" size={24} color="#FFEBE1" />
    </TouchableOpacity>
  )
}

function TabStack() {
  return (
    <Tab.Navigator initialRouteName="Analytics" tabBarPosition={'bottom'} tabBarOptions={{ style: { position: 'absolute' } }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="MoodScreen" component={StatisticsScreen} />
    </Tab.Navigator>
  )
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fontLoaded: false };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Roboto_400Regular': Roboto_400Regular,
      'Roboto_500Medium': Roboto_500Medium,
      'Roboto_700Bold': Roboto_700Bold,
      'Roboto_300Light': Roboto_300Light
    })

    this.setState({ fontsLoaded: true })

    const userExists = await API.userExists()
    if (!userExists) {
      API.initDatabase()
      API.updateLastActive()
    }
  }

  render() {
    if (this.state.fontsLoaded) {
      return (
        <NavigationContainer>
          <StatusBar barStyle="light-content" backgroundColor={Colours.purple()} />
          <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="Home" options={({ navigation, route }) => ({ title: 'Overview', headerRight: () => accountScreenButton(navigation) })} >
              {() => TabStack()}
            </Stack.Screen>
            <Stack.Screen name="Account" component={AccountScreen} />
            <Stack.Screen name="Mood" component={MoodScreen} />
            <Stack.Screen name="Extra" component={ExtrasScreen} />
            <Stack.Screen name="ReasonSelector" component={ReasonsSelectorScreen} />
            <Stack.Screen name="SpecificDay" component={SpecificDaySreen} />
            <Stack.Screen name="Introduction" component={IntroductionScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      )
    } else {
      return <AppLoading />
    }
  }
}
