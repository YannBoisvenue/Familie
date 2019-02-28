import React from "react";
import { StyleSheet } from "react-native";
import { Content, View } from "native-base";
import Colors from "../constants/Colors";

export const StyledContent = ({ children }) => (
  <Content style={styles.content}>
    {children}
    <View style={{ height: 50, backgroundColor: "transparent" }} />
  </Content>
);

const styles = StyleSheet.create({
  content: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    backgroundColor: Colors.antiFlashWhite
  }
});
