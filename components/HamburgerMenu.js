import React from "react";
import Drawer from "react-native-drawer";
import styled from "@emotion/native";
import { Text, Image, TouchableOpacity } from "react-native";
import t from "../assets/tachyons.css";

export default class HamburgerMenu extends React.Component {
    render() {
        return (
            <Menu>
                <Text>About</Text>
            </Menu>
        );
    }
}

const Menu = styled.View`
    margin-top: 80px;
    background-color: yellow;
`;