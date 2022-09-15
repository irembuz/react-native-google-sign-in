import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SocialButton = ({ onPress, title }) => {
  return (
    <TouchableOpacity style={styles.googleStyle} onPress={onPress}>
      <Ionicons name="logo-google" size={24} />
      <Text style={styles.textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  textStyle: {
    color: "#575757",
    fontSize: 16,
    marginLeft: 10,
    marginRight: 20,
  },
  googleStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderWidth: 0.5,
    borderColor: "#fff",
    height: 40,
    width: 230,
    borderRadius: 5,
    margin: 5,
  },
});

export default SocialButton;
