import React from "react";
import Slider from "react-native-slider-custom";
import { View, Text, ImageBackground } from "react-native";
import { SliderThumb, SmallText, SliderNib } from "../css/designSystem";
import ActionButton from "../components/ActionButton";
import Database from "../Database";
import { withNavigation } from "react-navigation";
import * as Animatable from "react-native-animatable";

class SliderView extends React.Component {
  constructor(props) {
    super(props);
    this.database = new Database();
    this.buttonSubmit = this.buttonSubmit.bind(this);
    this.state = {
      value: 0.5,
      valueText: "OK"
    };
  }

  buttonSubmit() {
    if (!this.props.selectedDate) {
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
    } else {
      this.buttonSubmitWithDate();
    }
  }

  buttonSubmitWithDate() {
    this.database.db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO moods (mood, timestamp) VALUES (?, ?);`,
        [this.state.value, this.props.selectedDate],
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
      <Animatable.View animation="fadeIn" style={{ borderRadius: 30 }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10}}>
          <SmallText style={{width: '20%', textAlign: 'center'}}>Terrible</SmallText>
          <SmallText style={{width: '20%', textAlign: 'center'}}>Bad</SmallText>
          <SmallText style={{width: '20%', textAlign: 'center'}}>OK</SmallText>
          <SmallText style={{width: '20%', textAlign: 'center'}}>Good</SmallText>
          <SmallText style={{width: '20%', textAlign: 'center'}}>Fantastic</SmallText>
        </View>
        <ImageBackground
          source={require("../assets/gradientslider.jpg")}
          style={{ width: null, height: null }}
          imageStyle={{ borderRadius: 20 }}
        >
          <Slider
            trackStyle={{
              height: 20,
              borderRadius: 5,
              opacity: 0
            }}
            customThumb={<SliderThumb/>}
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
