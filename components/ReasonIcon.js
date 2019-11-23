import React from "react";
import styled from "@emotion/native";
import { Text, Image, TouchableOpacity } from "react-native";
import t from "../assets/tachyons.css";
import { Ionicons } from "@expo/vector-icons";

class ReasonIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = { display: "flex", colour: "", selected: false };
  }

  onPress = () => {
    if (this.props.viewOnly == false) {
      if (this.state.selected === false) {
        this.setState({ colour: "#EA8F66", selected: true });
        this.props.reasonCallback(this.props.reasonId, true);
      } else {
        this.setState({ colour: "#D97D54", selected: false });
        this.props.reasonCallback(this.props.reasonId, false);
      }
    }
  };

  removeReason = () => {
    this.setState({ display: "none" });
    this.props.reasonCallback(this.props.reasonId);
  };

  render() {
    let removeButton;

    if (this.props.viewOnly) {
      removeButton = (
        <RemoveButton>
          <TouchableOpacity onPress={this.removeReason}>
            <Ionicons name="md-close-circle" size={28} color="red" />
          </TouchableOpacity>
        </RemoveButton>
      );
    }

    return (
      <Icon style={{ backgroundColor: this.state.colour, display: this.state.display }}>
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
          <Text style={[t.tc, t.ttc, t.white, t.b, t.pt2]}>
            {this.props.reason}
          </Text>
        </TouchableOpacity>
        {removeButton}
      </Icon>
    );
  }
}

export default ReasonIcon;

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
