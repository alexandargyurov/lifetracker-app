import React from "react";
import Slider from "react-native-slider";
import { TouchableHighlight, StyleSheet, View, Text } from "react-native";

import Database from "../Database";

export default class MoodScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.database = new Database();
    this.state = {
      value: 0.5,
      switchValue: true
    };
  }

  _buttonSubmit(moodValue) {
    return new Promise((resolve, reject) => {
      this.database.db.transaction(tx => {
        tx.executeSql(
          `INSERT INTO moods (mood) VALUES (?);`,
          [moodValue],
          (tx, result) => {
            this.props.navigation.push("Reasons", {
              moodId: result.insertId
            });
          }
        );
      });
    });
  }

  render() {
    return (
      <View>
        <View style={styles.heading}>
          <Text style={styles.title}>Life Tracker</Text>
        </View>

        <View style={styles.moodContainer}>
          <View style={styles.moods}>
            <Text styles={{ width: 20 }}>Terrible</Text>
            <Text styles={{ width: 20 }}>Sad</Text>
            <Text styles={{ width: 20 }}>OK</Text>
            <Text styles={{ width: 20 }}>Happy</Text>
            <Text styles={{ width: 20 }}>Amazed</Text>
          </View>

          <View style={styles.slider}>
            <Slider
              value={this.state.value}
              onValueChange={value => this.setState({ value })}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableHighlight
              onPress={() => this._buttonSubmit(this.state.value)}
              underlayColor="white"
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>Next</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    paddingTop: 50,
    paddingBottom: 25
  },
  reasonsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  reason: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between"
  },
  buttonContainer: {
    alignItems: "flex-end"
  },
  button: {
    width: "25%",
    borderRadius: 4,
    alignItems: "center",
    backgroundColor: "#2196F3",
    marginRight: 20
  },
  buttonText: {
    textAlign: "center",
    padding: 20,
    color: "white"
  },
  buttonReasonText: {
    textAlign: "center",
    padding: 7,
    color: "white"
  },
  buttonReason: {
    width: "25%",
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#8134e5",
    marginRight: 20
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center"
  },
  moodContainer: {
    flex: 1,
    flexDirection: "column",
    marginTop: "40%"
  },
  moods: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  slider: {
    paddingLeft: 20,
    paddingRight: 20
  },
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignContent: "center"
  }
});
