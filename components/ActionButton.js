import React from "react";
import { TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { ButtonMain, ButtonText } from "../css/designSystem";

class ActionButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onPress: null
    };
  }

  buttonAction() {
    if (this.props.onPress) {
      return this.props.onPress();
    } else {
      return this.props.navigation.push(this.props.navigateTo);
    }
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => this.buttonAction()}
        style={{
          display: "flex",
          justifyContent: "flex-end",
          flexDirection: "row",
          margin: 20
        }}
      >
        <ButtonMain>
          <ButtonText>{this.props.buttonText}</ButtonText>
        </ButtonMain>
      </TouchableOpacity>
    );
  }
}

export default withNavigation(ActionButton);
