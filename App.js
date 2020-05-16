import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import API from './src/api/Api';

import HomeScreen from './src/screens/HomeScreen'
import IntroductionScreen from './src/screens/IntroductionScreen'
import SpecificDaySreen from './src/screens/SpecificDayScreen';
import MoodScreen from './src/screens/MoodScreen';

const Stack = createStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fontLoaded: false };
  }

  async componentDidMount() {
    const userExists = await API.userExists()
    if (!userExists) {
      API.initDatabase()
      API.updateLastActive()
    }
  }
  
  render() {
    return(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="MoodScreen" component={MoodScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="SpecificDay" component={SpecificDaySreen} />
          <Stack.Screen name="Introduction" component={IntroductionScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}
