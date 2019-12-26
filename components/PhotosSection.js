import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import AppLink from 'react-native-app-link';
import { SmallHeading } from "../css/designSystem";
import { Feather } from "@expo/vector-icons";
import Database from "../Database";

export default class PhotosSection extends React.Component {
  constructor(props) {
    super(props);
    this.database = new Database();
    this.state = {
      modalVisible: false,
      photos: null,
      loaded: false
    };
  }

  componentDidMount() {
    this.database.db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM photos WHERE mood_id = (?);`,
        [this.props.moodId],
        (_, { rows: { _array } }) => {
          if (_array.length != 0) {
            this.setState({ photos: _array, loaded: true });
          }
        }
      );
    });
  }

  render() {
    let photos;
    if (this.state.loaded) {
      photos = this.state.photos.map((photo, key) => (
        <TouchableOpacity onPress={() => AppLink.maybeOpenURL(photo.product_url, {appName: "photos", playStoreId: 'com.google.android.apps.photos'})} key={key}>
          <Image
            style={{
              width: 98,
              height: 98,
              alignSelf: "center",
              marginTop: 2,
              marginRight: 2
            }}
            source={{ uri: photo.base_url }}
            key={key}
          />
        </TouchableOpacity>
      ));
    }

    return (
      <View
        style={{
          width: "85%",
          alignSelf: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20
        }}
      >
        <View style={{ width: "93%" }}>
          <SmallHeading>Photos:</SmallHeading>
          <View
            style={{ flexDirection: "row", flexWrap: "wrap", paddingTop: 15 }}
          >
            {photos}
          </View>
        </View>

        <TouchableOpacity onPress={() => console.log("edittt meeee")}>
          <Feather name="edit" size={24} color="#1B4751" />
        </TouchableOpacity>
      </View>
    );
  }
}
