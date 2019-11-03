import React from "react";
import {
    ScrollView,
    Text,
    View,
    TouchableOpacity
  } from "react-native";
import t from "../assets/tachyons.css";

export default class RoadmapScreen extends React.Component {
    static navigationOptions = {
      header: null
    };

    render() {
        return (
            <View>
                <Text style={[t.b, t.tc, t.f4]}>Life Tracker</Text>
                <Text style={[t.tc, t.f5]}>Development Roadmap</Text>
                <Text style={[t.tc, t.f5]}>Development Roadmap</Text>
            </View>
        )
    }
}