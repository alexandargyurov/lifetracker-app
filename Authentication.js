import * as Google from "expo-google-app-auth";
import * as SecureStore from "expo-secure-store";
import axios from 'axios';

export default class Auth {
  constructor() {
    this.checkUser = this.checkUser.bind(this);
  }

  async refreshToken() {
    console.log("Refreshing Token");
    await axios.post("/oauth2/v4/token", {
      client_id:
        "410790811034-cehmk6vvq57fdcffdads426120au0a1v.apps.googleusercontent.com"
    })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
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
        refreshToken: refreshToken
      };
      SecureStore.setItemAsync("user", JSON.stringify(sessionUser));
    } else {
      console.log("Failed");
      // TODO: Provide a error message
    }
  }

  async checkUser() {
    let user = await SecureStore.getItemAsync("user");

    if (user) {
      // await this.signIn();
    } else {
      // Login
      this.signIn();
    }
  }

  async currentUser() {
    try {
      let session = await SecureStore.getItemAsync("user");
      return JSON.parse(session);
    } catch (e) {
      console.log(e);
    }
  }

  async currentAccessToken() {
    try {
      let session = await SecureStore.getItemAsync("user");
      let parsedSession = JSON.parse(session);
      return parsedSession.accessToken;
    } catch (e) {
      console.log(e);
    }
  }

  async currentRefreshToken() {
    try {
      let session = await SecureStore.getItemAsync("user");
      let parsedSession = JSON.parse(session);
      return parsedSession.refreshToken;
    } catch (e) {
      console.log(e);
    }
  }
}
