import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import SocialButton from "./components/SocialButton";

import { REACT_APP_WEB_CLIENT_ID } from "@env";

WebBrowser.maybeCompleteAuthSession();

const App = () => {
  const [accessToken, setAccessToken] = useState();
  const [userInfo, setUserInfo] = useState();

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: REACT_APP_WEB_CLIENT_ID,
  });

  useEffect(() => {
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
    }
  }, [response]);

  const getUserData = async () => {
    let userInfoResponse = await fetch(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    userInfoResponse.json().then((data) => {
      setUserInfo(data);
    });
  };

  const showUserInfo = () => {
    return (
      <View style={styles.userInfo}>
        <Image source={{ uri: userInfo.picture }} style={styles.profilePic} />
        <Text>Welcome {userInfo.name}</Text>
        <Text>{userInfo.email}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {userInfo && showUserInfo()}
      <SocialButton
        title={accessToken ? "Get User Data" : "Continue with Google "}
        onPress={
          accessToken
            ? getUserData
            : () => {
                promptAsync({ useProxy: false, showInRecents: true });
              }
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff4081",
    alignItems: "center",
    justifyContent: "center",
  },
  userInfo: {
    alignItems: "center",
    justifyContent: "center",
  },
  profilePic: {
    width: 70,
    height: 70,
  },
});

export default App;
