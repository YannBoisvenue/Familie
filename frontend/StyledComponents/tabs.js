import React, { Component } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Header, Tabs } from "native-base";

export const StyledTabs = ({ children, color }) => (
  <React.Fragment>
    <Header hasTabs style={{ ...styles.Header, backgroundColor: color }} />
    <Tabs>{children}</Tabs>
  </React.Fragment>
);

const styles = StyleSheet.create({
  Header: {
    height: 0,
    paddingBottom: 0,
    paddingTop: 0
  }
});
