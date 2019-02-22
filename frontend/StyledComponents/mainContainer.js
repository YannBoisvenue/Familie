import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Content } from "native-base";
import Colors from "../constants/Colors";

export const StyledContent = ({ children }) => (
  <Content style={styles.content}>{children}</Content>
);

const styles = StyleSheet.create({
  content: {
    padding: 25,
    backgroundColor: Colors.antiFlashWhite
  }
});
