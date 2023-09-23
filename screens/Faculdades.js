import React from "react";
import { View, StatusBar, Text } from "react-native";

export default function Faculdades() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <StatusBar></StatusBar>
      <Text>Settings!</Text>
    </View>
  );
}
