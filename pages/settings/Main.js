import React from "react";
import { View, TouchableOpacity, Image, Modal } from "react-native";
import Header from "../../components/Header";
import { AdMobInterstitial } from "expo-ads-admob";
import { Linking } from "expo";
import Constants from "expo-constants";
import {
  Screen,
  MedHeading,
  LineSeperator,
  ButtonMain
} from "../../css/designSystem";
import { Entypo } from "@expo/vector-icons";
import SettingsButton from "../../components/SettingsButton";
import { onDidFailWithError } from "expo/build/AR";

export default class SettingsMain extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      view: null,
      user: null,
      modalVisible: false
    };
  }

  async showAd() {
    if (Constants.platform.ios) {
      AdMobInterstitial.setAdUnitID("ca-app-pub-6414919472390529/4656100505");
      await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: false });
      await AdMobInterstitial.showAdAsync();
    } else {
      AdMobInterstitial.setAdUnitID("ca-app-pub-6414919472390529/6324405398");
      await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: false });
      await AdMobInterstitial.showAdAsync();
    }
  }

  render() {
    return (
      <Screen>
        <Header title="Settings" back />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            flexWrap: "wrap"
          }}
        >
          <SettingsButton title="Accounts" icon="account-circle" />
          <SettingsButton title="Notifications" icon="notifications" />
        </View>

        <LineSeperator />

        <MedHeading style={{ margin: 10 }}>
          Want to support this project?
        </MedHeading>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL("https://www.buymeacoffee.com/alexandargyurov")
          }
          style={{ alignSelf: "center" }}
        >
          <Image
            style={{ width: 200, height: 50, borderRadius: 8, margin: 10 }}
            source={{
              uri: "https://cdn.buymeacoffee.com/buttons/lato-orange.png"
            }}
          />
        </TouchableOpacity>

        <MedHeading style={{ margin: 10 }}>or</MedHeading>

        <TouchableOpacity onPress={() => this.showAd()} style={{ margin: 10 }}>
          <View style={{backgroundColor: '#7e9cff', width: '57%', padding: 3, borderRadius: 15, alignSelf: 'center', flexDirection: 'row', justifyContent: 'center'}}>
            <Entypo name='megaphone' size={40} color='white'/>
            <MedHeading style={{ color: "white", alignSelf: 'center', marginLeft: 10 }}>Watch an ad!</MedHeading>
          </View>
        </TouchableOpacity>
      </Screen>
    );
  }
}
