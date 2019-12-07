import React from "react";
import { TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { ButtonMain, ButtonText } from "../css/designSystem";
import * as Animatable from "react-native-animatable";

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
      <Animatable.View animation='fadeIn' easing='ease-in-out'>
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
      </Animatable.View>
    );
  }
}

export default withNavigation(ActionButton);
