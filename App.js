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
import ReasonsSelectorScreen from './src/screens/ReasonsScreen';
import StatisticsScreen from './src/screens/StatisticsScreen';
import AccountScreen from './src/screens/AccountScreen';
import ExtrasScreen from './src/screens/ExtrasScreen';
import Colours from './src/components/patterns/Colours'

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
  },
  headerBackTitleStyle: {
    display: 'none'
  },
  headerTintColor: 'white',
}

const accountScreenButton = (navigation) => {
  return (
    <TouchableOpacity onPress={() => navigation.push('Account')} style={{ padding: 10, marginLeft: 8 }} >
      <FontAwesome5 name="user-circle" size={24} color="#FFEBE1" />
    </TouchableOpacity>
  )
}

function TabStack() {
  return (
    <Tab.Navigator initialRouteName="Analytics" tabBarPosition={'bottom'} tabBarOptions={{ style: { position: 'absolute' } }} >
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
      'Light': Roboto_300Light,
      'Regular': Roboto_400Regular,
      'Medium': Roboto_500Medium,
      'Bold': Roboto_700Bold
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
          <Stack.Navigator screenOptions={screenOptions} >
            <Stack.Screen name="Home" options={({ navigation, route }) => ({ title: 'Overview', headerLeft: () => accountScreenButton(navigation) })} >
              {() => TabStack()}
            </Stack.Screen>
            <Stack.Screen name="Account" component={AccountScreen} />
            <Stack.Screen name="Mood" component={MoodScreen} options={{ title: "How did today go?" }} />
            <Stack.Screen name="Extra" component={ExtrasScreen} options={{ title: "Add anything else?" }} initialParams={{ backgroundColor: Colours.purple() }} />
            <Stack.Screen name="Reasons" component={ReasonsSelectorScreen} options={{ title: "Why's that?" }} />
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
