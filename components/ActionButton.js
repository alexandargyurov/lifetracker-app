import React from "react";
import { TouchableOpacity } from "react-native";
import { ButtonMain, ButtonText } from "../css/designSystem";

export default function ActionButton(props) {
  return (
    <TouchableOpacity
      onPress={() => props.onPress()}
      style={{
        display: "flex",
        justifyContent: "flex-end",
        flexDirection: "row",
        margin: 20
      }}
    >
      <ButtonMain>
        <ButtonText>{props.buttonText}</ButtonText>
      </ButtonMain>
    </TouchableOpacity>
  );
}
