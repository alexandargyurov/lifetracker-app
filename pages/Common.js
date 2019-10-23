import React from "react"
import { ScrollView, Text, View, TouchableNativeFeedback } from "react-native"
import styled, { css } from "@emotion/native"
import ReasonsIcon from "../components/ReasonIcon"

import t from "../assets/tachyons.css";

export default class CommonScreen extends React.Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props)
        this.state = {}
    }
    
    render() {
        return (
            <ScrollView>
                <Container>
                    <Text>yo</Text>
                </Container>
            </ScrollView>
        )
    }
}

const Container = styled.View`
    flex: 1;
	background-color: #D97D54;
`