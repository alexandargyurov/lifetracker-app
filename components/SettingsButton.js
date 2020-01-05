import React from "react";
import { View, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { SmallHeading } from "../css/designSystem";
import { MaterialIcons } from "@expo/vector-icons";

class SettingsButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.push(this.props.navTo)} style={{width: "50%"}}>
        <View
          style={{
            height: 180,
            margin: 5,
            backgroundColor: "rgba(255, 230, 192, 0.5)",
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <MaterialIcons name={this.props.icon} size={90} color="#1B4751" />
          <SmallHeading style={{ margin: 10 }}>{this.props.title}</SmallHeading>
        </View>
      </TouchableOpacity>
    );
  }
}

export default withNavigation(SettingsButton);
