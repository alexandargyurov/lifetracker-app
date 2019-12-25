import React from "react";
import {
  ScrollView,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { Screen, MedHeading, SmallHeading } from "../css/designSystem";
import Header from "../components/Header";
import GooglePhoto from "../components/GooglePhoto";
import Auth from "../Authentication";
import ActionButton from "../components/ActionButton";
import { Ionicons } from "@expo/vector-icons";
import Database from "../Database";

export default class PhotosSelect extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.auth = new Auth();
    this.database = new Database();
    this.updateHeader = this.updateHeader.bind(this);
    this.addPhotoToDB = this.addPhotoToDB.bind(this);
    this.removePhotoFromDB = this.removePhotoFromDB.bind(this);
    this.mood_id = this.props.navigation.getParam("moodId", null);
    this.state = {
      photos: null,
      photosLoaded: false,
      selected: 0
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

  updateHeader(action) {
    if (action == "append") {
      this.setState({ selected: this.state.selected + 1 });
    } else {
      this.setState({ selected: this.state.selected - 1 });
    }
  }

  addPhotoToDB(photoId, photoUrl, baseUrl) {
    console.log("Adding photo");
    this.database.db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO photos (google_photo_id, product_url, base_url, mood_id) VALUES (?, ?, ?, ?);`,
        [photoId, photoUrl, baseUrl, this.mood_id]
      );
    });
  }

  removePhotoFromDB(photoId) {
    console.log("Removing photo");
    this.database.db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM photos WHERE google_photo_id = ? AND mood_id = ?;`,
        [photoId, this.mood_id]
      );
    });
  }

  render() {
    let photos;

    if (this.state.photosLoaded) {
      photos = this.state.photos.map((photo, key) => (
        <GooglePhoto
          uri={photo.baseUrl}
          photoId={photo.id}
          photoUrl={photo.productUrl}
          updateHeader={this.updateHeader}
          addPhotoToDB={this.addPhotoToDB}
          removePhotoFromDB={this.removePhotoFromDB}
          key={key}
        />
      ));
    } else {
      photos = <ActivityIndicator size="small" color="#00ff00" />;
    }

    let selectedText = (
      <MedHeading style={{ width: "60%", textAlign: "left", marginTop: 3 }}>
        Camera
      </MedHeading>
    );

    if (this.state.selected != 0)
      selectedText = (
        <View style={{ width: "80%", flexDirection: "row" }}>
          <SmallHeading style={{ marginTop: 3, width: "85%" }}>
            {this.state.selected} selected
          </SmallHeading>
        </View>
      );

    return (
      <View style={{ paddingTop: 10, backgroundColor: "#FFF" }}>
        <View
          style={{
            marginTop: 30,
            width: "100%",
            height: 50,
            flexDirection: "row",
            borderBottomWidth: 0.5
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.state.params.onGoBack()
              this.props.navigation.goBack();
            }}
            style={{ width: "15%" }}
          >
            <Ionicons
              name="ios-arrow-back"
              size={32}
              color="#1B4751"
              style={{ textAlign: "center" }}
            />
          </TouchableOpacity>
          {selectedText}
        </View>
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
      </View>
    );
  }
}
