import React, { Component } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Footer, Button, Icon, FooterTab, Text } from "native-base";
import Colors from "../constants/Colors";

export const StyledFooter = ({ children }) => (
  <React.Fragment>
    <Footer>{children}</Footer>
  </React.Fragment>
);

const styles = StyleSheet.create({
  Footer: {
    color: Colors.desire
  }
});
