import * as Google from "expo-google-app-auth";
import * as SecureStore from "expo-secure-store";
import * as AppAuth from "expo-app-auth";
import moment from "moment";
import axios from "axios";

const config = {
  issuer: "https://accounts.google.com",
  clientId: "410790811034-fa6hdle89o9eo6gdtpgfph7vegqgjtnt.apps.googleusercontent.com",
  scopes: ["https://www.googleapis.com/auth/photoslibrary.readonly"]
};

export default class Auth {
  constructor() {
    this.signInRequired = this.signInRequired.bind(this);
  }

  async refreshToken() {
    let refreshToken = await this.getRefreshToken();
    const authState = await AppAuth.refreshAsync(config, refreshToken);
    console.log("refreshAuthAsync", authState);
  }

  async signIn() {
    const { type, accessToken, refreshToken, user } = await Google.logInAsync({
      androidClientId: `410790811034-fa6hdle89o9eo6gdtpgfph7vegqgjtnt.apps.googleusercontent.com`,
      androidStandaloneAppClientId: `410790811034-b38njme8u8cr1mq2ihnl7tg8soue68it.apps.googleusercontent.com`,
      scopes: ["https://www.googleapis.com/auth/photoslibrary.readonly"]
    });

    if (type === "success") {
      let sessionUser = {
        info: user,
        accessToken: accessToken,
        refreshToken: refreshToken,
        expiry: new Date()
      };
      SecureStore.setItemAsync("user", JSON.stringify(sessionUser));
      return sessionUser
    } else {
      console.log(type, "Failed");
      return null      
    }
  }

  async signOut() {
    let accessToken = await this.getAccessToken()

    await AppAuth.revokeAsync(config, {
      token: accessToken,
      isClientIdProvided: true,
    });

    await SecureStore.deleteItemAsync("user")
    return null
  }

  async checkIfTokenExpired() {
    let expiry_date = await this.getExpiryDate();
    return moment(expiry_date).add(1, "hours") > new Date();
  }

  async signInRequired() {
    let user = await SecureStore.getItemAsync("user");

    if (user) {
      if (this.checkIfTokenExpired()) {
        console.log("New token needed")
        this.refreshToken();
      }
    } else {
      this.signIn();
    }
  }

  async getUser() {
    try {
      let session = await SecureStore.getItemAsync("user");
      return JSON.parse(session);
    } catch (e) {
      return null
    }
  }

  async getAccessToken() {
    try {
      let session = await SecureStore.getItemAsync("user");
      let parsedSession = JSON.parse(session);
      return parsedSession.accessToken;
    } catch (e) {
      console.log(e);
    }
  }

  async getRefreshToken() {
    try {
      let session = await SecureStore.getItemAsync("user");
      let parsedSession = JSON.parse(session);
      return parsedSession.refreshToken;
    } catch (e) {
      console.log(e);
    }
  }

  async getExpiryDate() {
    try {
      let session = await SecureStore.getItemAsync("user");
      let parsedSession = JSON.parse(session);
      return parsedSession.expiry;
    } catch (e) {
      console.log(e);
    }
  }
}
