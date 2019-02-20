import React from "react";
import { Item, H2, H3 } from "native-base";
import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";

export const StyledSectionTitle = ({ content, width }) => (
  <Item underline style={{ ...styles.Title, width: width }}>
    <H3 style={{ color: Colors.darkGunmetal }}>{content}</H3>
  </Item>
);

const styles = StyleSheet.create({
  Title: {
    marginTop: 15,
    marginBottom: 15,
    borderColor: Colors.darkGunmetal,
    borderBottomWidth: 1,
    paddingBottom: 10
  }
});
