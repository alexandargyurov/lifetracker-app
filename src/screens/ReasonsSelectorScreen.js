import React from 'react';
import { ScrollView, View } from 'react-native';
import ReasonIcon from '../components/ReasonIcon'
import { TouchableOpacity } from "react-native";
import Reasons from '../models/ReasonsModel'
import styled from 'styled-components/native'
import { FontAwesome5 } from '@expo/vector-icons';
import { ButtonOnlyIcon } from '../components/patterns/Buttons'
import Colours from '../components/patterns/Colours'

export default class ReasonsSelectorScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { reasons: [] };
  }

  async componentDidMount() {
    reasons = await Reasons.all()
    this.setState({ reasons: reasons })
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Colours.purple() }}>
        <ScrollView style={{ backgroundColor: Colours.purple() }}>
          <Container>
            {this.state.reasons.map((reason, key) => (
              <ReasonIcon
                reason={reason.name}
                reasonId={reason.id}
                reasonCallback={(v) => console.log(v)}
                viewOnly={false}
                selected={false}
                key={key}
              />
            ))}
          </Container>
        </ScrollView>

        <TouchableOpacity style={{ position: 'absolute', right: 20, bottom: 20 }}>
          <ButtonOnlyIcon></ButtonOnlyIcon>
        </TouchableOpacity>
      </View>

    )
  }
}

const Container = styled.View`
  display: flex;
  background-color: #585A79;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 90px;
`
