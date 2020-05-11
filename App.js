import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import API from './api/Api';

import HomeScreen from './screens/HomeScreen'


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

    // await Font.loadAsync({
    //   europaBold: require("./assets/fonts/europa-bold-webfont.ttf"),
    //   europaLight: require("./assets/fonts/europa-light-webfont.ttf"),
    //   europaRegular: require("./assets/fonts/europa-regular-webfont.ttf")
    // });

    // this.setState({ fontLoaded: true });
  }

  render() {
    return(
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    )
  }
}
