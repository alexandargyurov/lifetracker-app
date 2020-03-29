import React from "react";
import styled from "@emotion/native";
import { Image, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import t from "../assets/tachyons.css";
import { Ionicons } from "@expo/vector-icons";
import { ReasonIconText } from "../css/designSystem";

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
    if (this.props.viewOnly == false) {
      if (this.state.selected === false) {
        this.setState({ colour: "#FFE6C1", selected: true });
        this.props.reasonCallback(this.props.reasonId, true);
      } else {
        this.setState({ colour: "#FEF1E0", selected: false });
        this.props.reasonCallback(this.props.reasonId, false);
      }
    }
  };

  removeReason = () => {
    this.view.fadeOut(250)
    this.props.reasonCallback(this.props.reasonId);
  };

  buttonCallBack = () => {
    if (this.props.reasonsLength == this.props.position + 1) {
      this.props.buttonCallback()
    }
  };

  componentDidMount() {
    if (this.props.selected) this.setState({ colour: "#FFE6C1" });
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
          display: this.state.display
        }}
      >
        <TouchableOpacity onPress={this.onPress} disabled={this.props.viewOnly}>
          <Image
            style={{ width: 75, height: 75 }}
            source={{
              uri:
                "https://firebasestorage.googleapis.com/v0/b/life-tracker-app-c52bf.appspot.com/o/" +
                this.props.reason +
                ".png?alt=media"
            }}
          />
          <ReasonIconText style={[t.ttc, t.pt2]}>
            {this.props.reason.replace("-", " ").replace("-", " ")}
          </ReasonIconText>
        </TouchableOpacity>
        {removeButton}
      </Icon>
    );
  }
}

const Icon = Animatable.createAnimatableComponent(styled.View`
  display: flex;
  width: 33%;
  padding: 20px;
  align-items: center;
  justify-content: center;
`);

let RemoveButton = Animatable.createAnimatableComponent(styled.View`
  position: absolute;
  right: 0px;
  top: 0px;
`);
