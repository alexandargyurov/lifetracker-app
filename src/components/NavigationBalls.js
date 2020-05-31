import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import Colours from './patterns/Colours'
import { SafeAreaView } from 'react-native-safe-area-context';

export default class NavigationBalls extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <SafeAreaView>
          <BallsContainer>
            <Ball active={this.props.first} />
            <Ball active={this.props.second} />
          </BallsContainer>
        </SafeAreaView>
      </View>
    )
  }
}


const BallsContainer = styled.View`
  justify-content: center;
  flex-direction: row;
  margin-bottom: 15px;
`

const Ball = styled.View`
  width: 12px;
  height: 12px;
  margin: 5px;
  border-radius: 99px;
  border-width: 1px;
  border-color: ${Colours.light()};
  
  ${props => props.active ? "background-color:" + Colours.light() : ""}
`