import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppLoading } from 'expo';
import * as Font from 'expo-font'

import API from './src/api/Api';

import HomeScreen from './src/screens/HomeScreen'
import IntroductionScreen from './src/screens/IntroductionScreen'
import SpecificDaySreen from './src/screens/SpecificDayScreen';
import MoodScreen from './src/screens/MoodScreen';
import ReasonsSelectorScreen from './src/screens/ReasonsSelectorScreen';

import { Roboto_500Medium } from '@expo-google-fonts/roboto';

const Stack = createStackNavigator();



export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fontLoaded: false };
  }


  async componentDidMount() {
    await Font.loadAsync({
      'Roboto_500Medium': Roboto_500Medium,
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
      return (<NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="ReasonSelector" component={ReasonsSelectorScreen} />
          <Stack.Screen name="MoodScreen" component={MoodScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="SpecificDay" component={SpecificDaySreen} />
          <Stack.Screen name="Introduction" component={IntroductionScreen} />
        </Stack.Navigator>
      </NavigationContainer>)
    } else {
      return <AppLoading />
    }
  }
}
