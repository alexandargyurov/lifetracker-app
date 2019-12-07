import React from "react";
import Slider from "react-native-slider-custom";
import { View, Text, ImageBackground } from "react-native";
import { SliderThumb } from "../css/designSystem";
import ActionButton from "../components/ActionButton";
import Database from "../Database";
import { withNavigation } from 'react-navigation';
import * as Animatable from "react-native-animatable"

class SliderView extends React.Component {
  constructor(props) {
    super(props)
    this.database = new Database();
    this.buttonSubmit = this.buttonSubmit.bind(this);
    this.state = {
      value: 0.5,
      valueText: "OK"
    }
  }

  buttonSubmit() {
    this.database.db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO moods (mood) VALUES (?);`,
        [this.state.value],
        (tx, result) => {
          this.props.navigation.push("Reasons", {
            moodId: result.insertId,
            viewOnly: false
          });
        }
      );
    });
  }

  sliderUpdate(value) {
    this.setState({ value: value });
    if (value <= 0.2) {
      this.setState({ valueText: "Very bad" });
    } else if (value <= 0.4) {
      this.setState({ valueText: "Bad" });
    } else if (value <= 0.6) {
      this.setState({ valueText: "OK" });
    } else if (value <= 0.8) {
      this.setState({ valueText: "Good" });
    } else if (value <= 1) {
      this.setState({ valueText: "Very good" });
    }
  }

  render() {
    return (
      <Animatable.View animation='fadeIn' style={{ borderRadius: 30 }}>
        <ImageBackground
          source={require("../assets/gradientslider.jpg")}
          style={{ width: null, height: null, borderRadius: 30 }}
          imageStyle={{ borderRadius: 30 }}
        >
          <Slider
            trackStyle={{
              height: 20,
              borderRadius: 5,
              opacity: 0
            }}
            customThumb={
              <View
                style={{ display: "flex", alignItems: "center", width: 70 }}
              >
                <Text>{this.state.valueText}</Text>
                <SliderThumb />
              </View>
            }
            value={this.state.value}
            onValueChange={value => this.sliderUpdate(value)}
          />
        </ImageBackground>
        <ActionButton buttonText="Next" onPress={this.buttonSubmit} />
      </Animatable.View>
    );
  }
}

export default withNavigation(SliderView);