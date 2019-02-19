import React, { Component } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Footer, Button, Icon, FooterTab, Text } from "native-base";

export const StyledFooter = ({ children }) => (
  <React.Fragment>
    <Footer>{children}</Footer>
  </React.Fragment>
);
