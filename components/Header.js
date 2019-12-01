import React from "react";
import { TouchableOpacity } from "react-native";
import { SectionHeader, BigHeading } from "../css/designSystem";
import { withNavigation } from 'react-navigation';
import { Entypo } from "@expo/vector-icons";

function Header(props) {
  return (
    <SectionHeader>
      <TouchableOpacity style={{ width: "20%" }} onPress={props.navigation.openDrawer}>
        <Entypo name="menu" size={32} color="#1B4751" />
      </TouchableOpacity>

      <BigHeading style={{ width: "60%" }}>{props.title}</BigHeading>
      <Entypo name="menu" size={32} color="#FEF1E0" style={{ width: "20%" }} />
    </SectionHeader>
  );
}

export default withNavigation(Header);