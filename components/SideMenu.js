import React from "react";
import styled from "@emotion/native";
import { Text, Image, TouchableOpacity, View } from "react-native";
import t from "../assets/tachyons.css";

export default class SideMenu extends React.Component {
    render() {
        return (
            <Drawer>
                <Menu>
                    <Text style={[t.b, t.tc, t.f3, t.pa2]}>Life Tracker</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("About")}>
                        <Text style={[t.tc, t.f5, t.mt2]}>About</Text>
                    </TouchableOpacity>

                    <Footer>
                        <Text>An Open Source Project</Text>
                        <Text>v0.1.1</Text>
                    </Footer>
                    
                </Menu>
            </Drawer>
        );
    }
}

const Drawer = styled.View`
    flex: 1;
`;

const Menu = styled.View`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
`;

const Footer = styled.View`
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 36;
`;