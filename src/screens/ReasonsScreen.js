import React from 'react';
import { ScrollView, View } from 'react-native';
import ReasonIcon from '../components/ReasonIcon'
import { TouchableOpacity } from "react-native";
import Reasons from '../models/ReasonsModel'
import styled from 'styled-components/native'
import { FontAwesome5 } from '@expo/vector-icons';
import { ButtonOnlyIcon } from '../components/patterns/Buttons'
import Colours from '../components/patterns/Colours'

export default class ReasonsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { reasons: [] };
  }

  async componentDidMount() {
    reasons = await Reasons.all()
    this.setState({ reasons: reasons })

    this.props.navigation.setOptions({
      headerStyle: {
        backgroundColor: this.props.route.params.backgroundColor,
        shadowColor: 'transparent',
        shadowOpacity: 0,
        elevation: 0
      }
    })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ backgroundColor: this.props.route.params.backgroundColor }}>
          <Container>
            {this.state.reasons.map((reason, key) => (
              <ReasonIcon
                reason={reason.name}
                reasonId={reason.id}
                reasonCallback={(v) => console.log(v)}
                viewOnly={false}
                selected={false}
                backgroundColor={this.props.route.params.backgroundColor}
                key={key}
              />
            ))}
          </Container>
        </ScrollView>

        <TouchableOpacity style={{ position: 'absolute', right: 20, bottom: 20 }}>
          <ButtonOnlyIcon onPress={() => this.props.navigation.push('Extra', { backgroundColor: this.props.route.params.backgroundColor })} />
        </TouchableOpacity>
      </View>

    )
  }
}

const Container = styled.View`
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 90px;
`
