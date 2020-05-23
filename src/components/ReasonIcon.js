import React from "react";
import styled from 'styled-components/native'
import { Image, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";
import chroma from 'chroma-js'

import { Smaller } from '../components/patterns/Texts'

export default class ReasonIcon extends React.Component {
  handleViewRef = ref => this.view = ref;

  constructor(props) {
    super(props);
    this.buttonCallBack = this.buttonCallBack.bind(this)
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
        this.props.reasonCallback(this.props.reasonId, true);
      } else {
        this.setState({ colour: this.props.backgroundColor, selected: false });
        this.props.reasonCallback(this.props.reasonId, false);
      }
    }
  }

  removeReason = () => {
    this.view.fadeOut(250)
    this.props.reasonCallback(this.props.reasonId);
  }

  buttonCallBack = () => {
    if (this.props.reasonsLength == this.props.position + 1) {
      this.props.buttonCallback()
    }
  }

  componentDidMount() {
    if (this.props.selected) this.setState({ colour: "#4E506F" });
  }

  render() {
    let removeButton;

    if (this.props.viewOnly && this.props.editable) {
      removeButton = (
        <RemoveButton animation="fadeIn">
          <TouchableOpacity onPress={this.removeReason}>
            <Ionicons name="md-close-circle" size={28} color="red" />
          </TouchableOpacity>
        </RemoveButton>
      );
    }

    return (
      <Icon
        animation="fadeIn"
        easing="ease-in-out"
        onAnimationEnd={endState => this.buttonCallBack()}
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
        {removeButton}
      </Icon>
    );
  }
}

const Icon = Animatable.createAnimatableComponent(styled.View`
  display: flex;
  width: 30%;
  padding: 20px;
  margin: 3px;
  align-items: center;
  justify-content: center;
`);

const RemoveButton = Animatable.createAnimatableComponent(styled.View`
  position: absolute;
  right: 0px;
  top: 0px;
`);

