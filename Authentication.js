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
    const refreshToken = await this.getRefreshToken();
    const refreshedSession = await AppAuth.refreshAsync(config, refreshToken);
    SecureStore.setItemAsync("accessToken", refreshedSession.accessToken);
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

      const date = moment().format()
      await SecureStore.setItemAsync("accessToken", accessToken);
      await SecureStore.setItemAsync("refreshToken", refreshToken);
      await SecureStore.setItemAsync("user", JSON.stringify(user));
      await SecureStore.setItemAsync("expiry", date);

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

    await SecureStore.deleteItemAsync("accessToken")
    await SecureStore.deleteItemAsync("refreshToken")
    await SecureStore.deleteItemAsync("user")
    await SecureStore.deleteItemAsync("expiry")
    return null
  }

  async checkIfTokenExpired() {
    let expiry_date = await this.getExpiryDate();

    if (moment().diff(moment(expiry_date), 'h') >= 1) {
      return true
    } else {
      return false
    }
  }

  async signInRequired() {
    let user = await SecureStore.getItemAsync("user");

    if (user) {
      if (this.checkIfTokenExpired()) {
        this.refreshToken();

      }
    } else {
      this.signIn();
    }
  }

  async getUser() {
    let session = await this.getAccessToken()

    if (session) {
      if (await this.checkIfTokenExpired()) {
        await this.refreshToken();
        return await this.buildUser()
      } else {
        return await this.buildUser()
      }
    }
  }

  async buildUser() {
    return {
      info: await this.getUserInfo(),
      accessToken: await this.getAccessToken(),
      refreshToken: await this.getRefreshToken(),
    }
  }

  async getUserInfo() {
    try {
      const user = await SecureStore.getItemAsync("user");
      return JSON.parse(user);
    } catch (e) {
      console.log(e);
    }
  }

  async getAccessToken() {
    try {
      return await SecureStore.getItemAsync("accessToken");
    } catch (e) {
      console.log(e);
    }
  }

  async getRefreshToken() {
    try {
      return await SecureStore.getItemAsync("refreshToken");
    } catch (e) {
      console.log(e);
    }
  }

  async getExpiryDate() {
    try {
      const expiry_date = await SecureStore.getItemAsync("expiry")
      return expiry_date;
    } catch (e) {
      console.log(e);
    }
  }
}
