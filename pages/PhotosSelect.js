import React from "react";
import { ScrollView, Text, View, Button, TouchableOpacity } from "react-native";
import { Screen, MedHeading } from "../css/designSystem";
import Header from "../components/Header";
import GooglePhoto from "../components/GooglePhoto";
import Auth from "../Authentication";
import ActionButton from "../components/ActionButton";
import { Ionicons } from "@expo/vector-icons";


export default class PhotosSelect extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: () => <MedHeading>Camera</MedHeading>,
      headerLeft: () => (
        <TouchableOpacity onPress={() => {navigation.goBack()}}>
          <Ionicons
            name="ios-arrow-back"
            size={32}
            color="#1B4751"
            style={{ marginLeft: 20 }}
          />
        </TouchableOpacity>
      )
    };
  };

  constructor(props) {
    super(props);
    this.auth = new Auth();
    this.state = {
      photos: null,
      photosLoaded: false
    };
  }

  async componentDidMount() {
    this.auth.checkUser();
    await this.getPhotos();
  }

  async getPhotos() {
    try {
      const response = await fetch(
        "https://photoslibrary.googleapis.com/v1/mediaItems?pageSize=99",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + (await this.auth.currentAccessToken())
          }
        }
      );
      const json = await response.json();
      this.setState({ photos: json.mediaItems, photosLoaded: true });
    } catch (error) {
      console.log("Error:", error);
    }
  }

  render() {
    let photos;

    if (this.state.photosLoaded) {
      photos = this.state.photos.map((photo, key) => (
        <GooglePhoto uri={photo.baseUrl} key={key} />
      ));
    } else {
      photos = <Text>Loading...</Text>;
    }

    return (
      <Screen style={{ paddingTop: 10, backgroundColor: "#FFF" }}>
        <ScrollView>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              marginBottom: 20
            }}
          >
            {photos}
          </View>
          <ActionButton buttonText="" />
        </ScrollView>
      </Screen>
    );
  }
}
