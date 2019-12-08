import React from "react";
import { TouchableOpacity } from "react-native";
import { SectionHeader, BigHeading } from "../css/designSystem";
import { withNavigation } from "react-navigation";
import { Entypo, Ionicons } from "@expo/vector-icons";

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.buttonAction = this.buttonAction.bind(this);
    this.state = {
      goingTo: null
    }
  }

  buttonAction() {
    if (this.props.backButton) {
      return this.props.navigation.goBack()
    } else if (this.props.customBack) {
      return this.props.customBack()
    } else {
      return this.props.navigation.openDrawer()
    }
  }

  render() {
    let button;

    if (this.props.backButton) {
      button = <Ionicons name="ios-arrow-back" size={32} color="#1B4751" style={{marginLeft: 10}}/>
    } else if (this.props.customBack) {
      button = <Ionicons name="ios-arrow-back" size={32} color="#1B4751" style={{marginLeft: 10}}/>
    } else {
      button = <Entypo name="menu" size={32} color="#1B4751" />
    }

    return (
      <SectionHeader animation='fadeIn'>
        <TouchableOpacity
          style={{ width: "20%" }}
          onPress={this.buttonAction.bind()}
        >
          {button}
        </TouchableOpacity>

        <BigHeading style={{ width: "60%" }}>{this.props.title}</BigHeading>
        <Entypo
          name="menu"
          size={32}
          color="#FEF1E0"
          style={{ width: "20%" }}
        />
      </SectionHeader>
    );
  }
}

export default withNavigation(Header);
