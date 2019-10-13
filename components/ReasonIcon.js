import React from "react";
import styled from "@emotion/native"
import { Text, Image, TouchableOpacity } from "react-native"
import t from "../assets/tachyons.css";

class ReasonIcon extends React.Component {
    constructor(props) {
        super(props)
        this.state = {colour: "", selected: false}
    }

    onPress = () => {
        if (this.state.selected === false) {
            this.setState({colour: "#EA8F66", selected: true});
        } else {
            this.setState({colour: "#D97D54", selected: false}); 
        }
      };

    render () {
        return (
            <Icon style={{backgroundColor: this.state.colour}}>
                <TouchableOpacity onPress={this.onPress}>
                    <Image style={{width: 75, height: 75}} source={{uri: 'https://lifetracker.fra1.digitaloceanspaces.com/' + this.props.reason + '.png'}}/>
                    <Text style={[t.tc, t.ttc, t.white, t.b, t.pt2]}>{this.props.reason}</Text>
                </TouchableOpacity>
            </Icon>  
        )
    }
}

export default ReasonIcon;

let Icon = styled.View`
    display: flex;
    width: 33%;
    padding: 20px;
    align-items: center;
`
