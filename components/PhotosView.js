import React from "react";
import { Modal, TouchableOpacity, Image, View } from "react-native";
import GooglePhoto from "../components/GooglePhoto"

export default class PhotosView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
            <GooglePhoto uri={this.props.uri}/>
            <GooglePhoto uri={this.props.uri}/>
        </View>
    );
  }
}

