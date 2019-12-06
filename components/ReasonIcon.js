import React from "react";
import styled from "@emotion/native";
import { Text, Image, TouchableOpacity } from "react-native";
import t from "../assets/tachyons.css";
import { Ionicons } from "@expo/vector-icons";
import { ReasonIconText } from "../css/designSystem";

export default class ReasonIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = { display: "flex", colour: "", selected: this.props.selected || false };
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
    this.setState({ display: "none" });
    this.props.reasonCallback(this.props.reasonId);
  };

  componentDidMount() {
    if (this.props.selected) this.setState({colour: '#FFE6C1'})
  }

  render() {
    let removeButton;

    if (this.props.viewOnly && this.props.editable) {
      removeButton = (
        <RemoveButton>
          <TouchableOpacity onPress={this.removeReason}>
            <Ionicons name="md-close-circle" size={28} color="red" />
          </TouchableOpacity>
        </RemoveButton>
      );
    }

    return (
      <Icon
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
                "https://lifetracker.fra1.digitaloceanspaces.com/" +
                this.props.reason +
                ".png"
            }}
          />
          <ReasonIconText style={[t.ttc, t.pt2]}>
            {this.props.reason}
          </ReasonIconText>
        </TouchableOpacity>
        {removeButton}
      </Icon>
    );
  }
}

let Icon = styled.View`
  display: flex;
  width: 33%;
  padding: 20px;
  align-items: center;
`;

let RemoveButton = styled.View`
  position: absolute;
  right: 0px;
`;
