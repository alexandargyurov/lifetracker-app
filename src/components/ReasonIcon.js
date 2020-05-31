import React from "react";
import styled from 'styled-components/native'
import { Image, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import chroma from 'chroma-js'

import { Smaller } from '../components/patterns/Texts'

export default class ReasonIcon extends React.Component {
  handleViewRef = ref => this.view = ref;

  constructor(props) {
    super(props);
    this.state = {
      display: "flex",
      colour: "",
      selected: this.props.selected || false
    };
  }

  onPress = () => {
    if (this.props.viewOnly === false) {
      if (this.state.selected === false) {
        this.setState({ colour: chroma(this.props.backgroundColor).brighten(0.5), selected: true });
        this.props.addReasonCallback(this.props.reasonId);
      } else {
        this.setState({ colour: this.props.backgroundColor, selected: false });
        this.props.removeReasonCallback(this.props.reasonId);
      }
    }
  }

  componentDidMount() {
    if (this.props.selected) this.setState({ colour: chroma(this.props.backgroundColor).brighten(0.5) });
  }

  render() {
    return (
      <Icon
        animation="fadeIn"
        easing="ease-in-out"
        delay={this.props.position * 250}
        ref={this.handleViewRef}
        style={{
          backgroundColor: this.state.colour,
          display: this.state.display,
          borderRadius: 12,
        }}
      >
        <TouchableOpacity onPress={this.onPress} disabled={this.props.viewOnly} style={{ display: 'flex', alignItems: 'center' }}>
          <Image
            style={{ width: 75, height: 75 }}
            source={{
              uri:
                "https://firebasestorage.googleapis.com/v0/b/life-tracker-app-c52bf.appspot.com/o/" +
                this.props.reason +
                ".png?alt=media"
            }}
          />
          <Smaller lightColour bold style={{ marginTop: 10, textTransform: 'capitalize', textAlign: 'center' }}>
            {this.props.reason.replace("-", " ").replace("-", " ")}
          </Smaller>
        </TouchableOpacity>
      </Icon>
    );
  }
}

const Icon = Animatable.createAnimatableComponent(styled.View`
  display: flex;
  width: 31.5%;
  padding: 20px;
  margin: 3px;
  align-items: center;
  justify-content: center;
`);


